import { OverviewData } from "@/lib/types";

export const calculatedDashboardMatrics = (overview: OverviewData ) =>{

    const {totalOrder} = overview;
    const orders = overview.orders;

    const pendingOrders = orders?.filter( (order) => order.status === "PLACED").length;

    const totalSpend = orders?.reduce( (sum,order) =>{
        if(order.status !== "CANCELLED" && order.status !== "PLACED"){
            return sum + order.totalAmount;
        }

        return sum;
    }, 0)

    return {
        totalOrder, pendingOrders, totalSpend
    }


}


export const recentOrders = (overview : OverviewData) =>{

    const orders = overview.orders || [];

    const recent = orders?.sort( (a,b) => new Date(b.orderedAt).getTime() - new Date(a.orderedAt).getTime()).slice(0,3)

    return [...recent]

}