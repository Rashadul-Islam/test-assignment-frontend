export interface ISignIn {
    accessToken: string;
}

export interface IUser {
  email: string;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
}
