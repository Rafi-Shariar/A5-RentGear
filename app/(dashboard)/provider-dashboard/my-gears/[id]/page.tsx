import { getGearCategories } from "@/app/(dashboard)/_actions/provider_actions/getCategory";
import { EditGearForm } from "@/app/(dashboard)/_components/provider/EditGearForm";
import { getGearDetails } from "@/app/(public)/_actions/getGearDetails";

const EditGearPage = async ({params}: { params: Promise<{ id: string }>;} ) => {
  const { id } = await params;

  const categoriesRes = await getGearCategories();
  const categories = categoriesRes.data.categories || []

  const gearDetailsRes = await getGearDetails(id);
  const gear = gearDetailsRes.data || {};





  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Gear <span className="text-primary font-lg font-medium">{gear?.title}</span></h1>
        <p className="text-sm text-muted-foreground">
          Update specs, price, or inventory for this item.
        </p>
      </div>

      {/* Render Client Component Form */}
      <EditGearForm gear={gear} categories={categories} />
    </div>
  );
};

export default EditGearPage;