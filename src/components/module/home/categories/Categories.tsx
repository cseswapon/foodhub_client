import { CategoryCard } from '@/components/common/card/CategoryCard';

const CATEGORIES_DATA = [
  {
    id: 1,
    title: "Soups",
  },
  {
    id: 2,
    title: "Main Course",
  },
  {
    id: 3,
    title: "Desserts",
  },
  {
    id: 4,
    title: "Desserts",
  },
];

export default function Category() {
  return (
    <>
      <div className="bg-[#1f2120] py-24">
        <div className="flex items-center justify-center gap-2  px-4 py-2 rounded-full">
          <span className="h-1 w-1 rounded-full bg-[#a3a380]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#a3a380]">
            Art of Fine Dining
          </span>
        </div>

        <div className="text-center px-4 pb-10 pt-5">
          <h1 className="text-4xl font-black leading-[1.1] tracking-tighter md:text-5xl text-gray-300 uppercase">
            Experience Dining <br />
            <span className="text-[#a3a380] italic font-serif lowercase tracking-normal">
              Redefined
            </span>{" "}
            by Flavor
          </h1>

          <p className="mt-6 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Savor the harmony of fresh ingredients and culinary expertise. From
            hearty classics to modern creations, explore our curated categories
            designed to elevate your gastronomic journey.
          </p>
        </div>

        <div className="grid md:grid-cols-4 container mx-auto">
          {CATEGORIES_DATA.map((item, i) => (
            <CategoryCard key={i} title={item.title} />
          ))}
        </div>
      </div>
    </>
  );
}
