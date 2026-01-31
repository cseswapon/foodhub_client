/* eslint-disable @typescript-eslint/no-explicit-any */

export interface RouteItem {
  title: string;
  url: string;
  icon?: any;
}

// user service api response
export interface IUserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: string;
    updatedAt: string;
    role: "customer" | "provider" | "admin";
    phone: string;
    address: string;
    status: "activate" | "suspend";
  };
}
