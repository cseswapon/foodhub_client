import { LoginForm } from "@/components/module/auth/LoginForm";

export default async function LoginPage() {
  return (
    <>
      <div className="flex mt-5 w-full h-[80vh] items-center justify-center p-6 md:p-10 bg-gray-100">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
