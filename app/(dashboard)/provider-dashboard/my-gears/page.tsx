
import { ListChecks } from "lucide-react";

import { getMyGearListAction } from "../../_actions/provider_actions/gearActions";
import { GearTable } from "../../_components/provider/GearTable";

export default async function MyGearsPage() {
  const res = await getMyGearListAction();
  const gears = res.data.gears || [];
  const totalGears = res.data.totalGears || 0;

  

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ListChecks className="w-6 h-6 text-primary" /> My Gear Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            View, manage gears, and update available gear stocks.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-slate-100 px-3 py-2 rounded-lg border border-slate-200">
          <span className="font-semibold text-slate-700">Total Gears Listed:</span>
          <span className="bg-white px-2 py-0.5 rounded font-mono font-bold text-slate-900 shadow-sm">
            {totalGears}
          </span>
        </div>
      </div>

      <GearTable gears={gears}/>
    </div>
  );
}