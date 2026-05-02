"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Leaf, Flame, Wheat } from "lucide-react";

const whyUs = [
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    desc: "All meals are made with locally sourced, farm-fresh ingredients.",
  },
  {
    icon: Flame,
    title: "Diverse Cuisines",
    desc: "From Bengali classics to international favorites — something for everyone.",
  },
  {
    icon: Wheat,
    title: "Dietary Options",
    desc: "Vegan, vegetarian, and non-veg options clearly labeled on every meal.",
  },
];

export default function CtaSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#0a0a0a] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="text-xs tracking-widest text-[#a3a380] uppercase font-semibold">
              Why Food Hub
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
              The Smarter Way to{" "}
              <span className="text-[#a3a380]">Eat Well</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
              Food Hub connects you with trusted local providers who take pride
              in every dish. Order with confidence knowing your meal is prepared
              with care.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {whyUs.map((w) => (
                <div key={w.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#a3a380]/10 flex items-center justify-center shrink-0">
                    <w.icon className="w-5 h-5 text-[#a3a380]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{w.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/meal"
                className="bg-[#a3a380] hover:bg-[#8e8e6d] text-black font-bold px-8 py-3 rounded-full text-sm transition-colors"
              >
                Explore Meals
              </Link>
              <Link
                href="/provider"
                className="border border-white/20 hover:border-[#a3a380] text-white font-semibold px-8 py-3 rounded-full text-sm transition-colors"
              >
                View Providers
              </Link>
            </div>
          </motion.div>

          {/* Right — Newsletter */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 space-y-5 backdrop-blur-sm"
          >
            <div>
              <h3 className="text-2xl font-bold">Get Tasty Updates</h3>
              <p className="text-gray-400 text-sm mt-2">
                Subscribe to receive exclusive deals, new menu items, and food
                inspiration directly to your inbox.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#a3a380] transition-colors"
              />
              <button className="bg-[#a3a380] hover:bg-[#8e8e6d] text-black font-bold px-6 py-3 rounded-xl text-sm transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
