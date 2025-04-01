import ImageCarousel from "@/components/image-carousel";
import GlassMorphicCard from "@/components/ui/glassmorphic-card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center flex-col h-[100dvh] ">
      <div className="absolute top-0 left-0 right-0 md:top-10 md:left-10 md:right-10 h-[65vh] overflow-hidden rounded-none md:rounded-2xl ">
        <ImageCarousel />
      </div>
      <div className="absolute top-0 left-0 right-0 md:top-10 md:left-10 md:right-10 h-[65vh] overflow-hidden rounded-none md:rounded-2xl bg-white/20 " />
      <GlassMorphicCard className="absolute top-12 rounded-lg">
        <h1 className=" text-center text-primary  p-2  overflow-hidden text-2xl md:text-4xl font-semibold ">
          NIA-UPRIIS FGIS MONITORING SYSTEM
        </h1>
      </GlassMorphicCard>

      <div className="flex items-center justify-center h-full w-full z-10">
        {children}
      </div>
    </div>
  );
}
