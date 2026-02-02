import UpdateMenuForm from "@/components/module/provider/UpdateMenuForm";
import { MealsService } from "@/services/meal.service";

const mealService = new MealsService();
export default async function UpdateMenu({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meal = await mealService.getMealProviderDetails(id as string);
  // console.log(meal);
  return (
    <>
      <UpdateMenuForm meal={meal?.data as any} />
    </>
  );
}
