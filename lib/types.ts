import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type IGear = {
  gearId: string;
  category: string;
  brand: string;
  title: string;
  price: number;
  stock: number;
  imageURL: string;
};

export type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    userId: string;
    email: string;
    name: string;
    phoneNumber: string;
    role: string;
    address: string;
    photoURL: string;
    accountStatus: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type NavbarUser = {
  user: IUser;
};

export type IRegisterUser = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  address: string;
  photoURL: string;
};

export type IReview = {
  reviewId: string;
  userId: string;
  gearId: string;
  ratings: number;
  createdAt: string;
  updatedAt: string;
};

export type GearDetailsData = {
  data: {
    gearId: string;
    brand: string;
    title: string;
    price: number;
    description: string;
    stock: number;
    imageURL: string;
    category: string;
    provider: {
      name: string;
      email: string;
      phoneNumber: string;
      address: string;
      photoURL: string;
    };
    reviews: IReview[];
  };
};

export type INewOrder = {
  gearId:string;
  quantity:number;
  totalAmount:number;
  collectionDate:string;
  returnDate:string;
};


export type ISidebarItem = {
    label: string,
    href: string,
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export interface Provider {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
}

export interface Gear {
  gearId: string;
  provider: Provider;
  brand: string;
  title: string;
}

export type OrderStatus = "PLACED" | "CONFIRMED" | "PAID" | "PICKED_UP" | "RETURNED" | "CANCELLED";


export interface RentalOrder {
  orderId: string;
  customerId: string;
  status: OrderStatus;
  quantity: number;
  totalAmount: number;
  collectionDate: string; 
  returnDate: string;     
  orderedAt: string;      
  updatedAt: string;      
  gear: Gear;
}

export interface OverviewData {
  totalOrder: number;
  orders: RentalOrder[];
}


export interface OverviewResponse {
  success: boolean;
  message?: string;
  data?: OverviewData;
}

export interface IReviewPayload {
  orderId : string;
  ratings : number;
  comment : string;
}

export interface PaymentItem {
  paymentId: string;
  transactionId: string;
  customerId: string;
  orderId: string;
  amount: number;
  method: string;
  status: "SUCCESSFULL" | "FAILED" | "PENDING";
  createdAt: string;
  updatedAt: string;
}


export interface IAddNewGear {
  categoryId: string;
  categoryName: string;
  createdAt : string;
  updatedAt : string;
}

export interface IAddNewGearFromProp {
  categories : IAddNewGear[]
}