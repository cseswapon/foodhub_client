import { LoginForm } from "@/components/module/auth/LoginForm";

export const metadata = {
  title: "Login | Food Hub",
  description: "Login to your account",
};

export default async function LoginPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#0c0d0c] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#a3a380]/5 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#a3a380]/5 rounded-full blur-[120px]" />
        </div>
        <div className="flex flex-col items-center mb-8">
          <div className="h-1.5 w-1.5 rounded-full bg-[#a3a380] mb-2" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#a3a380]">
            Welcome Back
          </span>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
