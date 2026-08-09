import { RentalOrder } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { getCustomerOrders } from "../_actions/customer_actions/orderAction"


export const useCustomerOrders = (status : string) =>{
    return useQuery<RentalOrder[],Error> ({
        queryKey : ["customer-orders", status],
        queryFn : async () =>{
            const result = await getCustomerOrders(status);

            if(!result?.success){
                throw new Error(result?.message || "Failed to fetch orders")
            }

            const orders = result?.data?.orders || [];

            return orders;
 
        }
    })
}