import { IProviderOrder } from "@/lib/types";

export const calculateOrderStats = (orders : IProviderOrder[]) =>{

    const totalOrders = orders.length

    const newOrders = orders.filter((order) => order.status === "PLACED").length

    const totalAmount = orders.reduce((sum, order) =>{
        if(order.status !== "PLACED" && order.status !== "CANCELLED"){
            return sum + order.totalAmount
        }
        return sum;
    },0)

    const pickedUp = orders.filter((order) => order.status === "PICKED_UP").length
    const returned = orders.filter((order) => order.status === "RETURNED").length

    const result = {
        totalOrders,
        newOrders,
        totalAmount,
        pickedUp,
        returned
    }

return result
}