import Category from "@/components/module/home/categories/Categories";
import FeatureSection from "@/components/module/home/feature/FeatureSection";
import Hero from "@/components/module/home/hero/Hero";

export default async function CommonPage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />
      {/* Category */}
      <Category />
      {/* features */}
      <FeatureSection />
    </>
  );
}
