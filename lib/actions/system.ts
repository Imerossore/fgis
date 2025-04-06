"use server";

import { supabase } from "@/lib/supabase";
import { revalidateTag, unstable_cache } from "next/cache";
import { ActionState } from "../types";

type StatusDetail = {
  header_id: string;
  type: string;
  actual?: number;
  target?: number;
  percentage: number;
  status: string;
};
export type StatusHeader = {
  id: string;
  division: string;
  system: string;
  recorded_by: string;
  review_status: string;
  created_at: string;
  updated_at: string;
  details: StatusDetail[];
};

export async function sendSystemData(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    // First, create the header record

    const { data: headerData, error: headerError } = await supabase
      .from("status_header_tbl")
      .insert({
        division: formData.get("division") || "Unknown",
        system: formData.get("system") || "Unknown",
        recorded_by: formData.get("recorded_by") || "Unknown",
        review_status: "pending",
      })
      .select("id")
      .single();

    if (headerError) {
      console.error("Error creating header:", headerError);
      return {
        success: false,
        message: "Error creating header record",
      };
    }

    // Get the header_id from the newly created header
    const header_id = headerData.id;

    // Prepare the detail records
    const entriesCount = [...formData.entries()].filter(([key]) =>
      key.startsWith("type_")
    ).length;

    const typeData = Array.from({ length: entriesCount }, (_, i) => ({
      header_id, // Add the header_id to each detail record
      type: formData.get(`type_${i}`),
      actual: formData.get(`actual_${i}`)
        ? Number(formData.get(`actual_${i}`))
        : null,
      target: formData.get(`target_${i}`)
        ? Number(formData.get(`target_${i}`))
        : null,
      percentage: formData.get(`percentage_${i}`)
        ? Number(formData.get(`percentage_${i}`))
        : 0,
      status: formData.get(`status_${i}`) || "Ongoing",
    }));

    // Insert the detail records
    const { error: detailError } = await supabase
      .from("status_detail_tbl")
      .insert(typeData);

    if (detailError) {
      console.error("Error creating details:", detailError);
      // If detail insertion fails, you might want to delete the header
      await supabase.from("status_header_tbl").delete().eq("id", header_id);

      return {
        success: false,
        message: "Error submitting details",
      };
    }
    revalidateTag("status-data");

    return {
      success: true,
      message: "Data submitted successfully",
    };
  } catch (error) {
    console.error("Error submitting data:", error);
    return {
      success: false,
      message: "Error submitting data",
    };
  }
}

export async function getSystemData(): Promise<StatusHeader[]> {
  return unstable_cache(
    async () => {
      try {
        const { data, error } = await supabase
          .from("status_header_tbl")
          .select("*,details:status_detail_tbl(*)")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching data:", error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    },
    ["status-header-data"],
    { revalidate: 60, tags: ["status-data"] }
  )();
}
