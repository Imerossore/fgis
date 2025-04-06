"use client";

import { useState, useEffect, useActionState } from "react";
import toast from "react-hot-toast";
import { parseISO, getMonth, getYear } from "date-fns";
import { useParams } from "next/navigation";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "./ui/select";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { ActionState, StatusHeader, UserType } from "@/lib/types";
import { sendSystemData } from "@/lib/actions/system";
import { cn } from "@/lib/utils";

const types = [
  "Operational",
  "Non-Operational",
  "FUSA",
  "Newly Generated",
  "PNR",
  "Converted",
  "Service Area",
];

const initialstate: ActionState = {
  success: false,
  message: "",
};

type HeaderType = {
  type: string;
  actual?: number;
  target?: number;
  percentage: number;
  status: string;
};

export default function SystemDataComponent({
  data,
  user,
}: {
  data: StatusHeader[];
  user: UserType;
}) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { division, system } = useParams();

  const filteredData = data.filter((item) => {
    const itemDate = parseISO(item.created_at || "");
    return (
      getMonth(itemDate) + 1 === selectedMonth &&
      getYear(itemDate) === selectedYear &&
      item.system === system &&
      item.division === division
    );
  });

  const hasExistingData = (filteredData: StatusHeader[]) => {
    return (
      filteredData.length > 0 &&
      filteredData.some(
        (item) =>
          item.review_status === "completed" || item.review_status === "pending"
      )
    );
  };

  const [originalTypeData, setOriginalTypeData] = useState<HeaderType[]>([]);
  const startEditing = () => {
    setOriginalTypeData([...typeData]);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setTypeData([...originalTypeData]);
    setIsEditing(false);
  };

  const [typeData, setTypeData] = useState<HeaderType[]>(
    types.map((type) => ({
      type,
      actual: [
        "Operational",
        "Non-Operational",
        "Newly Generated",
        "PNR",
        "Converted",
      ].includes(type)
        ? 0
        : undefined,
      target: [
        "Operational",
        "Non-Operational",
        "Newly Generated",
        "PNR",
        "Converted",
      ].includes(type)
        ? 0
        : undefined,
      percentage: 0,
      status: "",
    }))
  );

  const dependencyKey = typeData
    .map((num) => `${num.actual}-${num.target}`)
    .join(",");

  useEffect(() => {
    setTypeData((prevTypeData) => {
      const updatedData = prevTypeData.map((num) => {
        let percentage = 0;

        if (num.actual !== undefined && num.target !== undefined) {
          // Fixed calculation: actual divided by target
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

      // Updating FUSA
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

      // Updating Service Area
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
    });
  }, [dependencyKey]);

  const handleInputChange = (
    index: number,
    field: "actual" | "target",
    value: string
  ) => {
    setTypeData((prevTypeData) => {
      const updatedTypeData = [...prevTypeData];
      const numValue = parseFloat(value) || 0;

      updatedTypeData[index] = {
        ...updatedTypeData[index],
        [field]: numValue,
      };

      const item = updatedTypeData[index];

      if (
        item.actual !== undefined &&
        item.target !== undefined &&
        item.target !== 0
      ) {
        item.percentage = Math.round((item.actual / item.target) * 100);
        item.status = item.percentage >= 100 ? "Completed" : "Ongoing";
      } else {
        item.percentage = 0;
        item.status = "";
      }

      return updatedTypeData;
    });
  };

  const [state, action, isPending] = useActionState(
    sendSystemData,
    initialstate
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (!isPending && state.message) {
      toast[state.success ? "success" : "error"](state.message, {
        id: "system-toast",
      });

      setIsEditing(false);
    } else if (isPending) {
      toast.loading("Processing...", { id: "system-toast" });
    }
  }, [isPending, state.success, state.message]);

  return (
    <div className="text-foreground dark:text-foreground">
      <form action={action}>
        <div className="flex gap-4 mb-6 items-center">
          <p className="text-muted-foreground">Filter Date:</p>
          <Select
            value={selectedMonth.toString()}
            onValueChange={(value: string) => setSelectedMonth(Number(value))}
          >
            <SelectTrigger className="w-[180px] text-foreground">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                {
                  length:
                    selectedYear === new Date().getFullYear()
                      ? new Date().getMonth() + 1
                      : 12,
                },
                (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {new Date(2000, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          <Select
            defaultValue={selectedYear.toString()}
            onValueChange={(value: string) => setSelectedYear(Number(value))}
          >
            <SelectTrigger className="w-[180px] text-foreground">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => {
                const year = (new Date().getFullYear() - i).toString();
                return (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <div>
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={cancelEditing}
                  variant="destructive"
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="text-background dark:text-foreground"
                >
                  Save
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                disabled={hasExistingData(filteredData)}
                onClick={startEditing}
                size="sm"
                className={`text-background dark:text-foreground ${
                  hasExistingData(filteredData)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {filteredData.length > 0
                  ? filteredData[0].review_status === "pending"
                    ? "Pending approval by admin"
                    : filteredData[0].review_status === "completed"
                    ? "Already completed"
                    : "Edit"
                  : "Edit"}
              </Button>
            )}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Actual</TableHead>
              <TableHead>Target</TableHead>
              <TableHead className="text-center">Percentage</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {typeData.map((item, index) => (
              <TableRow
                key={index}
                className={
                  item.type === "FUSA" || item.type === "Service Area"
                    ? "bg-secondary"
                    : ""
                }
              >
                <TableCell className="font-medium">
                  {item.type}
                  <Input
                    type="hidden"
                    name={`type_${index}`}
                    value={item.type}
                  />
                </TableCell>

                <TableCell>
                  {item.actual !== undefined ? (
                    <Input
                      type="text"
                      name={`actual_${index}`}
                      disabled={hasExistingData(filteredData) || !isEditing}
                      value={
                        filteredData[0]?.details.find(
                          (d) => d.type === item.type
                        )?.actual ?? item.actual
                      }
                      onChange={(e) =>
                        handleInputChange(index, "actual", e.target.value)
                      }
                      className="w-36 h-8"
                    />
                  ) : (
                    <span></span>
                  )}
                </TableCell>

                <TableCell>
                  {item.target !== undefined ? (
                    <Input
                      type="text"
                      name={`target_${index}`}
                      disabled={hasExistingData(filteredData) || !isEditing}
                      value={
                        filteredData[0]?.details.find(
                          (d) => d.type === item.type
                        )?.target ?? item.target
                      }
                      onChange={(e) =>
                        handleInputChange(index, "target", e.target.value)
                      }
                      className="w-36 h-8"
                    />
                  ) : (
                    <span></span>
                  )}
                </TableCell>

                <TableCell className="text-center">
                  {filteredData[0]?.details.find((d) => d.type === item.type)
                    ?.percentage || item.percentage}
                  %
                  <Input
                    type="hidden"
                    name={`percentage_${index}`}
                    value={item.percentage}
                  />
                </TableCell>

                <TableCell className="text-center">
                  <Badge
                    className={cn(
                      filteredData[0]?.details.find((d) => d.type === item.type)
                        ?.status === "Completed" || item.status === "Completed"
                        ? "bg-primary hover:bg-primary/90 text-background "
                        : filteredData[0]?.details.find(
                            (d) => d.type === item.type
                          )?.status === "Ongoing" || item.status === "Ongoing"
                        ? "bg-blue-400 hover:bg-blue-500 text:background"
                        : "bg-gray-300 hover:bg-gray-400"
                    )}
                  >
                    {filteredData[0]?.details.find((d) => d.type === item.type)
                      ?.status ?? item.status}
                  </Badge>
                  <Input
                    type="hidden"
                    name={`status_${index}`}
                    value={item.status}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Hidden fields */}
        <Input type="hidden" name="system" value={system} />
        <Input type="hidden" name="division" value={division} />
        <Input type="hidden" name="recorded_by" value={user?.id} />
      </form>
    </div>
  );
}
