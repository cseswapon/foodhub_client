import { RegisterForm } from "@/components/module/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <div className="flex mt-5 w-full h-[90vh] items-center justify-center p-6 md:p-10 bg-gray-100">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}
