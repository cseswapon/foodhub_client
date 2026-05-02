"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How do I place an order?",
    a: "Browse our meal listings, add items to your cart, and proceed to checkout. You can pay securely and track your order in real time.",
  },
  {
    q: "Can I order from multiple providers?",
    a: "Currently, orders are fulfilled per provider. Each cart is tied to a single provider to ensure quality and timely delivery.",
  },
  {
    q: "What dietary options are available?",
    a: "We offer vegan, vegetarian, and non-vegetarian meals. Every meal card clearly shows the dietary type so you can filter easily.",
  },
  {
    q: "How does the AI chatbot work?",
    a: "Our AI chatbot uses semantic search to understand your food preferences and recommends meals that best match what you're looking for.",
  },
  {
    q: "How do I become a food provider?",
    a: "Register an account, then request provider access from your profile. Once approved, you can create your restaurant profile and start listing meals.",
  },
  {
    q: "What is the cancellation policy?",
    a: "You can cancel an order before it's confirmed by the provider. Once preparation begins, cancellations may not be possible.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#0a0a0a] text-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-14">
          <span className="text-xs tracking-widest text-[#a3a380] uppercase font-semibold">
            FAQs
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 mt-3 text-sm">
            Everything you need to know about Food Hub.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-sm hover:bg-white/5 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 shrink-0 transition-transform duration-200 ${open === i ? "rotate-180 text-[#a3a380]" : "text-gray-400"}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
