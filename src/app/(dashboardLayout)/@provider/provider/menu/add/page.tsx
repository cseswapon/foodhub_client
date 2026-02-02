import AddMenuForm from "@/components/module/provider/AddMenuForm";
import { CategoriesService } from "@/services/categories.service";
import { ProvidersService } from "@/services/provider.service";

const categoriesService = new CategoriesService();
const providersService = new ProvidersService();
export default async function MenuAdd() {
  const [category, provider] = await Promise.all([
    await categoriesService.getAllCategories(),
    await providersService.getAllProvidersMe(),
  ]);
  return (
    <>
      <AddMenuForm
        categories={category?.data as any}
        providers={provider?.data as any}
      />
    </>
  );
}
