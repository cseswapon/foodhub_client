"use client";

import { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cancelOrderAction } from "@/actions/order.action";
import { toast } from "sonner";

export function CancelOrderButton({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();

  const isCancellable = ![
    "preparing",
    "ready",
    "delivered",
    "cancelled",
  ].includes(currentStatus);

  const handleCancel = () => {
    startTransition(async () => {
      const res = await cancelOrderAction(orderId);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  if (!isCancellable) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="h-8 uppercase font-black text-[10px] tracking-widest italic"
        >
          Cancel
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#0c0d0c] border-white/10 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="uppercase font-black italic text-red-500">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400 italic">
            This will cancel your order. This action cannot be undone if the
            provider has already started preparing.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white/5 border-white/10 text-white hover:bg-white/10">
            No, Keep it
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
            disabled={isPending}
            className="bg-red-500 hover:bg-red-600 text-white uppercase font-black"
          >
            {isPending ? "Processing..." : "Yes, Cancel Order"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
