import { Loader2Icon } from "lucide-react";

export default function RootLoading() {
  return (
    <div className="flex items-center justify-center absolute inset-0 bg-background z-20">
      <Loader2Icon className="animate-spin" />
    </div>
  );
}
