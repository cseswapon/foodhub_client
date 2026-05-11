"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2 } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    // Simulate sending — in production, connect to an email API
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="bg-[#0c0d0c] pt-30 pb-15 px-4 min-h-screen">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-widest text-[#a3a380] uppercase font-semibold">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-3">
            Contact Us
          </h1>
          <p className="text-gray-400 mt-4 text-sm max-w-lg mx-auto">
            Have a question, feedback, or partnership inquiry? We{"'"}d love to
            hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#a3a380]/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#a3a380]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Address</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Road 23-1A, Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#a3a380]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#a3a380]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Phone</p>
                    <p className="text-gray-400 text-sm mt-1">
                      +88 017 1234 5678
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#a3a380]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#a3a380]" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Email</p>
                    <p className="text-gray-400 text-sm mt-1">
                      cseswaponsaha@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Follow Us</h2>
              <div className="flex gap-3">
                {[
                  { icon: FaFacebookF, href: "#", label: "Facebook" },
                  { icon: FaInstagram, href: "#", label: "Instagram" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#a3a380] hover:border-[#a3a380] hover:text-black transition-colors"
                    aria-label={s.label}
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm font-semibold mb-2">Business Hours</p>
              <div className="space-y-1 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Monday – Friday</span>
                  <span>9:00 AM – 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday – Sunday</span>
                  <span>10:00 AM – 8:00 PM</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {sent ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto" />
                  <h3 className="text-xl font-bold">Message Sent!</h3>
                  <p className="text-gray-400 text-sm">
                    We{"'"}ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setForm({
                        name: "",
                        email: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="text-sm text-[#a3a380] underline"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 mb-1.5 block">
                      Name *
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#a3a380] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 mb-1.5 block">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#a3a380] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 mb-1.5 block">
                    Subject
                  </label>
                  <input
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    placeholder="How can we help?"
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#a3a380] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-400 mb-1.5 block">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Your message..."
                    className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-[#a3a380] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#a3a380] hover:bg-[#8e8e6d] text-black font-bold py-3.5 rounded-xl text-sm transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
