import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Auth, { SignupSuccessResponse } from '../../../backend/api/auth';
import { BackendApiError } from '../../../helpers/types';
import logo from '../../../images/navigation/logo-getfluence.svg';
import { login as loginReducer } from '../../../store/reducers/auth';
import FormSection, { ButtonOption } from '../../forms/FormSection';
import { Button } from '../../forms/Button';
import {
  isPassword, isEmail, isEmpty, isSame, isName,
} from '../../../helpers/utils';
import Message from '../../helpers/Message';
import { fetchUserInformations } from './Login';
import LogoNavBar from '../../navigation/LogoNavbar';
import AuthLeftDiv from '../../helpers/AuthLeftDiv';
import i18n from '../../../helpers/trads/i18n';

function SignUp() {
  const { t } = useTranslation('signup');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerification, setPasswordVerification] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [job, setJob] = useState('');
  const [numberOfPeopleChoices, setNumberOfPeopleChoices] = useState([{ title: t('1-10'), selected: false }, { title: '11-50', selected: false }, { title: '51-99', selected: false }, { title: '100+', selected: false }]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState({ texts: [], type: null });
  const [pageNumber, setPageNumber] = useState(0);

  const handleCompanyNameChange = (e: any) => {
    setCompanyName(e.target.value);
  };

  return (
    <Page>
      <AuthLeftDiv />
      { pageNumber === 0 ? DisplayPage0(firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, passwordVerification, setPasswordVerification, passwordShown, setPasswordShown, setPageNumber, setMessages, t, navigate) : null}
      { pageNumber === 1 ? DisplayPage1(email, firstName, lastName, password, passwordVerification, companyName, job, setJob, numberOfPeopleChoices, setNumberOfPeopleChoices, setPageNumber, setMessages, handleCompanyNameChange, t, navigate, dispatch) : null }
      <Message messages={messages} setMessages={setMessages} />
    </Page>
  );
}

function DisplayPage0(
  firstName: string,
  setFirstName: any,
  lastName: string,
  setLastName: any,
  email: string,
  setEmail: any,
  password: string,
  setPassword: any,
  passwordVerification: string,
  setPasswordVerification: any,
  passwordShown: boolean,
  setPasswordShown: any,
  setPageNumber: any,
  setMessages: any,
  t: any,
  navigate: any,
) {
  return (
    <RightDiv>
      <LogoNavBar />
      <SignupForm>
        <SpaceDiv />
        <SignupFormTitle>{t('signUpTitle')}</SignupFormTitle>
        <SpaceDiv />
        <DualText>
          <FormSection
            type="inputText"
            title={t('nameTitle')}
            onChange={(e: any) => setFirstName(e.target.value)}
            inputTextPlaceholder="Roger"
            value={firstName}
          />
          <FormSection
            type="inputText"
            title={t('familyNameTitle')}
            onChange={(e: any) => setLastName(e.target.value)}
            inputTextPlaceholder="Dupont"
            value={lastName}
          />
        </DualText>

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
        <FormSection
          type="inputPasswordText"
          title={t('passwordVerifyTitle')}
          onChange={(e: any) => setPasswordVerification(e.target.value)}
          inputTextPlaceholder="******"
          value={passwordVerification}
          passwordShown={passwordShown}
          setPasswordShown={setPasswordShown}
        />
        <SpaceDiv />
        <Button
          arrowed
          label={t('signUpButton')}
          onClick={(e: any) => {
            e.preventDefault();
            const validate = validatePage0Form(firstName, lastName, email, password, passwordVerification, setMessages, t);
            if (validate) setPageNumber(1);
          }}
        />
      </SignupForm>
      <SignupFooter>
        <SignupFooterSection>
          {`${t('acceptCgus')}`}
          <SignupColor onClick={() => window.open(t('acceptCgusLink'))}>{t('acceptCgusLinkTitle')}</SignupColor>
        </SignupFooterSection>
        <SignupFooterSection>
          {`${t('alreadyAccount')}`}
          <SignupColor onClick={() => navigate('/login')}>{t('login')}</SignupColor>
        </SignupFooterSection>
      </SignupFooter>
    </RightDiv>

  );
}

const validatePage0Form = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  passwordVerification: string,
  setMessages: any,
  t: any,
): boolean => {
  const errors = [];
  if (!isEmail(email)) errors.push(t('wrongEmailFormat'));
  if (!isPassword(password)) errors.push(t('wrongPasswordFormat'));
  if (!isName(firstName)) errors.push(t('wrongFirstNameFormat'));
  if (!isName(lastName)) errors.push(t('wrongLastNameFormat'));
  if (!isSame(password, passwordVerification)) errors.push(t('passwordsMismatch'));
  if (errors.length === 0) {
    setMessages({ texts: [], type: null });
    return true;
  }
  setMessages({ texts: errors, type: 'ERROR' });
  return false;
};

function DisplayPage1(
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  passwordVerification: string,
  companyName: string,
  job: string,
  setJob: any,
  numberOfPeopleChoices: ButtonOption[],
  setNumberOfPeopleChoices: any,
  setPageNumber: any,
  setMessages: any,
  handleCompanyNameChange: any,
  t: any,
  navigate: any,
  dispatch: any,
) {
  return (
    <RightDivPage1>
      <RightNav>
        <LogoImg onClick={() => window.open(process.env.REACT_APP_LANDING_URL, '_self')} src={logo} alt="" />
      </RightNav>
      <SignupForm>
        <SignupFormTitle>{t('welcomeSignup', { name: firstName })}</SignupFormTitle>
        <QuestionTitle>{t('welcomeQuestion')}</QuestionTitle>
        <FormSection
          type="inputText"
          title={t('companyName')}
          onChange={handleCompanyNameChange}
          inputTextPlaceholder={t('companyPlaceHolder')}
          value={companyName}
        />
        <FormSection
          type="picker"
          title={t('role')}
          onChange={(e: any) => {
            setJob(e.target.options[e.target.selectedIndex].text);
          }}
          pickerOption={[[0, t('jobSelect')], [1, t('cLevelJob')], [2, t('financeJob')], [3, t('productJob')], [4, t('salesJob')]]}
          value={job}
        />

        <FormSection1>
          <FormSection
            type="multiple"
            title={t('numberOfPeople')}
            buttonOption={numberOfPeopleChoices}
            onChange={(e: any) => {
              let selectedOptionsTmp = [...numberOfPeopleChoices];
              const index = selectedOptionsTmp.findIndex((option) => option.title === e.target.firstChild.data);
              selectedOptionsTmp = selectedOptionsTmp.map((option: any) => ({ ...option, selected: false }));
              selectedOptionsTmp[index] = { title: selectedOptionsTmp[index].title, selected: !numberOfPeopleChoices[index].selected };
              setNumberOfPeopleChoices(selectedOptionsTmp);
            }}
          />
        </FormSection1>
        <SpaceDiv />
        <SizedButtonDiv>
          <PreviousPageButton onClick={() => setPageNumber(0)}>
            {t('previousStep')}
          </PreviousPageButton>
          <Button
            arrowed
            label={t('nextStep')}
            onClick={async (e: any) => {
              const listNbOfPeopleInTeam: string[] = numberOfPeopleChoices.filter((option: any) => option.selected === true).map((option: any) => option.title);
              const employeeNumber = listNbOfPeopleInTeam.length === 1 ? listNbOfPeopleInTeam[0] : null;
              const language = i18n.resolvedLanguage;
              // eslint-disable-next-line react/destructuring-assignment
              const companyNameToLowerCase = companyName.toLowerCase();
              await submitSignupForm(
                email,
                companyNameToLowerCase,
                firstName,
                lastName,
                language,
                password,
                passwordVerification,
                job,
                employeeNumber,
                e,
                navigate,
                dispatch,
                setMessages,
                t,
              );
            }}
          />
        </SizedButtonDiv>
      </SignupForm>
      <FooterDiv>
        <LoadBar />
      </FooterDiv>
    </RightDivPage1>
  );
}

const validatePage1Form = (companyName: string, setMessages: any, t: any): boolean => {
  const errors = [];
  if (isEmpty(companyName)) errors.push(t('wrongCompanyNameFormat'));
  if (errors.length === 0) {
    setMessages({ texts: [], type: null });
    return true;
  }
  setMessages({ texts: errors, type: 'ERROR' });
  return false;
};

const submitSignupForm = async (
  email: string,
  companyName: string,
  firstName: string,
  lastName: string,
  language: string,
  password: string,
  passwordVerification: string,
  job: string,
  employeeNumber: string | null,
  e: any,
  navigate: any,
  dispatch: any,
  setMessages: any,
  t: any,
) => {
  e.preventDefault();
  const fullName = `${firstName} ${lastName}`;
  if (
    validatePage0Form(firstName, lastName, email, password, passwordVerification, setMessages, t)
    && validatePage1Form(companyName, setMessages, t)
  ) {
    const response = await Auth.signup({
      email,
      companyName,
      fullName,
      language,
      password,
      passwordVerification,
      job,
      employeeNumber,
      interests: [],
    });
    if (response.status === 200) {
      const result: SignupSuccessResponse = await response.json();
      // @ts-ignore
      dispatch(loginReducer({ accessToken: result.accessToken, type: 'user' }));
      await fetchUserInformations(dispatch, result.accessToken, navigate, t, setMessages);
      navigate('/profile');
    } else {
      const result: BackendApiError = await response.json();
      setMessages(({ texts: [Auth.mapSignupErrorsMessage(t, result.message)], type: 'ERROR' }));
    }
  }
};

const Page = styled.div`
  display: flex;
  height: 100vh;
  font-family: 'Manrope', sans-serif;
  justify-content: center;
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

const RightDivPage1 = styled.div`
  position: relative;
  display: flex;
  flex: 3;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F4F9FF;
  padding-bottom: 100px;
  @media (max-width: 1000px) {
    min-width: 100%;
  }
`;
const RightNav = styled.div`
  position: absolute;
  z-index: 1;
  top: 25px;
  left: 5%;
`;

const LogoImg = styled.img`
  cursor: pointer;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;
`;

const SpaceDiv = styled.div`
  margin-bottom: 20px;
`;

const SignupFormTitle = styled.div`
  font-size: 34px;
  font-weight: 800;
  text-align: center;
  width: 350px;
  color: #27345E;
  line-height: 35px;
  @media (max-width: 700px) {
    font-size: 30px;
  }
  @media (max-width: 500px) {
    margin-top: 50px;
    margin-bottom: 25px;
    font-size: 30px;
  }
`;

const DualText = styled.div`
display: flex;
gap: 10px;
`;

const SignupFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  font-size: 12px;
  bottom: 50px;
`;

const SignupFooterSection = styled.div`
  display: flex;
  font-size: 12px;
`;
const SignupColor = styled.div`
  color: #3368DD;
  cursor: pointer;
  margin-left: 5px;
  &:hover {
    color: #3368DD;
  }
`;

const QuestionTitle = styled.p`
  text-align: center;
  width: auto;
  color: #3A4877;
  margin-top: 15px;
  line-height: 20px;
`;

const FormSection1 = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #F4F9FF;
  border-radius: 8px;
  width: 100%;
  `;

const SizedButtonDiv = styled.div`
  display: flex;
  align-items: space-between;
  justify-content: space-between;
  width: 100%;
`;

const PreviousPageButton = styled.button`
  height: 40px;
  width: 150px;
  color: white;
  background-color: #3368DD;
  padding: 0px 32px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease-in, color 0.2s ease-in, border-color 0.2s ease-in;
  :hover {
    background-color: white;
    color: #3368DD
};
    border: 1px solid #3368DD
};

  }
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const FooterDiv = styled.div`
  position: absolute;
  bottom: 0;
  height: 8px;
  width: 100%;
`;

const LoadBar = styled.div`
height: 8px;
width: 50%;
animation: load 3s normal forwards;
box-shadow: 0 10px 40px -10px #fff;
background: #3368DD;
width: 0;
border-top-right-radius: 10px 10px;
border-bottom-right-radius: 10px 10px;
@keyframes load {
  0% { width: 0%; }
  100% { width: 40%; }
}
`;

export default SignUp;
