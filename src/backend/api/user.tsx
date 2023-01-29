// typer par les types de l'API
async function userInformations(accessTokenId: string) {
  console.log(accessTokenId);
  const response: any = {
    status: 200,
    json: async (): Promise<userInformationsBodyResponse> => ({
      id: '1',
      email: 'getFluence@gmail.com',
      fullName: 'John Does',
      companyId: '1',
      language: 'fr',
      currency: 'EUR',
      companyName: 'getFluence',
    }),
  };
  return response;
}

interface userInformationsBodyResponse {
  id: string,
  email: string,
  fullName: string,
  companyId: string,
  language: string,
  currency: string,
  companyName: string,
}

const mapUserInformationsErrorsMessage: any = (t: any, errorName: string) => {
  const mapping: any = {
    BAD_USER_TOKEN: t('errorUnauthorized'),
    UNKNOWN_USER: t('errorUnknownUser'),
    CANNOT_RETRIEVE_USER_INFOS: t('errorCannotRetrieveUserInfo'),
  };
  return mapping[errorName];
};

export default {
  userInformations,
  mapUserInformationsErrorsMessage,
};
