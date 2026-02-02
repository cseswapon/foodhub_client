"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HiOutlineUserCircle,
  HiOutlineEnvelope,
  HiOutlinePhone,
  // HiOutlineShieldCheck,
  // HiOutlineNoSymbol,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import Link from "next/link";
import { IAllUsersResponse } from "@/types";
import { toast } from "sonner";
import { deleteUserAction } from "@/actions/user.action";

// Status & Role Config
const statusStyles = {
  activate: "bg-green-500/10 text-green-500 border-green-500/20",
  suspend: "bg-red-500/10 text-red-500 border-red-500/20",
};

const roleStyles = {
  admin: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  provider: "bg-[#a3a380]/10 text-[#a3a380] border-[#a3a380]/20",
  customer: "bg-blue-500/10 text-blue-500 border-blue-500/20",
};

export default function UsersList({
  userData,
}: {
  userData: IAllUsersResponse[];
}) {
  const handleDeleteUser = async (id: string) => {
    // return console.log(id);
    const tostId = toast.loading("Deleting user...", { id: id });
    try {
      const result = confirm("Are you sure you want to delete this user?");
      if (result) {
        deleteUserAction(id);
        // console.log(res);
        toast.success("User deleted", { id: tostId });
      } else {
        toast.warning("User not deleted", { id: tostId });
      }
    } catch (e) {
      const error = e instanceof Error ? e.message : "something went wrong";
      toast.error(error, { id: tostId });
    }
  };
  return (
    <main className="p-6 md:p-10 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight italic">
          User <span className="text-[#a3a380]">Directory</span>
        </h1>
        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
          Manage system users, roles and permissions
        </p>
      </div>

      {/* Users Table */}
      <div className="rounded-lg border border-white/5 bg-card/40 backdrop-blur-sm overflow-hidden shadow">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="border-white/5 hover:bg-transparent uppercase tracking-widest text-[10px] font-black">
              <TableHead className="py-5 pl-8 text-muted-foreground">
                User Profile
              </TableHead>
              <TableHead className="text-muted-foreground">Role</TableHead>
              <TableHead className="text-muted-foreground">Contact</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right pr-8 text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          {userData.length > 0 ? (
            <TableBody>
              {userData.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-white/5 hover:bg-white/2 transition-colors group"
                >
                  {/* Identity */}
                  <TableCell className="py-5 pl-8">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center text-[#a3a380]">
                        <HiOutlineUserCircle size={24} />
                      </div>
                      <div>
                        <p className="font-bold uppercase text-sm tracking-tight group-hover:text-[#a3a380] transition-colors">
                          {user.name}
                        </p>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500 font-medium">
                          <HiOutlineEnvelope size={10} />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Role */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`rounded-full px-3 py-0.5 text-[9px] font-black border uppercase tracking-widest ${roleStyles[user.role as keyof typeof roleStyles]}`}
                    >
                      {user.role}
                    </Badge>
                  </TableCell>

                  {/* Contact */}
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs text-gray-400 font-bold tracking-tight">
                      <HiOutlinePhone size={14} className="text-[#a3a380]" />
                      {user.phone}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`rounded-full px-2 py-0 text-[8px] font-black border uppercase ${statusStyles[user.status as keyof typeof statusStyles]}`}
                      >
                        {user.status === "activate" ? "Active" : "Suspended"}
                      </Badge>
                    </div>
                  </TableCell>

                  {/* Actions */}
                  {user.role !== "admin" ? (
                    <TableCell className="text-right pr-8">
                      <div className="flex justify-end gap-2">
                        <Button
                          asChild
                          size="icon"
                          variant="ghost"
                          className="size-9 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white"
                        >
                          <Link href={`/admin/users/edit/${user.id}`}>
                            <HiOutlinePencilSquare size={18} />
                          </Link>
                        </Button>

                        <Button
                          onClick={() => handleDeleteUser(user.id)}
                          size="icon"
                          variant="ghost"
                          className="size-9 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                          <HiOutlineTrash size={18} className="text-red-500" />
                        </Button>

                        {/* Conditional Action: if suspended, show activate icon, else show suspend */}
                        {/* <Button
                          size="icon"
                          variant="ghost"
                          className="size-9 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          {user.status === "activate" ? (
                            <HiOutlineNoSymbol size={18} />
                          ) : (
                            <HiOutlineShieldCheck size={18} />
                          )}
                        </Button> */}
                      </div>
                    </TableCell>
                  ) : (
                    <TableCell className="text-right  text-red-500 text-xs pr-8">
                      <p>N/A</p>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-10 text-gray-500 uppercase text-xs font-bold tracking-widest"
              >
                No users found
              </TableCell>
            </TableRow>
          )}
        </Table>
      </div>
    </main>
  );
}
