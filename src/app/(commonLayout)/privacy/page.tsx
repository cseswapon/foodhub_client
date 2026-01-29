import { Lock, Eye, ShieldCheck, Database, Mail, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Food Hub",
  description:
    "Learn how Food Hub collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  const lastUpdated = "October 20, 2023";

  return (
    <div className="container w-full mx-auto py-12 px-4 md:pt-[8%] pt-[30%] text-justify">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-green-500/10 text-green-600">
          <Lock size={32} />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground">
          At <span className="font-semibold text-foreground">Food Hub</span>,
          your privacy is our priority. This policy explains how we handle your
          data.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck size={14} /> Last updated: {lastUpdated}
        </div>
      </div>

      <div className="space-y-12">
        {/* Intro */}
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Eye className="text-green-600" size={24} /> 1. Information We
            Collect
          </h2>
          <p className="text-muted-foreground leading-7">
            যখন আপনি Food Hub ব্যবহার করেন, তখন আমরা আপনার কাছ থেকে কিছু
            প্রয়োজনীয় তথ্য সংগ্রহ করি যাতে আপনাকে আরও ভালো সেবা দিতে পারি।
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 list-none p-0">
            <li className="bg-muted/50 p-4 rounded-lg border">
              <span className="font-bold block text-foreground">
                Personal Data:
              </span>
              Name, email address, and phone number when you register.
            </li>
            <li className="bg-muted/50 p-4 rounded-lg border">
              <span className="font-bold block text-foreground">
                Location Data:
              </span>
              Your delivery address to ensure your food reaches the right spot.
            </li>
          </ul>
        </section>

        <Separator />

        {/* Usage */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Database className="text-green-600" size={24} /> 2. How We Use Your
            Data
          </h2>
          <p className="text-muted-foreground leading-7">
            আপনার তথ্যগুলো আমরা নিচের কাজগুলোতে ব্যবহার করি:
          </p>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500 mt-2 shrink-0" />
              অর্ডার প্রসেস এবং দ্রুত ডেলিভারি নিশ্চিত করতে।
            </li>
            <li className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500 mt-2 shrink-0" />
              আপনার পছন্দের খাবারের উপর ভিত্তি করে অফার এবং ডিসকাউন্ট দিতে।
            </li>
            <li className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500 mt-2 shrink-0" />
              আমাদের সার্ভিসের নিরাপত্তা এবং মান উন্নত করতে।
            </li>
          </ul>
        </section>

        {/* Security Card */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <ShieldCheck className="text-primary" size={40} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Data Security</h3>
              <p className="text-muted-foreground text-sm">
                আমরা আপনার ডেটা সুরক্ষিত রাখতে ইন্ডাস্ট্রি স্ট্যান্ডার্ড
                এনক্রিপশন ব্যবহার করি। আপনার পেমেন্ট ইনফরমেশন সম্পূর্ণ নিরাপদ
                এবং আমরা কখনো আপনার পাসওয়ার্ড আমাদের কাছে স্টোর করি না।
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Communication */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="text-green-600" size={24} /> 3. Communication
          </h2>
          <p className="text-muted-foreground">
            আমরা আপনাকে ইমেইল বা এসএমএস এর মাধ্যমে অর্ডারের আপডেট পাঠাতে পারি।
            আপনি চাইলে যেকোনো সময় আমাদের {"Unsubscribe"} অপশন ব্যবহার করে এগুলো
            বন্ধ করতে পারবেন।
          </p>
        </section>

        {/* Contact */}
        <div className="rounded-2xl bg-muted p-8 text-center">
          <Mail className="mx-auto mb-4 text-muted-foreground" size={32} />
          <h2 className="text-xl font-bold mb-2">
            Privacy সংক্রান্ত প্রশ্ন আছে?
          </h2>
          <p className="text-muted-foreground mb-6">
            আপনার ডেটা নিয়ে কোনো দুশ্চিন্তা থাকলে আমাদের সাথে যোগাযোগ করুন।
          </p>
          <Link
            href="mailto:cseswaponsaha@gmail.com"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-all"
          >
            Contact Privacy Team
          </Link>
        </div>
      </div>
    </div>
  );
}
