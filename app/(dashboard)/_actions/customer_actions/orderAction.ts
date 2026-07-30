import { RentalOrder } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";


const MOCK_ORDERS: RentalOrder[] = [
  {
    orderId: "7236b836-621b-4eb5-af22-7d29f929893a",
    customerId: "ddbc83e5-386a-4e91-8e3b-ecb5c84e8d09",
    status: "PLACED",
    quantity: 1,
    totalAmount: 1287,
    collectionDate: "2026-07-30T00:00:00.000Z",
    returnDate: "2026-08-02T00:00:00.000Z",
    orderedAt: "2026-07-29T18:55:40.531Z",
    updatedAt: "2026-07-29T18:55:40.531Z",
    gear: {
      gearId: "e675485b-dea2-4e8e-a909-0f31cafb0ab0",
      provider: {
        name: "GearHub BD",
        address: "Mirpur 10, Dhaka",
        email: "support@gearhub.com",
        phoneNumber: "01700000000",
      },
      brand: "Bowflex",
      title: "SelectTech 552 Adjustable Dumbbells",
    },
  },
  {
    orderId: "18ccef75-ad2a-404a-b71f-53e94bcf5532",
    customerId: "ddbc83e5-386a-4e91-8e3b-ecb5c84e8d09",
    status: "CONFIRMED",
    quantity: 2,
    totalAmount: 2400,
    collectionDate: "2026-08-01T00:00:00.000Z",
    returnDate: "2026-08-05T00:00:00.000Z",
    orderedAt: "2026-07-28T10:15:20.000Z",
    updatedAt: "2026-07-28T12:00:00.000Z",
    gear: {
      gearId: "g-102",
      provider: {
        name: "Outdoor Life",
        address: "Banani, Dhaka",
        email: "info@outdoor.com",
        phoneNumber: "01800000000",
      },
      brand: "Osprey",
      title: "Atmos AG 65 Trekking Backpack",
    },
  },
  {
    orderId: "99aef841-d18c-4f2e-b832-c47ca36640b5",
    customerId: "ddbc83e5-386a-4e91-8e3b-ecb5c84e8d09",
    status: "RETURNED",
    quantity: 1,
    totalAmount: 4500,
    collectionDate: "2026-07-10T00:00:00.000Z",
    returnDate: "2026-07-15T00:00:00.000Z",
    orderedAt: "2026-07-08T14:20:00.000Z",
    updatedAt: "2026-07-15T18:00:00.000Z",
    gear: {
      gearId: "g-103",
      provider: {
        name: "Sony Center",
        address: "Dhanmondi, Dhaka",
        email: "sony@dhaka.com",
        phoneNumber: "01900000000",
      },
      brand: "Sony",
      title: "Alpha A7 IV Mirrorless Camera",
    },
  },
];

export const useCustomerOrders = () => {
  return useQuery({
    queryKey: ["customer-orders"],
    queryFn: async (): Promise<RentalOrder[]> => {
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 600));
      return MOCK_ORDERS;
    },
  });
};