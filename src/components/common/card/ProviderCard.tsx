import Image from "next/image";
import {
  HiOutlineBuildingStorefront,
  HiOutlineMapPin,
  HiOutlineArrowRight,
} from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Provider {
  id: string;
  restaurant_name: string;
  description: string;
  address: string;
  is_open: boolean;
  fb_link: string;
}

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Card className="group bg-[#1f2120] border-white/5 overflow-hidden transition-all duration-500 hover:border-[#a3a380]/30 hover:shadow-[0_0_30px_rgba(163,163,128,0.05)] rounded-2xl">
      <div className="relative w-full h-48  mb-3 overflow-hidden rounded-lg ">
        <Image
          draggable={false}
          src="/no-image.png"
          alt={"no image"}
          fill
          className="object-cover"
        />
      </div>
      <div className="relative h-fit w-full">
        <div className="absolute inset-0 bg-linear-to-t from-[#1f2120] to-transparent" />
        <Badge
          className={`absolute top-4 right-4 uppercase text-[10px] font-black tracking-widest px-3 py-1 border-none ${
            provider?.is_open
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {provider?.is_open ? "Open Now" : "Closed"}
        </Badge>
      </div>

      <CardContent className="p-6 space-y-3 relative -mt-10">
        <div className="size-12 rounded-xl bg-[#a3a380] flex items-center justify-center text-[#1f2120] shadow-xl mb-4">
          <HiOutlineBuildingStorefront size={24} />
        </div>

        <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic group-hover:text-[#a3a380] transition-colors line-clamp-1">
          {provider?.restaurant_name}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-2 min-h-10 leading-relaxed italic">
          `{provider?.description}`
        </p>

        <div className="flex items-start gap-2 text-gray-500 pt-2">
          <HiOutlineMapPin size={16} className="text-[#a3a380] shrink-0" />
          <span className="text-[11px] font-bold uppercase tracking-tight line-clamp-1">
            {provider?.address}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          asChild
          className="w-full bg-white/5 hover:bg-[#a3a380] text-white hover:text-[#1f2120] border-none rounded-xl font-black uppercase tracking-widest text-[10px] h-12 transition-all"
        >
          <Link
            href={`/provider/${provider.id}`}
            className="flex items-center justify-center gap-2"
          >
            View Kitchen <HiOutlineArrowRight size={14} />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
