import UsersList from "@/components/module/admin/UsersList";
import { UserService } from "@/services/user.service";
import { IAllUsersResponse } from "@/types";

const userService = new UserService();
export default async function AdminUsers() {
  const users = await userService.getAllUsers();
  return (
    <>
      <UsersList userData={users?.data as IAllUsersResponse[]} />
    </>
  );
}
