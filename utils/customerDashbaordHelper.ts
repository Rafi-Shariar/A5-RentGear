import { OverviewData } from "@/lib/types";

export const calculatedDashboardMatrics = (overview: OverviewData ) =>{

    const {totalOrder} = overview;
    const orders = overview.orders;

    const pendingOrders = orders.filter( (order) => order.status === "PLACED").length;

    const totalSpend = orders.reduce( (sum,order) =>{
        if(order.status !== "CANCELLED" && order.status !== "PLACED"){
            return sum + order.totalAmount;
        }

        return sum;
    }, 0)

    return {
        totalOrder, pendingOrders, totalSpend
    }


}