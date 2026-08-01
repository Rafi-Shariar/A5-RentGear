import { RentalOrder } from "@/lib/types"
import { useQuery } from "@tanstack/react-query"
import { getCustomerOrders } from "../_actions/customer_actions/orderAction"

export const useCustomerOrders = () =>{
    return useQuery<RentalOrder[],Error> ({
        queryKey : ["customer-orders"],
        queryFn : async () =>{
            const result = await getCustomerOrders();

            if(!result?.success){
                throw new Error(result?.message || "Failed to fetch orders")
            }

            const orders = result?.data?.orders;

            return orders;
 
        }
    })
}