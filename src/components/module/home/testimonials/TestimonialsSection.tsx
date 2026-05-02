"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { ReviewData } from "@/services/review.service";

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Regular Customer",
    text: "Food Hub changed how I eat. The meal variety is incredible, and delivery is always on time. My go-to app for dinner!",
    rating: 5,
    avatar: "AR",
  },
  {
    name: "Karim Uddin",
    role: "Food Enthusiast",
    text: "I love how easy it is to find vegetarian options. The AI chatbot helped me discover new meals I never would have tried.",
    rating: 5,
    avatar: "KU",
  },
  {
    name: "Nusrat Jahan",
    role: "Working Professional",
    text: "Ordering lunch for the office has never been easier. The checkout is smooth and the food quality is consistently great.",
    rating: 4,
    avatar: "NJ",
  },
  {
    name: "Sabbir Hossain",
    role: "Food Provider",
    text: "The provider dashboard is intuitive. I can manage my menu, track orders, and grow my business all in one place.",
    rating: 5,
    avatar: "SH",
  },
];

const getAvatar = (name?: string) => {
  if (!name) return "GH";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "GH";
};

export default function TestimonialsSection({
  reviews,
}: {
  reviews: ReviewData[];
}) {
  const dynamicTestimonials =
    reviews.length > 0
      ? reviews.slice(0, 4).map((review) => ({
          name: review.user?.name || "Food Hub User",
          role: "Verified Customer",
          text: review.comment || "Amazing experience with Food Hub!",
          rating: Math.max(1, Math.min(5, Number(review.rating) || 5)),
          avatar: getAvatar(review.user?.name),
        }))
      : testimonials;

  return (
    <section className="md:py-24 py-12 bg-[#0d0d0b] text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs tracking-widest text-[#a3a380] uppercase font-semibold">
            What They Say
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            Customer Reviews
          </h2>
          <p className="text-gray-400 mt-3 max-w-lg mx-auto text-sm">
            Don{"'"}t just take our word for it — here{"'"}s what our community
            has to say.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dynamicTestimonials.map((t, i) => (
            <motion.div
              key={`${t.name}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col gap-4 hover:border-[#a3a380]/30 transition-colors"
            >
              <Quote className="w-6 h-6 text-[#a3a380]/50" />
              <p className="text-gray-300 text-sm leading-relaxed flex-1">
                {t.text}
              </p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-3 h-3 ${j < t.rating ? "fill-[#a3a380] text-[#a3a380]" : "text-white/20"}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-[#a3a380] flex items-center justify-center text-black font-bold text-xs">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
