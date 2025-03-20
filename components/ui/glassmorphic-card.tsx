import { cn } from "@/lib/utils";

export default function GlassMorphicCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-white/15 backdrop-blur-sm border shadow-md ",
        className
      )}
    >
      {children}
    </div>
  );
}
