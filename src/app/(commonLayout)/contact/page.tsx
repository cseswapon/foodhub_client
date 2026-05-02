import { Metadata } from "next";
import ContactPage from "@/components/module/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Food Hub team for support, partnerships, or general inquiries.",
};

export default function Contact() {
  return <ContactPage />;
}
