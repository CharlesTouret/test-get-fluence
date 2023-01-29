// typer par les types de l'API
async function login(email: string, password: string, role: string) {
  console.log(email, password, role);
  const response: any = {
    status: 200,
    json: async (): Promise<LoginSuccessResponse> => ({
      userId: '1',
      companyId: '1',
      accessTokenExpiresIn: 2000,
      accessToken: '1djkdndjkd',
    }),
  };
  return response;
}

const mapLoginErrorsMessage: any = (t: any, errorName: string) => {
  const mapping: any = {
    WRONG_PASSWORD: t('errorWrongPassword'),
    UNKNOWN_USER: t('errorUnknownUser'),
    NOT_ALLOWED: t('errorNotAllowed'),
    CANNOT_LOG: t('errorCannotLog'),
    LOGIN_TOO_MUCH_LOGIN: t('errorTooMuchLogin'),
  };
  return mapping[errorName];
};

export interface LoginSuccessResponse {
  userId: string,
  companyId: string,
  accessTokenExpiresIn: number,
  accessToken: string,
}

interface SignupBodyRequest {
  email: string,
  companyName: string,
  fullName: string,
  language: string,
  password: string,
  passwordVerification: string,
  job: string,
  employeeNumber: string | null,
  interests: string[],
}

// typer par les types de l'API
async function signup(data: SignupBodyRequest) {
  console.log(data);
  const response: any = {
    status: 200,
    json: async (): Promise<LoginSuccessResponse> => ({
      userId: '1',
      companyId: '1',
      accessTokenExpiresIn: 2000,
      accessToken: '1djkdndjkd',
    }),
  };
  return response;
}

const mapSignupErrorsMessage: any = (t: any, errorName: string) => {
  const mapping: any = {
    ALREADY_EXISTING_USER: t('errorAlreadyExistingUser'),
    CANNOT_SIGNUP: t('errorCannotSignup'),
    SIGNUP_MORE_THAN_ONE_USER: t('errorSignupMoreThanOneUser'),
    SIGNUP_COMPANY_NAME_NOT_EXISTING: t('errorSignupMoreNotSubscribedCompany'),
  };
  return mapping[errorName];
};

export interface SignupSuccessResponse {
userId: string,
companyId: string,
accessTokenExpiresIn: number,
accessToken: string,
}

// typer par les types de l'API
async function resetPassword(email: string) {
  console.log(email);
  const response: any = {
    status: 200,
    json: async (): Promise<ResetPasswordSuccessResponse> => ({
      message: 'ok',
    }),
  };
  return response;
}

const mapResetPasswordErrorsMessage: any = (t: any, errorName: string) => {
  const mapping: any = {
    UNKNOWN_USER: t('errorUnknownUser'),
    CANNOT_RESET: t('errorCannotReset'),
  };
  return mapping[errorName];
};

export interface ResetPasswordSuccessResponse {
  message: string,
}

export default {
  login,
  mapLoginErrorsMessage,
  signup,
  mapSignupErrorsMessage,
  resetPassword,
  mapResetPasswordErrorsMessage,
};
