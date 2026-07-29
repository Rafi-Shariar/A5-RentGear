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

type IUser = {
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
  name:string;
  email:string;
  password:string;
  phoneNumber:string;
  role:string;
  address:string;
  photoURL:string;
};
