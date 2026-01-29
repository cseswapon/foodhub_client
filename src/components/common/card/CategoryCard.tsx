import Image from "next/image";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  title: string;
  className?: string;
}

export function CategoryCard({ title, className }: CategoryCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center text-center p-6 transition-all duration-300 hover:scale-105 hover:cursor-pointer",
        className,
      )}
    >
      <div className="relative w-full h-48  mb-3 overflow-hidden rounded-lg border border-muted">
        <Image
          draggable={false}
          src="/no-image.png"
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-3">
        <p className=" font-bold text-white/50 tracking-tight">{title}</p>
      </div>
    </div>
  );
}
