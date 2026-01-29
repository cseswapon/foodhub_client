import { RegisterForm } from "@/components/module/auth/RegisterForm";

export const metadata = {
  title: "Register | Food Hub",
  description: "Register to your account and start your culinary journey",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6 md:p-10 bg-[#0c0d0c]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#a3a380]/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <RegisterForm />
      </div>
    </main>
  );
}
