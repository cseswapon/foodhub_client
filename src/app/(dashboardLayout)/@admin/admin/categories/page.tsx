import CategoryList from "@/components/module/category/CategoryList";
import { CategoriesService } from "@/services/categories.service";

const categoriesService = new CategoriesService();
export default async function AdminCategories() {
  const categories = (await categoriesService.getAllCategories()) || [];
  return (
    <>
      <CategoryList categories={categories?.data as any[]} />
    </>
  );
}
