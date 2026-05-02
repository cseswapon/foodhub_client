import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HiOutlineChevronRight } from "react-icons/hi";
import { GiCook, GiBowlOfRice, GiGlassShot } from "react-icons/gi";
import { LuUsers, LuBadgeCheck } from "react-icons/lu";
import { MdOutlineFastfood, MdOutlineLocalOffer } from "react-icons/md";

const stats = [
  { id: 1, label: "Professional Chefs", value: "309", icon: GiCook },
  { id: 2, label: "Items Of Food", value: "453", icon: GiBowlOfRice },
  { id: 3, label: "Years Of Experience", value: "25 +", icon: LuBadgeCheck },
  { id: 4, label: "Satisfied Clients", value: "300 +", icon: LuUsers },
];

export default function FeatureSection() {
  return (
    <section className="bg-[#0c0d0c] text-white md:py-24 py-12 px-4  overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Side: Chef Image & Floating Card */}
          <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative w-70 h-95 md:w-120 md:h-145">
              <Image
                draggable={false}
                src="/chef.png"
                alt="Chef"
                fill
                className="object-contain"
                priority
              />

              {/* Floating Happy Customer Card */}
              <div className="absolute bottom-12 -left-4 md:-left-8 bg-[#a3a380] p-4 md:p-5 rounded-2xl shadow-2xl w-45 animate-bounce">
                <p className="text-[#1f2120] text-sm md:text-base font-bold leading-tight">
                  620+ Exclusive <br /> Happy Customer
                </p>
                <div className="flex -space-x-2 mt-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-[#a3a380] overflow-hidden bg-gray-300"
                    >
                      <Image
                        draggable={false}
                        src={`/chef.png`}
                        alt="user"
                        width={32}
                        height={32}
                      />
                    </div>
                  ))}
                  <div className="h-8 w-8 rounded-full bg-[#1f2120] flex items-center justify-center text-[10px] text-white border-2 border-[#a3a380]">
                    +
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a3a380]" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#a3a380]">
                  Our Ingredients
                </span>
              </div>
              <h2 className="text-3xl md:text-6xl font-black leading-[1.1] tracking-tighter uppercase">
                Crafting Dishes With <br />
                <span className="text-[#a3a380]">Freshest Flavors</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
                We take pride in using only the freshest, hand-picked
                ingredients that are free from preservatives and artificial
                additives. Taste the difference with every bite as we serve
                dishes made from nature&apos;s finest.
              </p>
            </div>

            {/* Features Row with React Icons */}
            <div className="grid grid-cols-3 gap-6 border-b border-white/10 pb-10">
              <Feature
                icon={<GiGlassShot className="size-7" />}
                title="Best Qualities"
              />
              <Feature
                icon={<MdOutlineLocalOffer className="size-7" />}
                title="Discount System"
              />
              <Feature
                icon={<MdOutlineFastfood className="size-7" />}
                title="First Delivery"
              />
            </div>

            <Button className="bg-[#a3a380] hover:bg-[#b5b592] text-[#1f2120] font-black uppercase tracking-wider rounded-full px-10 h-14 transition-all group">
              Book Table
              <HiOutlineChevronRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Bottom Stats Grid */}
        <div className="md:mt-24 mt-10 pt-12 border-t border-white/5 grid grid-cols-1 lg:grid-cols-4  gap-y-12 gap-x-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex md:flex-row flex-col items-center justify-center gap-4 group"
            >
              <div className="h-14 w-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[#a3a380]/50 group-hover:bg-[#a3a380]/5 transition-all duration-500">
                <stat.icon className="size-6 text-[#a3a380]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-3xl md:text-4xl text-center lg:text-start font-black tracking-tighter">
                  {stat.value}
                </h4>
                <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-[0.15em]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center lg:items-start gap-4">
      <div className="text-[#a3a380]">{icon}</div>
      <h5 className="text-[10px] md:text-xs font-black uppercase tracking-widest leading-tight text-center lg:text-left">
        {title}
      </h5>
    </div>
  );
}
