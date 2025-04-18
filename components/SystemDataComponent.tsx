"use client";

import { useState, useEffect, useActionState, useMemo } from "react";
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
import { ActionState, HeaderType, StatusHeader, UserType } from "@/lib/types";
import { sendSystemData } from "@/lib/actions/system";
import { cn, recalculateTypeData } from "@/lib/utils";

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

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const itemDate = parseISO(item.created_at || "");
      return (
        getMonth(itemDate) + 1 === selectedMonth &&
        getYear(itemDate) === selectedYear &&
        item.system === system &&
        item.division === division
      );
    });
  }, [data, selectedMonth, selectedYear, system, division]);

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

  const [originalTypeData, setOriginalTypeData] = useState<HeaderType[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (!isEditing) {
      if (filteredData[0]?.details) {
        setTypeData(
          types.map((type) => {
            const found = filteredData[0].details.find((d) => d.type === type);
            return {
              type,
              actual: [
                "Operational",
                "Non-Operational",
                "Newly Generated",
                "PNR",
                "Converted",
              ].includes(type)
                ? found?.actual ?? 0
                : undefined,
              target: [
                "Operational",
                "Non-Operational",
                "Newly Generated",
                "PNR",
                "Converted",
              ].includes(type)
                ? found?.target ?? 0
                : undefined,
              percentage: found?.percentage ?? 0,
              status: found?.status ?? "",
            };
          })
        );
      } else {
        setTypeData(
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
      }
    }
  }, [selectedMonth, selectedYear, filteredData, isEditing]);

  const startEditing = () => {
    let nextTypeData: HeaderType[];
    if (filteredData[0]?.details) {
      nextTypeData = types.map((type) => {
        const found = filteredData[0].details.find((d) => d.type === type);
        return {
          type,
          actual: [
            "Operational",
            "Non-Operational",
            "Newly Generated",
            "PNR",
            "Converted",
          ].includes(type)
            ? found?.actual ?? 0
            : undefined,
          target: [
            "Operational",
            "Non-Operational",
            "Newly Generated",
            "PNR",
            "Converted",
          ].includes(type)
            ? found?.target ?? 0
            : undefined,
          percentage: found?.percentage ?? 0,
          status: found?.status ?? "",
        };
      });
    } else {
      nextTypeData = types.map((type) => ({
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
      }));
    }
    nextTypeData = recalculateTypeData(nextTypeData);
    setTypeData(nextTypeData);
    setOriginalTypeData(nextTypeData);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setTypeData([...originalTypeData]);
    setIsEditing(false);
  };

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
      return recalculateTypeData(updatedTypeData);
    });
  };

  const [state, action, isPending] = useActionState(
    sendSystemData,
    initialstate
  );

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

  const isCurrentMonthAndYear =
    selectedMonth === new Date().getMonth() + 1 &&
    selectedYear === new Date().getFullYear();

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
                disabled={!isCurrentMonthAndYear}
                onClick={startEditing}
                size="sm"
                className={`text-background dark:text-foreground ${
                  !isCurrentMonthAndYear ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {filteredData.length > 0
                  ? filteredData[0].review_status === "submitted"
                    ? "Pending approval by admin"
                    : filteredData[0].review_status === "completed"
                    ? "Already completed"
                    : "Edit"
                  : !isCurrentMonthAndYear
                  ? "Only current month editable"
                  : "Edit"}
              </Button>
            )}
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Actual</TableHead>
              <TableHead className="text-center">%</TableHead>
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
                  {item.target !== undefined ? (
                    <Input
                      type="text"
                      name={`target_${index}`}
                      disabled={!isEditing}
                      value={item.target}
                      onChange={(e) =>
                        handleInputChange(index, "target", e.target.value)
                      }
                      className="w-36 h-8"
                    />
                  ) : (
                    <span></span>
                  )}
                </TableCell>
                <TableCell>
                  {item.actual !== undefined ? (
                    <Input
                      type="text"
                      name={`actual_${index}`}
                      disabled={!isEditing}
                      value={item.actual}
                      onChange={(e) =>
                        handleInputChange(index, "actual", e.target.value)
                      }
                      className="w-36 h-8"
                    />
                  ) : (
                    <span></span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {item.percentage}%
                  <Input
                    type="hidden"
                    name={`percentage_${index}`}
                    value={item.percentage}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={cn(
                      item.status === "Completed"
                        ? "bg-primary hover:bg-primary/90 text-background"
                        : item.status === "Ongoing"
                        ? "bg-blue-400 hover:bg-blue-500 text:background"
                        : "bg-gray-300 hover:bg-gray-400"
                    )}
                  >
                    {item.status}
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
        {filteredData[0]?.id && (
          <Input type="hidden" name="id" value={filteredData[0].id} />
        )}
      </form>
    </div>
  );
}
