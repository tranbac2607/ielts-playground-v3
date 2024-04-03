export type RegisterValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordConfirm: string;
  subscription?: string;
};

export type LoginValues = {
  email: string;
  password: string;
};
