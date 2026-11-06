export interface LoginInterface {
    userName: string;
    password: string;
}

export interface RegisterInterface{
userId: number;
  userName: string;
  emailId: string;
  fullName: string;
  password: string;
  role: string;
}

export interface AuthResponseInterface<T> {
    message: string;
    result: boolean;
    data:T
}

export interface UserInterface {
  userId: number;
  userName: string;
  emailId: string;
  fullName: string;
  role: string;
  createdDate: Date;
  password: string;
  projectName: string;
  refreshToken: null;
  refreshTokenExpiryTime: null;
}
