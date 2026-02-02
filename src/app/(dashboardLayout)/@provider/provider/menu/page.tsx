import ProviderMenu from "@/components/module/provider/ProviderMenu";
import { MealsService } from "@/services/meal.service";

const mealService = new MealsService();
export default async function ProviderMenuList() {
  const meals = await mealService.getAllMealMe();
  // console.log(meals?.data);
  return (
    <>
      <ProviderMenu meals={meals?.data as any[]} />
    </>
  );
}
