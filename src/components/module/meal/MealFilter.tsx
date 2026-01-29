import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export function MealFilter() {
  return (
    <div className="space-y-8 p-6 bg-[#1f2120] rounded-2xl border border-white/5">
      <div>
        <h4 className="text-[#a3a380] text-xs font-bold uppercase tracking-widest mb-4">
          Categories
        </h4>
        <div className="space-y-3">
          {["All Meals", "Biryani", "Curry", "Desserts", "Beverages"].map(
            (cat) => (
              <div
                key={cat}
                className="flex items-center space-x-2 cursor-pointer group"
              >
                <Checkbox
                  id={cat}
                  className="border-[#a3a380] data-[state=checked]:bg-[#a3a380]"
                />
                <label
                  htmlFor={cat}
                  className="text-sm text-gray-300 group-hover:text-white cursor-pointer transition-colors"
                >
                  {cat}
                </label>
              </div>
            ),
          )}
        </div>
      </div>

      <div>
        <h4 className="text-[#a3a380] text-xs font-bold uppercase tracking-widest mb-4">
          Price Range
        </h4>
        <Slider defaultValue={[500]} max={2000} step={50} className="py-4" />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>৳0</span>
          <span>৳2000</span>
        </div>
      </div>
    </div>
  );
}
