import Image from "next/image";
import { cn } from "@/lib/utils";
import { HiOutlineClock } from "react-icons/hi2";

interface CategoryCardProps {
  index: number;
  name: string;
  created: string;
  className?: string;
}

export function CategoryCard({
  name,
  className,
  created,
  index,
}: CategoryCardProps) {
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
          src={`/food-${index + 1}.jpeg` || "/no-image.png"}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-3">
        <p className=" font-bold text-white/50 tracking-tight">{name}</p>
      </div>
      <div className="flex items-center justify-center gap-1.5 mt-2 text-gray-500">
        <HiOutlineClock size={12} className="text-[#a3a380]" />
        <p className="text-[9px] font-bold uppercase tracking-widest italic">
          Added:{" "}
          {new Date(created).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
