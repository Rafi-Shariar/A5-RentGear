
import MatricContainer from "../_components/customer/dashboard_overview/MatricContainer";
import ChartsContainer from "../_components/customer/dashboard_overview/ChartsContainer";
import RecentOrdersContains from "../_components/customer/dashboard_overview/RecentOrdersContains";
import { overviewAction } from "../_actions/customer_actions/overViewAction";

const CustomerDashboardPage =async () => {

    const overview = await overviewAction();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Rental Overview
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Track your gear rental activity, expenses, and pending requests in one place.
        </p>
      </div>


      <MatricContainer overview={overview}/>
    

      <RecentOrdersContains overview={overview}/>
     
    </div>
  );
};

export default CustomerDashboardPage;