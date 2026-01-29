import {
  Lock,
  Eye,
  ShieldCheck,
  Database,
  Mail,
  Bell
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { HiOutlineChevronRight } from "react-icons/hi";

export const metadata = {
  title: "Privacy Policy | Food Hub",
  description:
    "Learn how Food Hub collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  const lastUpdated = "January 28, 2026";

  return (
    <main className="min-h-screen bg-[#0c0d0c] text-white pt-30 pb-15 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center justify-center p-4 mb-4 rounded-lg bg-[#a3a380]/10 text-[#a3a380] border border-[#a3a380]/20 shadow-[0_0_30px_rgba(163,163,128,0.05)]">
            <Lock size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            Privacy <span className="text-[#a3a380]">Policy</span>
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto text-sm font-medium leading-relaxed">
            At <span className="text-white font-bold">Food Hub</span>, your
            privacy is not just a policy—it&apos;s a commitment. We handle your
            data with the same precision we apply to our culinary services.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-[#a3a380] font-black uppercase tracking-[0.3em]">
            <ShieldCheck size={14} /> Last updated: {lastUpdated}
          </div>
        </div>

        <div className="space-y-16">
          {/* Section 1: Collection */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-[#a3a380] flex items-center justify-center text-[#0c0d0c] shadow-lg shadow-[#a3a380]/20">
                <Eye size={24} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                1. Information We Collect
              </h2>
            </div>

            <p className="text-gray-400 leading-7 text-justify pl-14">
              যখন আপনি Food Hub ব্যবহার করেন, তখন আমরা আপনার কাছ থেকে কিছু
              প্রয়োজনীয় তথ্য সংগ্রহ করি যাতে আপনাকে আরও ভালো এবং পার্সোনালাইজড
              সেবা দিতে পারি।
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 md:pl-14">
              <div className="group bg-[#1f2120] p-6 rounded-lg border border-white/5 hover:border-[#a3a380]/30 transition-all">
                <span className="text-[#a3a380] font-black uppercase tracking-widest text-[10px] block mb-2">
                  Personal Data
                </span>
                <p className="text-sm text-gray-300 leading-relaxed">
                  রেজিস্ট্রেশনের সময় আপনার নাম, ইমেইল এবং ফোন নম্বর সংগ্রহ করা
                  হয়।
                </p>
              </div>
              <div className="group bg-[#1f2120] p-6 rounded-lg border border-white/5 hover:border-[#a3a380]/30 transition-all">
                <span className="text-[#a3a380] font-black uppercase tracking-widest text-[10px] block mb-2">
                  Location Data
                </span>
                <p className="text-sm text-gray-300 leading-relaxed">
                  সঠিক ঠিকানায় খাবার পৌঁছানোর জন্য আপনার ডেলিভারি অ্যাড্রেস
                  প্রয়োজন হয়।
                </p>
              </div>
            </div>
          </section>

          <Separator className="bg-white/5" />

          {/* Section 2: Usage */}
          <section className="space-y-8 pl-0 md:pl-14">
            <div className="flex items-center gap-4 -ml-14">
              <div className="h-10 w-10 rounded-xl bg-[#a3a380] flex items-center justify-center text-[#0c0d0c] shadow-lg shadow-[#a3a380]/20">
                <Database size={24} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                2. How We Use Your Data
              </h2>
            </div>

            <div className="space-y-4">
              {[
                "অর্ডার প্রসেস এবং আপনার ডোরস্টেপে দ্রুত ডেলিভারি নিশ্চিত করতে।",
                "আপনার পছন্দের খাবারের উপর ভিত্তি করে কিউরেটেড অফার এবং ডিসকাউন্ট দিতে।",
                "আমাদের প্ল্যাটফর্মের নিরাপত্তা এবং সেবার মান উত্তরোত্তর উন্নত করতে।",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="h-5 w-5 rounded-full bg-[#a3a380]/10 border border-[#a3a380]/20 flex items-center justify-center mt-1 shrink-0 group-hover:bg-[#a3a380] transition-colors">
                    <HiOutlineChevronRight
                      size={12}
                      className="text-[#a3a380] group-hover:text-[#0c0d0c]"
                    />
                  </div>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Security Card */}
          <Card className="bg-linear-to-br from-[#1f2120] to-[#0c0d0c] border-dashed border-[#a3a380]/30 rounded-lg overflow-hidden">
            <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="bg-[#a3a380]/10 p-6 rounded-lg text-[#a3a380] border border-[#a3a380]/10">
                <ShieldCheck size={48} />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black uppercase tracking-tight text-white">
                  Data Encryption & Security
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
                  আমরা আপনার ডেটা সুরক্ষিত রাখতে ইন্ডাস্ট্রি স্ট্যান্ডার্ড
                  এনক্রিপশন ব্যবহার করি। আপনার পেমেন্ট ইনফরমেশন সম্পূর্ণ নিরাপদ
                  এবং আমরা কখনো আপনার পার্সোনাল পাসওয়ার্ড স্টোর করি না।
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Communication */}
          <section className="space-y-6 pl-0 md:pl-14">
            <div className="flex items-center gap-4 -ml-14">
              <div className="h-10 w-10 rounded-xl bg-[#a3a380] flex items-center justify-center text-[#0c0d0c] shadow-lg shadow-[#a3a380]/20">
                <Bell size={24} />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                3. Communication
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-justify">
              অর্ডারের রিয়েল-টাইম আপডেট দিতে আমরা আপনাকে ইমেইল বা এসএমএস পাঠাতে
              পারি। আপনি চাইলে যেকোনো সময় প্রোফাইল সেটিংস থেকে এই
              নোটিফিকেশনগুলো কাস্টমাইজ বা বন্ধ করতে পারবেন।
            </p>
          </section>

          {/* Contact Footer */}
          <div className="rounded-[40px] bg-[#1f2120] p-12 text-center border border-white/5 space-y-6">
            <div className="h-16 w-16 bg-[#a3a380]/5 rounded-full flex items-center justify-center mx-auto text-[#a3a380]">
              <Mail size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Privacy সংক্রান্ত প্রশ্ন আছে?
              </h2>
              <p className="text-gray-500 text-sm max-w-xs mx-auto uppercase tracking-tighter font-medium">
                আপনার ডেটা সিকিউরিটি নিয়ে কোনো দুশ্চিন্তা থাকলে আমাদের সাথে
                যোগাযোগ করুন।
              </p>
            </div>
            <Link
              href="mailto:cseswaponsaha@gmail.com"
              className="inline-flex items-center justify-center px-10 py-4 rounded-lg bg-[#a3a380] text-[#0c0d0c] font-black uppercase tracking-widest hover:bg-[#8e8e6f] transition-all active:scale-95 shadow-xl shadow-[#a3a380]/10"
            >
              Contact Privacy Team
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
