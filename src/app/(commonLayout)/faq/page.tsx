import { Metadata } from "next";
import FaqSection from "@/components/module/home/faq/FaqSection";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to frequently asked questions about Food Hub.",
};

export default function FaqPage() {
  return (
    <div className="pt-20">
      <FaqSection />
    </div>
  );
}
