import AddMenuForm from "@/components/module/provider/AddMenuForm";
import { CategoriesService } from "@/services/categories.service";
import { ProvidersService } from "@/services/provider.service";
import { UserService } from "@/services/user.service";

const categoriesService = new CategoriesService();
const providersService = new ProvidersService();
const userService = new UserService();
export default async function MenuAdd() {
  const [user, category, provider] = await Promise.all([
    await userService.currentUser(),
    await categoriesService.getAllCategories(),
    await providersService.getAllProvidersMe(),
  ]);
  // console.log(user?.data);
  return (
    <>
      <AddMenuForm
        user={user?.data as any}
        categories={category?.data as any}
        providers={provider?.data as any}
      />
    </>
  );
}
