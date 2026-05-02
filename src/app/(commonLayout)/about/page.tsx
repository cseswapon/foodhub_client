import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Food Hub — our story, mission, and the team behind the platform.",
};

import AboutPage from "@/components/module/about/AboutPage";

export default function About() {
  return <AboutPage />;
}
