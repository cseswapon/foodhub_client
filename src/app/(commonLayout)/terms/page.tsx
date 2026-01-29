import { ScrollText, ShieldCheck, HelpCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Terms & Conditions | Food Hub",
  description:
    "Read our terms and conditions to understand your rights and responsibilities.",
};

export default function TermsPage() {
  const lastUpdated = "October 20, 2023";

  return (
    <div className="container w-full mx-auto py-12 px-4 md:pt-[8%] pt-[30%] text-justify">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-primary/10 text-primary">
          <ScrollText size={32} />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Terms & Conditions
        </h1>
        <p className="text-muted-foreground flex items-center justify-center gap-2">
          <Clock size={16} /> Last Updated: {lastUpdated}
        </p>
      </div>

      <div className="grid gap-8">
        {/* Welcome Section */}
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Welcome to{" "}
            <span className="font-bold text-foreground">Food Hub</span>. By
            accessing our website and using our food delivery services, you
            agree to comply with and be bound by the following terms and
            conditions. Please read them carefully.
          </p>
        </section>

        <Separator />

        {/* Content Sections */}
        <div className="space-y-10">
          {/* Section 1 */}
          <section className="flex gap-4">
            <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <ShieldCheck className="text-primary" size={24} />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-7">
                By using Food Hub, you confirm that you are at least 18 years
                old or are accessing the site under the supervision of a parent
                or guardian. If you do not agree to these terms, please refrain
                from using our platform.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="flex gap-4">
            <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <ScrollText className="text-primary" size={24} />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">
                2. Ordering & Payments
              </h2>
              <p className="text-muted-foreground leading-7">
                All orders placed are subject to availability. Prices may change
                based on restaurant updates. Payments must be made via our
                integrated payment gateways or Cash on Delivery (where
                applicable).
              </p>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>
                  Orders cannot be cancelled once the restaurant starts
                  preparing.
                </li>
                <li>
                  Delivery times are estimates and may vary due to traffic or
                  weather.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="flex gap-4">
            <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <HelpCircle className="text-primary" size={24} />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">
                3. User Conduct
              </h2>
              <p className="text-muted-foreground leading-7">
                You agree not to use the service for any unlawful purpose.
                Harassment of delivery partners or misuse of promotional codes
                will result in immediate account suspension.
              </p>
            </div>
          </section>
        </div>

        {/* Important Note Card */}
        <Card className="bg-muted/50 border-dashed mt-8">
          <CardContent className="p-6">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <ShieldCheck size={18} className="text-primary" />
              Privacy Policy Notice
            </h3>
            <p className="text-sm text-muted-foreground">
              Your use of Food Hub is also governed by our Privacy Policy.
              Please review it to understand how we collect and use your
              personal information.
            </p>
          </CardContent>
        </Card>

        {/* Contact Footer */}
        <div className="text-center mt-12 py-8 border-t">
          <p className="text-muted-foreground mb-4">
            Have questions about our terms?
          </p>
          <a
            href="mailto:support@foodhub.com"
            className="text-primary font-bold hover:underline underline-offset-4"
          >
            support@foodhub.com
          </a>
        </div>
      </div>
    </div>
  );
}
