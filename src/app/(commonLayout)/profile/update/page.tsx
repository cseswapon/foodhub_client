"use client";

import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineCamera,
  HiOutlineArrowLeft,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IUserResponse } from "@/types";
import { getCurrentUser, updateCurrentUser } from "@/actions/user.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UpdateProfile() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const res: Partial<IUserResponse> | undefined = await getCurrentUser();
        // console.log(res);
        if (res?.success && res.data) {
          setFormData({
            name: res.data.name || "",
            phone: res.data.phone || "",
            address: res.data.address || "",
          });
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const toastId = toast.loading("Updating Profile...");
    e.preventDefault();
    try {
      // console.log(formData);
      const result = await updateCurrentUser(formData);
       toast.success(result?.message || "Profile updated successfully", {
        id: toastId,
      });
      router.push("/profile");
    } catch (e) {
      const error = e instanceof Error ? e.message : "Something went wrong";
      // console.log(error);
      toast.error(error, { id: toastId });
      return undefined;
    }
  };

  return (
    <main className="min-h-screen bg-[#0c0d0c] text-white pt-30 pb-15">
      <div className="container mx-auto px-4 md:px-0">
        <div className="mb-10 space-y-4">
          <Link
            href="/profile"
            className="flex items-center gap-2 text-[#a3a380] text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
          >
            <HiOutlineArrowLeft size={16} /> Back to Profile
          </Link>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Edit <span className="text-[#a3a380]">Profile</span>
          </h1>
        </div>

        <Card className="bg-[#1f2120] border-white/5 rounded-lg overflow-hidden shadow-2xl">
          <CardContent className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Image Preview */}
              <div className="flex flex-col items-center justify-center space-y-4 mb-10">
                <div className="relative group">
                  <div className="h-28 w-28 rounded-[30px] bg-[#0c0d0c] border-2 border-dashed border-[#a3a380]/30 flex items-center justify-center text-[#a3a380] overflow-hidden">
                    <HiOutlineUser size={40} className="opacity-20" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <HiOutlineCamera size={24} className="text-[#a3a380]" />
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">
                  Update Photo
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em] ml-1">
                    Full Name
                  </Label>
                  <div className="relative">
                    <HiOutlineUser className="absolute left-4 top-3.5 text-[#a3a380] size-5" />
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-[#0c0d0c] border-white/10 text-white pl-12 h-12 rounded-xl focus:border-[#a3a380] transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em] ml-1">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <HiOutlinePhone className="absolute left-4 top-3.5 text-[#a3a380] size-5" />
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-[#0c0d0c] border-white/10 pl-12 h-12 rounded-xl text-white focus:border-[#a3a380] transition-all"
                      placeholder="017XXXXXXXX"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="md:col-span-2 space-y-2">
                  <Label className="text-gray-400 text-[10px] uppercase font-bold tracking-[0.2em] ml-1">
                    Living Address
                  </Label>
                  <div className="relative">
                    <HiOutlineMapPin className="absolute left-4 top-4 text-[#a3a380] size-5" />
                    <Textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="bg-[#0c0d0c] border-white/10 pl-12 pt-3.5 rounded-xl min-h-30 text-white focus:border-[#a3a380] transition-all"
                      placeholder="Street address, City, Area code"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-col md:flex-row gap-4">
                <Button
                  disabled={loading}
                  type="submit"
                  className="flex-1 bg-[#a3a380] hover:bg-[#8e8e6f] text-[#1f2120] font-black uppercase tracking-widest h-14 rounded-2xl shadow-xl transition-all active:scale-95"
                >
                  Save Changes
                </Button>
                <Button
                  variant="ghost"
                  asChild
                  className="flex-1 border border-white/10 hover:bg-white/5 text-gray-400 font-black uppercase tracking-widest h-14 rounded-2xl"
                >
                  <Link href="/profile">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="mt-8 text-center text-[10px] text-gray-600 uppercase tracking-widest">
          Email address cannot be changed. Contact support for primary mail
          updates.
        </p>
      </div>
    </main>
  );
}
