import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteOrderAction } from "../_actions/customer_actions/orderAction";
import { error } from "console";

export const useDeleteOrder = () =>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn : async (orderId : string) =>{
            return await deleteOrderAction(orderId)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customer-orders"]})
        },

        onError : (error : Error) => {
            console.error("Delete Order Error", error.message)
        }

    })
}