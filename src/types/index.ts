
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

// user session

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: "customer" | "admin" | "provider";
  phone: string;
  address: string;
  status: "activate" | "deactivate";
}

export interface AuthSession {
  id: string;
  token: string;
  userId: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  ipAddress: string;
  userAgent: string;
}

export interface AuthResponse {
  data: {
    session: AuthSession;
    user: AuthUser;
  } | null;
  error: any | null;
}