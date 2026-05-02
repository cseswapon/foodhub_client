"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Happy Customers", value: 12000, suffix: "+" },
  { label: "Meals Served", value: 85000, suffix: "+" },
  { label: "Food Providers", value: 320, suffix: "+" },
  { label: "Cities Covered", value: 24, suffix: "" },
];

function useCountUp(end: number, duration = 2000, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, end, duration]);
  return count;
}

function StatItem({
  label,
  value,
  suffix,
  delay,
}: {
  label: string;
  value: number;
  suffix: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const count = useCountUp(value, 2000, inView);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay }}
      className="text-center"
    >
      <p className="text-4xl md:text-5xl font-extrabold text-[#a3a380]">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-sm text-gray-400 mt-2">{label}</p>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 bg-[#0d0d0b] border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <StatItem key={s.label} {...s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
