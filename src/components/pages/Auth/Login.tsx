import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import Auth, { LoginSuccessResponse } from '../../../backend/api/auth';
import { BackendApiError } from '../../../helpers/types';
import logo from '../../../images/navigation/logo-getfluence.svg';
import { login as loginReducer, AuthState } from '../../../store/reducers/auth';
import FormSection from '../../forms/FormSection';
import { Button } from '../../forms/Button';
import {
  isPassword, isEmail,
} from '../../../helpers/utils';
import { BAD_USER_TOKEN, LOGIN_TYPE_USER } from '../../../helpers/constants';
import Message from '../../helpers/Message';
import { initSession } from '../../../store/reducers/user';
import User from '../../../backend/api/user';
import AuthLeftDiv from '../../helpers/AuthLeftDiv';
import { logoutClicked } from '../../navigation/UserDrawer';

function Login() {
  const { t } = useTranslation('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState({ texts: [], type: null });
  const authState: AuthState = useSelector((state: any) => state.auth);
  const { state }: any = useLocation();
  const autoLogout = state?.autoLogout ? state.autoLogout : false;
  useEffect(() => {
    if (authState.loggedIn === true && autoLogout === false) navigate('/profile');
  }, []);

  return (
    <Page>
      <AuthLeftDiv />
      <RightDiv>
        <RightNav>
          <LogoImg onClick={() => window.open(process.env.REACT_APP_LANDING_URL, '_self')} src={logo} alt="" />
        </RightNav>
        { forgotPassword === true
          ? DiplayForgotPasswordForm(t, email, setEmail, setForgotPassword, setMessages)
          : DisplayLoginForm(t, email, setEmail, password, setPassword, passwordShown, setPasswordShown, rememberMe, setRememberMe, setForgotPassword, setMessages, dispatch, navigate)}
        <Signup>
          {`${t('noAccount')}`}
          <SignupColor onClick={() => navigate('/signup')}>{t('signUp')}</SignupColor>
        </Signup>
      </RightDiv>
      <Message messages={messages} setMessages={setMessages} />
    </Page>
  );
}

function DisplayLoginForm(t: any, email: string, setEmail: any, password: string, setPassword: any, passwordShown: boolean, setPasswordShown: any, rememberMe: boolean, setRememberMe: any, setForgotPassword: any, setMessages: any, dispatch: any, navigate: any) {
  return (
    <LoginForm>
      <LoginFormTitle>{t('loginTitle')}</LoginFormTitle>
      <FormSection
        type="inputText"
        title={t('emailTitle')}
        onChange={(e: any) => setEmail(e.target.value)}
        inputTextPlaceholder="example@company.com"
        value={email}
      />
      <FormSection
        type="inputPasswordText"
        title={t('passwordTitle')}
        onChange={(e: any) => setPassword(e.target.value)}
        inputTextPlaceholder="******"
        value={password}
        passwordShown={passwordShown}
        setPasswordShown={setPasswordShown}
      />
      <LoginFormEnd>
        <LoginFormEndLeft>
          <Switch style={{ backgroundColor: '#3368DD' }} checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
          <SwitchText>{t('rememberMe')}</SwitchText>
        </LoginFormEndLeft>
        <SignupColor onClick={() => setForgotPassword(true)}>{t('forgotPassword')}</SignupColor>
      </LoginFormEnd>
      <Button arrowed label={t('loginButton')} onClick={(e: any) => submitLoginForm(e, email, password, navigate, dispatch, setMessages, t)} />
    </LoginForm>
  );
}

function DiplayForgotPasswordForm(t: any, email: string, setEmail: any, setForgotPassword: any, setMessages: any) {
  return (
    <LoginForm>
      <LoginFormTitle>{t('forgotPasswordTitle')}</LoginFormTitle>
      <FormSection
        type="inputText"
        title={t('emailTitle')}
        onChange={(e: any) => setEmail(e.target.value)}
        inputTextPlaceholder="example@company.com"
        value={email}
      />
      <LoginFormEnd>
        <SignupColor onClick={() => setForgotPassword(false)}>{t('logToYourAccount')}</SignupColor>
      </LoginFormEnd>
      <Button arrowed label={t('resetMyPassword')} onClick={(e: any) => submiResetPwdForm(e, email, setMessages, setForgotPassword, t)} />
    </LoginForm>
  );
}

const submitLoginForm = async (e: any, email: string, password: string, navigate: any, dispatch: any, setMessages: any, t: any) => {
  e.preventDefault();
  if (validateLoginForm(email, password, setMessages, t)) {
    const response = await Auth.login(email, password, LOGIN_TYPE_USER);
    console.log(response);
    if (response.status === 200) {
      const result: LoginSuccessResponse = await response.json();
      // @ts-ignore
      dispatch(loginReducer({ accessToken: result.accessToken, type: 'user' }));
      await fetchUserInformations(dispatch, result.accessToken, navigate, t, setMessages);
      navigate('/profile');
    } else {
      const result: BackendApiError = await response.json();
      setMessages(({ texts: [Auth.mapLoginErrorsMessage(t, result.message)], type: 'ERROR' }));
    }
  }
};

export const fetchUserInformations = async (dispatch: any, accessToken: string, navigate: any, t: any, setMessages: any): Promise<any> => {
  const response: any = await User.userInformations(accessToken);
  const result = await response.json();
  const {
    id, email, fullName, companyId, language, currency, companyName,
  } = result;
  if (response.status === 200) {
    const userInformations = {
      id, email, fullName, companyId, language, currency, companyName,
    };
    dispatch(initSession(userInformations));
    return userInformations;
  }
  if (result.message === BAD_USER_TOKEN) logoutClicked(dispatch, navigate);
  setMessages(({ texts: [User.mapUserInformationsErrorsMessage(t, result.message)], type: 'ERROR' }));
  return null;
};

const submiResetPwdForm = async (e: any, email: string, setMessages: any, setForgotPassword: any, t: any) => {
  e.preventDefault();
  if (validateResetPasswordForm(email, setMessages, t)) {
    const response = await Auth.resetPassword(email);
    if (response.status === 200) {
      setForgotPassword(false);
      setMessages({ texts: [t('resetPasswordSuccessMessage')], type: 'SUCCESS' });
    } else {
      const result: BackendApiError = await response.json();
      setMessages(({ texts: [Auth.mapResetPasswordErrorsMessage(t, result.message)], type: 'ERROR' }));
    }
  }
};

const validateLoginForm = (email: string, password: string, setMessages: any, t: any): boolean => {
  const errors = [];
  if (!isEmail(email)) errors.push(t('wrongEmailFormat'));
  if (!isPassword(password)) errors.push(t('wrongPasswordFormat'));
  if (errors.length === 0) {
    setMessages({ texts: [], type: null });
    return true;
  }
  setMessages({ texts: errors, type: 'ERROR' });
  return false;
};

const validateResetPasswordForm = (email: string, setMessages: any, t: any): boolean => {
  const errors = [];
  if (!isEmail(email)) errors.push(t('wrongEmailFormat'));
  if (errors.length === 0) {
    setMessages({ texts: [], type: null });
    return true;
  }
  setMessages({ texts: errors, type: 'ERROR' });
  return false;
};

const Page = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Manrope', sans-serif;
`;

const RightDiv = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F4F9FF;
  padding-bottom: 100px;
  min-width: 500px;
  @media (max-width: 500px) {
    min-width: 100%;
  }
`;

const RightNav = styled.div`
  position: absolute;
  top: 25px;
  left: 5%;
`;

const LogoImg = styled.img`
  cursor: pointer;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;
`;

const LoginFormTitle = styled.div`
  font-size: 34px;
  font-weight: 800;
  text-align: center;
  width: 350px;
  color: #27345E;
  line-height: 35px;
  @media (max-width: 500px) {
    margin-top: 50px;
    margin-bottom: 25px;
    font-size: 30px;
  }
`;

const LoginFormEnd = styled.div`
  display: flex;
  flex: direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const LoginFormEndLeft = styled.div`
  display: flex;
  flex: direction: row;
  align-items: center;
`;

const SwitchText = styled.div`
  margin-left: 5px;
`;

const Signup = styled.div`
  display: flex;
  position: absolute;
  font-size: 12px;
  bottom: 50px;
`;

const SignupColor = styled.div`
  color: #3368DD;
  cursor: pointer;
  margin-left: 5px;
  &:hover {
    color: #3368DD;
  }
`;

export default Login;
