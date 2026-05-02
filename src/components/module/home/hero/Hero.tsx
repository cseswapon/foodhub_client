"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
    <section className="relative min-h-100vh w-full overflow-hidden bg-black text-white md:py-10">
      {/* Main Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Dining Experience"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/10 via-black/70 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto grid md:min-h-[90vh] min-h-[70vh] grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2">
        {/* Left Content */}
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-2 bg-white/10 md:bg-black/70 px-4 py-2 rounded-full">
            <span className="h-1 w-1 rounded-full bg-[#a3a380]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#a3a380]">
              Art of Fine Dining
            </span>
          </div>

          {/* Typewriter Effect Applied Here */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl md:my-5">
            <span>DINING REDEFINED</span>
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 75,
                deleteSpeed: 50,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    'WITH <span style="color: #a3a380;">EVERY BITE</span>',
                  )
                  .pauseFor(2500)
                  .deleteAll()
                  .typeString(
                    'IN <span style="color: #a3a380;">EVERY MOMENT</span>',
                  )
                  .pauseFor(2500)
                  .start();
              }}
            />
          </h1>

          <p className="max-w-lg text-sm text-gray-300">
            Immerse yourself in a dining experience like no other, where every
            dish is a masterpiece of flavor, crafted with care and precision.
            From the freshest ingredients.
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-4">
            <Button className="group bg-[#a3a380] text-black hover:bg-[#8e8e6d] rounded-full px-8 py-6 text-sm font-bold transition-all">
              Book A Table
              <MoveRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <Link
              href="#"
              className="flex items-center gap-2 text-sm font-semibold hover:text-[#a3a380] transition-colors"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10">
                <Play className="fill-white h-3 w-3" />
              </span>
              Download App
            </Link>
          </div>
        </div>

        <div className="relative hidden lg:block h-150">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-125 w-125 overflow-hidden rounded-full border-8 border-white/5 shadow-2xl ">
            <Image
              draggable={false}
              src="/hero-bg.jpg"
              alt="Restaurant Interior"
              fill
              className="object-cover"
            />
          </div>

          <div className="absolute -right-10 top-10 h-40 w-40 overflow-hidden rounded-full border-4 border-white shadow-xl z-20 transition-transform duration-500 hover:scale-110">
            <Image
              draggable={false}
              src="/hero-img-2.jpg"
              alt="Special Dish"
              fill
              className="object-cover animate-float-zoom"
            />
          </div>

          <div className="absolute bottom-10 left-40 h-44 w-44 overflow-hidden rounded-full border-4 border-white shadow-xl z-20">
            <Image
              draggable={false}
              src="/hero-img-3.jpg"
              alt="Special Burger"
              fill
              className="object-cover animate-spin-slow "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
