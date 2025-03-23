"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, subMonths } from "date-fns";

// Sample data comparing current and previous month service actual percentages
const comparisonData = [
  {
    division: "Division 1",
    currentMonth: 78,
    previousMonth: 71,
  },
  {
    division: "Division 2",
    currentMonth: 92,
    previousMonth: 88,
  },
  {
    division: "Division 3",
    currentMonth: 65,
    previousMonth: 70,
  },
  {
    division: "Division 4",
    currentMonth: 85,
    previousMonth: 80,
  },
  {
    division: "Division 5",
    currentMonth: 72,
    previousMonth: 68,
  },
  {
    division: "Division 6",
    currentMonth: 88,
    previousMonth: 85,
  },
  {
    division: "DRD",
    currentMonth: 76,
    previousMonth: 73,
  },
];

const currentMonthName = format(new Date(), "MMMM");
const previousMonthName = format(subMonths(new Date(), 1), "MMMM");

// Custom tooltip
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number }[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md">
        <p className="font-medium">{label}</p>
        <div className="grid gap-1 mt-1">
          <p className="text-sm flex items-center">
            <span className="h-2 w-2 rounded-full bg-blue-500 mr-1.5"></span>
            {currentMonthName}:{" "}
            <span className="font-medium ml-1">{payload[0].value}%</span>
          </p>
          <p className="text-sm flex items-center">
            <span className="h-2 w-2 rounded-full bg-gray-400 mr-1.5"></span>
            {previousMonthName}:{" "}
            <span className="font-medium ml-1">{payload[1].value}%</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export default function MonthlyComparisonBarChart() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Monthly Performance Comparison</CardTitle>
            <CardDescription>
              {previousMonthName} vs {currentMonthName} - Service Actual %
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              margin={{
                top: 5,
                right: 20,
                left: 20,
                bottom: 60, // Increased bottom margin for rotated labels
              }}
              barSize={14}
              barGap={8}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis
                dataKey="division"
                interval={0}
                padding={{ left: 5, right: 5 }}
                height={70}
                tickMargin={10}
                tick={(props) => {
                  const { x, y, payload } = props;
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text
                        x={0}
                        y={0}
                        dy={16}
                        textAnchor="end"
                        fill="#666"
                        fontSize={11}
                        transform="rotate(-35)"
                      >
                        {payload.value}
                      </text>
                    </g>
                  );
                }}
              />
              <YAxis
                domain={[0, 100]}
                label={{
                  value: "Service Actual %",
                  angle: -90,
                  position: "insideLeft",
                  offset: -5,
                  fontSize: 11,
                }}
                tick={{ fontSize: 11 }}
                width={45}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: 5 }} verticalAlign="top" />
              <Bar
                dataKey="currentMonth"
                name={currentMonthName}
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="previousMonth"
                name={previousMonthName}
                fill="#9ca3af"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
