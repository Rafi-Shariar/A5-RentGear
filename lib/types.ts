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
    success : boolean;
    statusCode : number;
    message : string;
    data : {
        accessToken : string,
        refreshToken : string
    }

}
