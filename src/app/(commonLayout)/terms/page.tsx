import { ScrollText, ShieldCheck, HelpCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Terms & Conditions | Food Hub",
  description:
    "Read our terms and conditions to understand your rights and responsibilities.",
};

export default function TermsPage() {
  const lastUpdated = "January 28, 2026";

  return (
    <main className="min-h-screen bg-[#0c0d0c] text-white py-12 px-4 pt-30">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-4 mb-4 rounded-2xl bg-[#a3a380]/10 text-[#a3a380] border border-[#a3a380]/20 shadow-[0_0_20px_rgba(163,163,128,0.1)]">
            <ScrollText size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            Terms & <span className="text-[#a3a380]">Conditions</span>
          </h1>
          <p className="text-gray-500 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest">
            <Clock size={14} className="text-[#a3a380]" /> Last Updated:{" "}
            {lastUpdated}
          </p>
        </div>

        <div className="space-y-12">
          {/* Welcome Section */}
          <section className="bg-[#1f2120] p-8 rounded-lg border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#a3a380]/5 blur-3xl rounded-full -mr-10 -mt-10" />
            <p className="text-lg leading-relaxed text-gray-400 italic">
              Welcome to{" "}
              <span className="font-bold text-[#a3a380]">Food Hub</span>. By
              accessing our platform and using our culinary services, you agree
              to comply with and be bound by the following terms. We craft
              excellence, and we expect the same from our community.
            </p>
          </section>

          {/* Content Sections */}
          <div className="space-y-16 px-2">
            {/* Section 1 */}
            <section className="flex flex-col md:flex-row gap-6">
              <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-xl bg-[#a3a380] text-[#1f2120] shadow-lg shadow-[#a3a380]/20">
                <ShieldCheck size={28} />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                  01. Acceptance of Terms
                </h2>
                <p className="text-gray-400 leading-7 text-justify">
                  By using Food Hub, you confirm that you are at least 18 years
                  old or are accessing the site under the supervision of a
                  parent or guardian. Our services are a privilege, and by
                  engaging with us, you accept our standard of conduct.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="flex flex-col md:flex-row gap-6">
              <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-xl bg-[#a3a380] text-[#1f2120] shadow-lg shadow-[#a3a380]/20">
                <ScrollText size={28} />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                  02. Ordering & Payments
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-400 leading-7 text-justify">
                    All orders are subject to availability and kitchen capacity.
                    Prices may reflect real-time updates from our providers.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Orders cannot be cancelled once the kitchen begins preparation.",
                      "Delivery windows are estimates, affected by traffic and weather.",
                      "Refunds are processed within 5-7 business days.",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-gray-500"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#a3a380] mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="flex flex-col md:flex-row gap-6">
              <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-xl bg-[#a3a380] text-[#1f2120] shadow-lg shadow-[#a3a380]/20">
                <HelpCircle size={28} />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-black uppercase tracking-tight text-white">
                  03. User Conduct
                </h2>
                <p className="text-gray-400 leading-7 text-justify">
                  Integrity is key. Misuse of promo codes, harassment of
                  delivery partners, or fraudulent activity will result in
                  immediate and permanent account suspension without prior
                  notice.
                </p>
              </div>
            </section>
          </div>

          {/* Privacy Note Card */}
          <Card className="bg-[#1f2120] border-dashed border-[#a3a380]/30 rounded-lg mt-12 overflow-hidden">
            <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
              <div className="p-4 rounded-full bg-[#a3a380]/5 text-[#a3a380]">
                <ShieldCheck size={32} />
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-black uppercase tracking-widest text-sm text-[#a3a380] mb-2">
                  Privacy Policy Notice
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-tighter">
                  Your data is protected. Use of Food Hub is also governed by
                  our Privacy Policy. We handle your information with the same
                  care we handle our food.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Footer */}
          <div className="text-center mt-20 py-12 border-t border-white/5">
            <p className="text-gray-600 text-xs uppercase font-bold tracking-[0.3em] mb-4">
              Questions regarding these terms?
            </p>
            <a
              href="mailto:support@foodhub.com"
              className="text-2xl font-black text-white hover:text-[#a3a380] transition-colors tracking-tighter"
            >
              SUPPORT@FOODHUB.COM
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
