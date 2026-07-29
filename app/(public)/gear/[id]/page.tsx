import Link from 'next/link';
import { ChevronRight, Home, ShieldCheck } from 'lucide-react';
import { getGearDetails } from "../../_actions/getGearDetails";
import { EmptyGearState } from "../../_components/gear/EmptyGearState";
import { BookingWidget } from "../../_components/gearDetails/BookingWidget";
import { GearImageGallery } from "../../_components/gearDetails/GearImageGallery";
import { GearInfoSection } from "../../_components/gearDetails/GearInfoSection";
import { GearReviewsSection } from "../../_components/gearDetails/GearReviewSection";



export default async function GearDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gearResult = await getGearDetails(id);

  if (!gearResult?.success || !gearResult?.data) {
    return <EmptyGearState />;
  }

  const gear = gearResult.data;

  return (
    <>
      {/* 🟢 Fix Scroll Position Bug */}

      <main className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950 pb-16 pt-20 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* 🟢 Breadcrumbs for Professional UX */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            <Link 
              href="/" 
              className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <Link 
              href="/gear" 
              className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              Gears
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-medium text-zinc-800 dark:text-zinc-200 truncate max-w-[180px] sm:max-w-xs">
              {gear.title}
            </span>
          </nav>

          {/* 🟢 Main Responsive Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column (Image Gallery & Description) - 7/12 */}
            <div className="lg:col-span-7 space-y-10">
              {/* Image Gallery */}
              <div className="rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-2 sm:p-3 shadow-sm">
                <GearImageGallery
                  imageURL={gear.imageURL}
                  title={gear.title}
                  stock={gear.stock}
                />
              </div>

              {/* Product Info Section */}
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
                <GearInfoSection
                  brand={gear.brand}
                  title={gear.title}
                  category={gear.category}
                  description={gear.description}
                  provider={gear.provider}
                />
              </div>
            </div>

            {/* Right Column (Sticky Booking Widget) - 5/12 */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-xl shadow-zinc-200/40 dark:shadow-none">
                <BookingWidget
                  price={gear.price} 
                  stock={gear.stock} 
                />
              </div>

              {/* Trust Badge / Guarantee Card */}
              <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    RentGear Assurance
                  </h4>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Verified condition & 100% secure booking process.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* 🟢 Reviews Section at Bottom */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
            <GearReviewsSection reviews={gear.reviews || []} />
          </div>

        </div>
      </main>
    </>
  );
}