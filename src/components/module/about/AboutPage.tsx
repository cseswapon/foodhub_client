"use client";

import { motion } from "framer-motion";
import { Heart, Target, Users, Award, ChefHat, Zap } from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Heart,
    title: "Customer First",
    desc: "Every decision we make starts with one question: how does this make life better for our customers?",
  },
  {
    icon: Target,
    title: "Quality Obsessed",
    desc: "We partner with providers who share our commitment to fresh ingredients and consistent quality.",
  },
  {
    icon: Users,
    title: "Community Driven",
    desc: "Food Hub is built for people — customers, providers, and food lovers across Bangladesh.",
  },
  {
    icon: Zap,
    title: "Innovation",
    desc: "From AI-powered meal discovery to real-time order tracking, we use technology to make food ordering better.",
  },
];

const team = [
  { name: "Swapon Saha", role: "Founder & CEO", avatar: "SS" },
  { name: "Ayesha Akter", role: "Head of Operations", avatar: "AA" },
  { name: "Rahim Chowdhury", role: "Lead Engineer", avatar: "RC" },
  { name: "Nadia Islam", role: "UX Designer", avatar: "NI" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero */}
      <section className="pt-32 pb-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <span className="text-xs tracking-widest text-[#a3a380] uppercase font-semibold">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight">
            We{"'"}re on a Mission to{" "}
            <span className="text-[#a3a380]">Feed the Nation</span>
          </h1>
          <p className="text-gray-400 mt-6 text-base leading-relaxed max-w-2xl mx-auto">
            Food Hub was born from a simple idea: connecting passionate food
            providers with hungry customers in Bangladesh. Since 2023, we{"'"}ve
            been building a platform that makes delicious food accessible to
            everyone.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/5 bg-[#0d0d0b]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "12,000+", label: "Happy Customers" },
              { value: "320+", label: "Food Providers" },
              { value: "85,000+", label: "Orders Delivered" },
              { value: "24", label: "Cities Served" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl md:text-4xl font-extrabold text-[#a3a380]">
                  {s.value}
                </p>
                <p className="text-sm text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="md:py-24 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#a3a380]/20 flex items-center justify-center mb-6">
                <ChefHat className="w-7 h-7 text-[#a3a380]" />
              </div>
              <h2 className="text-3xl font-extrabold mb-4">Who We Are</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Food Hub is a modern food marketplace that connects food lovers
                with the best local restaurants and home chefs across
                Bangladesh. We believe everyone deserves access to fresh,
                affordable, and delicious food.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Our platform uses cutting-edge AI to help you discover meals you
                {"'"}ll love, and provides providers with powerful tools to grow
                their business.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-[#a3a380]/30 transition-colors"
                >
                  <v.icon className="w-5 h-5 text-[#a3a380] mb-3" />
                  <h3 className="font-semibold text-sm mb-1">{v.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="md:py-24 py-12 bg-[#0d0d0b] px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <span className="text-xs tracking-widest text-[#a3a380] uppercase font-semibold">
              The People
            </span>
            <h2 className="text-3xl font-extrabold mt-2">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#a3a380] flex items-center justify-center text-black text-xl font-bold mx-auto mb-4">
                  {member.avatar}
                </div>
                <p className="font-bold text-sm">{member.name}</p>
                <p className="text-gray-400 text-xs mt-0.5">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="md:py-24 py-12 text-center px-4">
        <div className="max-w-xl mx-auto">
          <Award className="w-12 h-12 text-[#a3a380] mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 text-sm mb-8">
            Join thousands of happy customers and discover amazing food near
            you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/meal"
              className="bg-[#a3a380] hover:bg-[#8e8e6d] text-black font-bold px-8 py-3 rounded-full text-sm transition-colors"
            >
              Explore Meals
            </Link>
            <Link
              href="/contact"
              className="border border-white/20 hover:border-[#a3a380] text-white px-8 py-3 rounded-full text-sm transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
