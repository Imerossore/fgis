import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GlassMorphicCard from "./ui/glassmorphic-card";

type StatusData = {
  declined: number;
  pending: number;
  completed: number;
};

export default function StatusComponent({ data }: { data?: StatusData }) {
  // Default values if no data is provided
  const { declined = 0, pending = 0, completed = 0 } = data || {};

  return (
    <GlassMorphicCard className="h-full rounded-lg">
      <CardHeader>
        <CardTitle className="text-xl font-medium text-background dark:text:foreground pt-3 ">
          Division Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center bg-background rounded-md p-2">
            <span className="text-2xl font-bold text-destructive">
              {declined}
            </span>
            <span className="text-xs text-muted-foreground">Declined</span>
          </div>
          <div className="flex flex-col items-center bg-background rounded-sm p-2">
            <span className="text-2xl font-bold text-amber-500">{pending}</span>
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
          <div className="flex flex-col items-center bg-background rounded-sm p-2">
            <span className="text-2xl font-bold text-green-600">
              {completed}
            </span>
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
        </div>
      </CardContent>
    </GlassMorphicCard>
  );
}
