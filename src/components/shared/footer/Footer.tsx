"use client";

import Link from "next/link";
import { FaBowlFood, FaFacebookF, FaInstagram, FaGlobe } from "react-icons/fa6";
import { Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "bg-[#0a0a0a] text-white py-12 px-4 border-t border-white/10",
        className,
      )}
    >
      <div className="container mx-auto text-center md:text-start">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="flex flex-col md:items-start items-center justify-center md:justify-start gap-4">
            <Link href="/" className="flex items-center gap-2">
              <FaBowlFood size={35} className="text-white" />
              <span className="text-xl font-bold tracking-tighter">
                Food Hub
              </span>
            </Link>
            <p className="text-gray-400 md:text-sm text-xs leading-relaxed">
              Experience the best culinary delights with Spicyhunt. We bring
              fresh ingredients and amazing taste to your table.
            </p>
            <div className="flex gap-4 mt-2">
              <Link
                href="#"
                className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-colors"
              >
                <FaGlobe size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-colors"
              >
                <FaFacebookF size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-white/5 rounded-full hover:bg-white/20 transition-colors"
              >
                <FaInstagram size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/meal"
                  className="hover:text-white transition-colors"
                >
                  Browse Meals
                </Link>
              </li>
              <li>
                <Link
                  href="/provider"
                  className="hover:text-white transition-colors"
                >
                  Providers
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm">
              <li className="flex md:items-start items-center justify-center md:justify-start gap-3">
                <MapPin size={18} className="text-white/50 shrink-0" />
                <span>Road 23-1A Dhaka, Bangladesh</span>
              </li>
              <li className="flex gap-3 items-center justify-center md:justify-start">
                <Phone size={18} className="text-white/50 shrink-0" />
                <span>+88 017 1234 5678</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail size={18} className="text-white/50 shrink-0" />
                <span>cseswaponsaha@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Reservation / Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get latest updates and offers.
            </p>
            <div className="flex flex-col md:items-start items-center  justify-center md:justify-start gap-2">
              <button className="bg-[#a3a380] hover:bg-[#8e8e6d] text-black py-2 px-4 rounded transition-colors w-fit text-sm">
                Reserve Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {currentYear} Food Hub. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
