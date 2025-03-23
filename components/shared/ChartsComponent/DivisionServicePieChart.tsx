"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { format } from "date-fns";
import { FC } from "react";

// Define the data structure
interface ServiceData {
  name: string;
  value: number;
  color: string;
}

// Sample data for current month's service actual percentage by division
const serviceActualData: ServiceData[] = [
  { name: "Division 1", value: 78, color: "#8884d8" },
  { name: "Division 2", value: 92, color: "#82ca9d" },
  { name: "Division 3", value: 65, color: "#ffc658" },
  { name: "Division 4", value: 85, color: "#ff8042" },
  { name: "Division 5", value: 72, color: "#0088fe" },
  { name: "Division 6", value: 88, color: "#00C49F" },
  { name: "DRD", value: 76, color: "#FFBB28" },
];

const currentMonth = format(new Date(), "MMMM yyyy");
const currentDateTime = "2025-03-23 09:57:11";
const currentUser = "Imerossore";

// Define types for tooltip
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: ServiceData;
  }>;
}

// Custom tooltip with proper typing
const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md">
        <p className="font-medium">{data.name}</p>
        <div className="text-sm flex items-center gap-2 mt-1">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: data.color }}
          />
          <span>Service Actual: {data.value}%</span>
        </div>
      </div>
    );
  }
  return null;
};

// Define proper types for recharts Legend content prop
interface LegendContentProps {
  payload?: Array<{
    value: string;
    color: string;
    type?: string;
    id?: string;
  }>;
}

// Custom rendering for the legend with proper typing that matches recharts expectations
const CustomLegend: FC<LegendContentProps> = ({ payload }) => {
  if (!payload) return null;

  return (
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs sm:text-sm pt-2">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

export default function DivisionServicePieChart() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Service Actual by Division</CardTitle>
            <CardDescription>
              Performance percentage breakdown - {currentMonth}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">
              {currentDateTime}
            </div>
            <div className="text-xs font-medium mt-0.5">{currentUser}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={serviceActualData}
                cx="50%"
                cy="45%"
                labelLine={false}
                outerRadius={70}
                innerRadius={30}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                paddingAngle={2}
              >
                {serviceActualData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                content={<CustomLegend />}
                verticalAlign="bottom"
                height={36}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
