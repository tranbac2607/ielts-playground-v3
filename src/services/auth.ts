import api from '@/api';
import { BaseResponse, LoginType, RegisterType, VerifyEmailRequest } from './models';
import { LOGIN, REGISTER } from './endpoint';

export const registerApi = async (payload: RegisterType) => {
  try {
    const res = await api.post(REGISTER, { ...payload });
    return res.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const loginApi = async (payload: LoginType) => {
  try {
    const res = await api.post(LOGIN, {
      ...payload,
    });
    return res as any;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const verifyEmailApi = async (payload: VerifyEmailRequest) => {
  try {
    const res: BaseResponse<any> = await api.post('/api/v2/users/verify-email', {
      ...payload,
    });
    return res.data;
  } catch (error) {
    return false;
  }
};
