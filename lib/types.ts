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
