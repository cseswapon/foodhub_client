import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlineShieldCheck,
  HiOutlineMapPin,
  HiOutlinePencilSquare,
} from "react-icons/hi2";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { HiOutlineMail } from "react-icons/hi";
import Link from "next/link";
import { UserService } from "@/services/user.service";
// export const dynamic = "force-dynamic";

const userService = new UserService();
export default async function ProfilePage() {
  const user = await userService.currentUser();
  const profile = user?.data;
  // return 'hello world'
  return (
    <main className="min-h-screen bg-[#0c0d0c] text-white  pt-30 pb-15">
      <div className="container mx-auto px-4 md:px-0">
        {/* Profile Header Card */}
        <section className="relative mb-12">
          <Card className="bg-[#1f2120] border-white/5 rounded-lg overflow-hidden shadow-lg pt-0">
            <div className="h-32 bg-linear-to-r from-[#a3a380]/20 to-transparent" />
            <CardContent className="px-8 pb-10 -mt-16">
              <div className="flex flex-col md:flex-row md:items-end items-center gap-6">
                {/* Avatar Placeholder */}
                <div className="h-32 w-32 rounded-full bg-[#a3a380] border-8 border-[#1f2120] flex items-center justify-center text-[#1f2120]] text-5xl font-black shadow-xl">
                  {profile?.name.charAt(0)}
                </div>

                <div className="flex-1 space-y-2 text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-gray-200 italic">
                      {profile?.name}
                    </h1>
                    <Badge className="bg-[#a3a380]/10 text-[#a3a380] border-[#a3a380]/20 uppercase text-[10px] font-bold tracking-widest px-3">
                      {profile?.role}
                    </Badge>
                  </div>
                  <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 text-sm font-medium">
                    <HiOutlineMail className="text-[#a3a380]" />{" "}
                    {profile?.email}
                  </p>
                </div>
                <Link href="/profile/update">
                  <Button className="bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase tracking-widest rounded-lg px-8 h-12 shadow-lg transition-transform active:scale-95">
                    <HiOutlinePencilSquare className="mr-2" size={18} /> Edit
                    Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side: Personal Information */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-[#a3a380] text-xs font-black uppercase tracking-[0.3em] ml-2">
              General Information
            </h3>
            <Card className="bg-[#1f2120] border-white/5 rounded-lg p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InfoItem
                  icon={<HiOutlinePhone />}
                  label="Contact Phone"
                  value={profile?.phone || ""}
                />
                <InfoItem
                  icon={<HiOutlineShieldCheck />}
                  label="Account Status"
                  value={profile?.status || ""}
                  isCapitalize
                />
                <InfoItem
                  icon={<HiOutlineCalendar />}
                  label="Member Since"
                  value={new Date(profile?.createdAt || "").toLocaleDateString(
                    "en-US",
                    { month: "long", year: "numeric" },
                  )}
                />
                <InfoItem
                  icon={<HiOutlineMapPin />}
                  label="Primary Address"
                  value={profile?.address || "Not set yet"}
                />
              </div>

              <Separator className="bg-white/5" />

              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "h-3 w-3 rounded-full animate-pulse",
                    profile?.emailVerified ? "bg-green-500" : "bg-amber-500",
                  )}
                />
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">
                  {profile?.emailVerified
                    ? "Email Verified"
                    : "Email Verification Pending"}
                </p>
              </div>
            </Card>
          </div>

          {/* Right Side: Account Stats/Actions */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-[#a3a380] text-xs font-black uppercase tracking-[0.3em] ml-2">
              Account Metrics
            </h3>
            <Card className="bg-[#1f2120] border-white/5 rounded-lg p-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <HiOutlineUser size={120} />
              </div>

              <div className="space-y-6 relative z-10">
                <div>
                  <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    Verification Level
                  </p>
                  <div className="h-2 w-full bg-[#0c0d0c] rounded-full overflow-hidden">
                    <div className="h-full bg-[#a3a380] w-[65%]" />
                  </div>
                  <p className="text-right text-[10px] text-[#a3a380] font-bold mt-2 italic">
                    Level 2 Provider
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

// Helper Component for Info Rows
function InfoItem({
  icon,
  label,
  value,
  isCapitalize = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isCapitalize?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-[#a3a380] text-[10px] font-black uppercase tracking-widest">
        {icon} <span>{label}</span>
      </div>
      <p
        className={cn(
          "text-lg font-bold text-white tracking-tight",
          isCapitalize && "capitalize",
        )}
      >
        {value}
      </p>
    </div>
  );
}
