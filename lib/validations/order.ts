import {z} from "zod";

export const createRentBookingSchema = (maxStock: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // আজকের শুরুর সময় (00:00:00)

  return z
    .object({
      startDate: z
        .string()
        .min(1, "Pickup date is required")
        .refine((val) => new Date(val) >= today, {
          message: "Pickup date cannot be in the past",
        }),
      endDate: z.string().min(1, "Return date is required"),
      quantity: z
        .number({ message: "Quantity is required" })
        .min(1, "Minimum quantity is 1")
        .max(maxStock, `Cannot exceed available stock (${maxStock})`),
    })
    .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
      message: "Return date must be on or after pickup date",
      path: ["endDate"], 
    });
};


export type RentBookingFormValues = z.infer<ReturnType<typeof createRentBookingSchema>>;