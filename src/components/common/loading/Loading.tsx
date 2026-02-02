import { HiOutlineArrowPath } from "react-icons/hi2";

export default function Loading() {
  return (
    <>
      {" "}
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <HiOutlineArrowPath className="animate-spin text-[#a3a380] size-10" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">
          Loading Provider Data...
        </p>
      </div>
    </>
  );
}
