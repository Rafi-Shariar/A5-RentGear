import React from "react";
import { getMyOrdersAction } from "../../_actions/provider_actions/orderAction";

import { Package, Clock, CheckCircle2, DollarSign } from "lucide-react";
import { ProviderOrdersTable } from "../../_components/provider/ProviderOrdersTable";
import { IProviderOrder } from "@/lib/types";

const MyOrdersPage = async () => {
  const orderRes = await getMyOrdersAction();
  const orders = orderRes?.data || [];


  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Manage Gear Rentals
        </h1>
        <p className="text-sm text-zinc-500">
          Monitor customer rental requests, collection dates, and update order statuses.
        </p>
      </div>


      <ProviderOrdersTable orders={orders} />
    </div>
  );
};

export default MyOrdersPage;