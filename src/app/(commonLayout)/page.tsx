import Category from "@/components/module/home/categories/Categories";
import FeatureSection from "@/components/module/home/feature/FeatureSection";
import Hero from "@/components/module/home/hero/Hero";
import StatsSection from "@/components/module/home/stats/StatsSection";
import HowItWorksSection from "@/components/module/home/how-it-works/HowItWorksSection";
import PopularMealsSection from "@/components/module/home/popular-meals/PopularMealsSection";
import TopProvidersSection from "@/components/module/home/top-providers/TopProvidersSection";
import TestimonialsSection from "@/components/module/home/testimonials/TestimonialsSection";
import FaqSection from "@/components/module/home/faq/FaqSection";
import CtaSection from "@/components/module/home/cta/CtaSection";
import { ReviewService } from "@/services/review.service";

export default async function CommonPage() {
  const reviewService = new ReviewService();
  const reviewRes = await reviewService.getPublicReviews(8);

  return (
    <>
      {/* 1. Hero Section */}
      <Hero />
      {/* 2. Stats */}
      <StatsSection />
      {/* 3. Category */}
      <Category />
      {/* 4. How It Works */}
      <HowItWorksSection />
      {/* 5. Popular Meals */}
      <PopularMealsSection />
      {/* 6. Features */}
      <FeatureSection />
      {/* 7. Top Providers */}
      <TopProvidersSection />
      {/* 8. Testimonials */}
      <TestimonialsSection reviews={reviewRes?.data ?? []} />
      {/* 9. CTA + Newsletter */}
      <CtaSection />
      {/* 10. FAQ */}
      <FaqSection />
    </>
  );
}
