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
    const headerIdFromForm = formData.get("id") as string | null;

    // Compose header fields
    const headerFields = {
      division: formData.get("division") || "Unknown",
      system: formData.get("system") || "Unknown",
      recorded_by: formData.get("recorded_by") || "Unknown",
      review_status: "pending",
    };

    let header_id = headerIdFromForm;

    if (header_id) {
      // --- UPDATE: If id exists, update the header and delete the old details ---
      const { error: updateHeaderError } = await supabase
        .from("status_header_tbl")
        .update(headerFields)
        .eq("id", header_id);

      if (updateHeaderError) {
        console.error("Error updating header:", updateHeaderError);
        return {
          success: false,
          message: "Error updating header record",
        };
      }

      // Remove previous details for this header
      const { error: deleteDetailError } = await supabase
        .from("status_detail_tbl")
        .delete()
        .eq("header_id", header_id);

      if (deleteDetailError) {
        console.error("Error deleting old details:", deleteDetailError);
        return {
          success: false,
          message: "Error updating detail records",
        };
      }
    } else {
      const { data: headerData, error: headerError } = await supabase
        .from("status_header_tbl")
        .insert(headerFields)
        .select("id")
        .single();

      if (headerError) {
        console.error("Error creating header:", headerError);
        return {
          success: false,
          message: "Error creating header record",
        };
      }
      header_id = headerData.id;
    }

    // Prepare the detail records
    const entriesCount = [...formData.entries()].filter(([key]) =>
      key.startsWith("type_")
    ).length;

    const typeData = Array.from({ length: entriesCount }, (_, i) => ({
      header_id,
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

    const { error: detailError } = await supabase
      .from("status_detail_tbl")
      .insert(typeData);

    if (detailError) {
      console.error("Error creating details:", detailError);
      if (!headerIdFromForm) {
        await supabase.from("status_header_tbl").delete().eq("id", header_id);
      }
      return {
        success: false,
        message: "Error submitting details",
      };
    }
    revalidateTag("status-data");

    return {
      success: true,
      message: headerIdFromForm
        ? "Data updated successfully"
        : "Data submitted successfully",
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
