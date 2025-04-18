import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { HeaderType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function recalculateTypeData(typeData: HeaderType[]): HeaderType[] {
  const updatedData = typeData.map((num) => {
    let percentage = 0;

    if (num.actual !== undefined && num.target !== undefined) {
      percentage = num.target !== 0 ? (num.actual / num.target) * 100 : 0;
    }

    return {
      ...num,
      percentage: Math.round(percentage),
      status:
        num.actual === 0 && num.target === 0
          ? ""
          : percentage >= 100
          ? "Completed"
          : "Ongoing",
    };
  });

  // FUSA
  const operational =
    updatedData.find((d) => d.type === "Operational")?.percentage || 0;
  const nonOperational =
    updatedData.find((d) => d.type === "Non-Operational")?.percentage || 0;
  const fusaIndex = updatedData.findIndex((d) => d.type === "FUSA");
  if (fusaIndex !== -1) {
    updatedData[fusaIndex].percentage = Math.round(
      (operational + nonOperational) / 2
    );
    updatedData[fusaIndex].status =
      updatedData[fusaIndex].percentage === 0
        ? ""
        : updatedData[fusaIndex].percentage >= 100
        ? "Completed"
        : "Ongoing";
  }

  // Service Area
  const fusa = updatedData.find((d) => d.type === "FUSA")?.percentage || 0;
  const newlyGenerated =
    updatedData.find((d) => d.type === "Newly Generated")?.percentage || 0;
  const pnr = updatedData.find((d) => d.type === "PNR")?.percentage || 0;
  const converted =
    updatedData.find((d) => d.type === "Converted")?.percentage || 0;
  const serviceAreaIndex = updatedData.findIndex(
    (d) => d.type === "Service Area"
  );
  if (serviceAreaIndex !== -1) {
    updatedData[serviceAreaIndex].percentage = Math.round(
      (fusa + newlyGenerated + pnr + converted) / 4
    );
    updatedData[serviceAreaIndex].status =
      updatedData[serviceAreaIndex].percentage === 0
        ? ""
        : updatedData[serviceAreaIndex].percentage >= 100
        ? "Completed"
        : "Ongoing";
  }

  return updatedData;
}
