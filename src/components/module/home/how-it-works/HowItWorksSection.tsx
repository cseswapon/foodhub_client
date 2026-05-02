"use client";

import { motion } from "framer-motion";
import { Search, ShoppingBag, Truck, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Meals",
    desc: "Explore hundreds of meals from top-rated local providers filtered by category, price, or dietary preference.",
    step: "01",
  },
  {
    icon: ShoppingBag,
    title: "Add to Cart",
    desc: "Select your favorite dishes, customize your order, and add them to your cart in a single click.",
    step: "02",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Your order is prepared fresh and delivered right to your door quickly and reliably.",
    step: "03",
  },
  {
    icon: Star,
    title: "Rate & Review",
    desc: "Share your experience and help others discover great meals by rating and reviewing your order.",
    step: "04",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="md:py-24 py-12 bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-widest text-[#a3a380] uppercase font-semibold">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            How Food Hub Works
          </h2>
          <p className="text-gray-400 mt-3 max-w-lg mx-auto text-sm">
            From discovery to delivery in just a few steps — it{"'"}s that
            simple.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group text-center"
            >
              {/* connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-px bg-white/10" />
              )}
              <div className="relative w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#a3a380]/10 border border-[#a3a380]/20 flex items-center justify-center group-hover:bg-[#a3a380]/20 transition-colors">
                <s.icon className="w-7 h-7 text-[#a3a380]" />
                <span className="absolute -top-2.5 -right-2.5 text-[10px] font-bold bg-[#a3a380] text-black rounded-full w-5 h-5 flex items-center justify-center">
                  {s.step}
                </span>
              </div>
              <h3 className="text-base font-bold mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
