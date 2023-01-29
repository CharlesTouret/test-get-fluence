/* eslint-disable linebreak-style */
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
import Message from '../../messages/Message';
import i18n from '../../../helpers/trads/i18n';
import { fetchUserInformations } from './Login';
import searchImage from '../../../images/signup/newSearchImage.svg';
import importImage from '../../../images/signup/importImage.svg';
import microscopeImage from '../../../images/signup/microscope.svg';
import moneyImage from '../../../images/signup/money-send.svg';
import rankingImage from '../../../images/signup/ranking.svg';
import starImage from '../../../images/signup/star.svg';
import LoadingComponent from '../../helpers/LoadingComponent';
import LogoNavBar from '../../navigation/LogoNavbar';
import DisplayLeftDiv from '../../navigation/SIgnupNavbar';

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
  const [choicesOptions, setChoicesOptions] = useState([{
    titleEn: 'Find the best tools', title: t('findBestTools'), selected: false, image: microscopeImage,
  }, {
    titleEn: 'Get great deals', title: t('saveMoney'), selected: false, image: moneyImage,
  }, {
    titleEn: 'Manage my stack', title: t('manageMyStack'), selected: false, image: rankingImage,
  }, {
    titleEn: 'All of the above', title: t('allTheAbove'), selected: false, image: starImage,
  }]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState({ texts: [], type: null });
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  const handleCompanyNameChange = (e: any) => {
    setCompanyName(e.target.value);
  };

  return (
    <Page>
      <DisplayLeftDiv />
      { pageNumber === 0 ? DisplayPage0(t, firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, passwordVerification, setPasswordVerification, passwordShown, setPasswordShown, setPageNumber, setMessages, dispatch, navigate) : null}
      { pageNumber === 1 ? DisplayPage1(firstName, t, companyName, handleCompanyNameChange, job, setJob, setPageNumber, setMessages, numberOfPeopleChoices, setNumberOfPeopleChoices) : null }
      { pageNumber === 2 ? DisplayPage2(email, companyName, firstName, lastName, password, passwordVerification, job, numberOfPeopleChoices, choicesOptions, setChoicesOptions, setPageNumber, navigate, dispatch, setMessages, t, loading, setLoading) : null }
      { pageNumber === 3 ? DisplayPage3(loading, setLoading, firstName, setRedirectUrl, redirectUrl, t, navigate) : null }
      <Message messages={messages} setMessages={setMessages} />
    </Page>
  );
}

function DisplayPage0(t: any, firstName: string, setFirstName: any, lastName: string, setLastName: any, email: string, setEmail: any, password: string, setPassword: any, passwordVerification: string, setPasswordVerification: any, passwordShown: boolean, setPasswordShown: any, setPageNumber: any, setMessages: any, dispatch: any, navigate: any) {
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

const validatePage0Form = (firstName: string, lastName: string, email: string, password: string, passwordVerification: string, setMessages: any, t: any): boolean => {
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

function DisplayPage1(firstName: string, t: any, companyName: string, handleCompanyNameChange: any, job: string, setJob: any, setPageNumber: any, setMessages: any, numberOfPeopleChoices: ButtonOption[], setNumberOfPeopleChoices: any) {
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
            onClick={(e: any) => {
              e.preventDefault();
              const validate = validatePage1Form(companyName, setMessages, t);
              if (validate) setPageNumber(2);
            }}
          />
        </SizedButtonDiv>
      </SignupForm>
      {' '}
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

function DisplayPage2(
  email: string,
  companyName: string,
  firstName: string,
  lastName: string,
  password: string,
  passwordVerification: string,
  job: string,
  numberOfPeopleChoices: any[],
  choicesOptions: any[],
  setChoicesOptions: any,
  setPageNumber: any,
  navigate: any,
  dispatch: any,
  setMessages: any,
  t: any,
  loading: boolean,
  setLoading: any,
) {
  return (
    <RightDivPage1>
      <RightNav>
        <LogoImg onClick={() => window.open(process.env.REACT_APP_LANDING_URL, '_self')} src={logo} alt="" />
      </RightNav>
      <SignupBigForm>
        <SignupFormTitle>{t('why')}</SignupFormTitle>
        <OptionCards>
          {choicesOptions.map((choice: any) => (
            <OptionCard
              style={choice.selected ? { border: '1.5px solid #3368DD' } : {}}
              key={choice.title}
              onClick={() => {
                const selectedOptionsTmp = [...choicesOptions];
                const index = selectedOptionsTmp.findIndex((option) => option.title === choice.title);
                selectedOptionsTmp[index] = {
                  titleEn: selectedOptionsTmp[index].titleEn, title: selectedOptionsTmp[index].title, selected: !choicesOptions[index].selected, image: choice.image,
                };
                setChoicesOptions(selectedOptionsTmp);
              }}
            >
              <ImgRole src={choice.image} alt="" />
              <Ptext>{choice.title}</Ptext>
            </OptionCard>
          ))}
        </OptionCards>
        <SizedButtonDiv style={{ padding: '10px' }}>
          <PreviousPageButton onClick={() => setPageNumber(1)}>
            {t('previousStep')}
          </PreviousPageButton>
          <Button
            arrowed
            label={t('nextStep')}
            onClick={async (e: any) => {
              const interests: string[] = choicesOptions.filter((option: any) => option.selected === true).map((option: any) => option.titleEn);
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
                interests,
                e,
                navigate,
                dispatch,
                setMessages,
                t,
                setPageNumber,
                setLoading,
              );
            }}
          />
        </SizedButtonDiv>
      </SignupBigForm>
      {' '}
      <FooterDiv>
        <LoadBar3 />
      </FooterDiv>
      { loading ? (
        <LoadingContainer>
          <LoadingDiv />
        </LoadingContainer>
      ) : null }

    </RightDivPage1>
  );
}

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
  interests: string[],
  e: any,
  navigate: any,
  dispatch: any,
  setMessages: any,
  t: any,
  setPageNumber: any,
  setLoading: any,
) => {
  e.preventDefault();
  const fullName = `${firstName} ${lastName}`;
  if (
    validatePage0Form(firstName, lastName, email, password, passwordVerification, setMessages, t)
    && validatePage1Form(companyName, setMessages, t)
  ) {
    setLoading(true);
    const response = await Auth.signup({
      email,
      companyName,
      fullName,
      language,
      password,
      passwordVerification,
      job,
      employeeNumber,
      interests,
    });
    if (response.status === 200) {
      const result: SignupSuccessResponse = await response.json();
      // @ts-ignore
      dispatch(loginReducer({ accessToken: result.accessToken, type: 'user' }));
      await fetchUserInformations(dispatch, result.accessToken, navigate, t, setMessages);
      setLoading(false);
      setPageNumber(3);
    } else {
      setLoading(false);
      const result: BackendApiError = await response.json();
      setMessages(({ texts: [Auth.mapSignupErrorsMessage(t, result.message)], type: 'ERROR' }));
    }
  }
};

function DisplayPage3(loading: boolean, setLoading: any, firstName: string, setRedirectUrl: any, redirectUrl: string, t: any, navigate: any) {
  return (
    <RightDivPage1>
      <RightNav>
        <LogoImg onClick={() => window.open(process.env.REACT_APP_LANDING_URL, '_self')} src={logo} alt="" />
      </RightNav>
      {!loading
        ? (
          <SignupBigForm>
            <SignupFormTitle>{t('weReady')}</SignupFormTitle>
            <RedirectButtons>
              <TopRedirectButtons>
                <RedirectButton onClick={() => {
                  setLoading(true);
                  setRedirectUrl('/search');
                }}
                >
                  <ImgRoleBig src={searchImage} alt="" />
                  <Ptext>{t('newSearch')}</Ptext>
                </RedirectButton>
                <RedirectButton onClick={() => {
                  setLoading(true);
                  setRedirectUrl('/profile');
                }}
                >
                  <ImgRoleBig src={importImage} alt="" />
                  <Ptext>{t('importSaas')}</Ptext>
                </RedirectButton>
              </TopRedirectButtons>
              <BottomRedirectButton onClick={() => {
                setLoading(true);
                setRedirectUrl('/connectors');
              }}
              >
                <TextP>{t('discoverDashboard')}</TextP>

              </BottomRedirectButton>
            </RedirectButtons>
          </SignupBigForm>
        )
        : <LoadingComponent text={t('welcomeGetFluence', { name: firstName })} footerText={t('dataSecure')} action={() => navigate(redirectUrl)} timer={2} />}
      {' '}
      {!loading
        ? (
          <FooterDiv>
            <LoadBar4 />
          </FooterDiv>
        )
        : (
          <FooterDiv>
            <LoadBar5 />
          </FooterDiv>
        )}
    </RightDivPage1>
  );
}

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

const SignupBigForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  @media (max-width: 700px) {
    width: 100%
  }
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

const OptionCards = styled.div`
  display: flex;
  justify-content: center;

  flex-wrap: wrap;
  margin-top: 30px;
  width: 500px;
  @media (max-width: 700px) {
    justify-content: center;
  }
`;

const OptionCard = styled.div`
  display: flex;
  height: 140px;
  width: 208px;
  border: 1px solid #D2D9F1;
  background-color: white;
  border-radius: 8px;
  padding: 5px;
  justify-content: center;
  cursor: pointer;
  margin: 10px;
`;

const ImgRole = styled.img`
  height: 42px;
  width: 50px;
  position: absolute;
  margin-top: 2.5%;
`;

const Ptext = styled.p`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 20px;
  justify-content: center;
  text-align: center;
  margin-top: 40%;
  color: #3368DD;
  font-weight: 700;
  font-size: 16px;
`;

const LoadingContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 114%;
  background-color: rgba(189, 195, 199, 0.8);
  align-items: center;
  justify-content: center;
`;

const LoadingDiv = styled.div`
display: flex;
border: 12px solid #f3f3f3; /* Light grey */
border-top: 12px solid #3368DD; /* Blue */
border-radius: 50%;
width: 80px;
height: 80px;
animation: spin 2s linear infinite;
`;

const RedirectButtons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  @media (max-width: 700px) {
    justify-content: center;
  }
`;

const TopRedirectButtons = styled.div`
  display: flex;
  gap: 15px;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const RedirectButton = styled.div`
  display: flex;
  height: 264px;
  width: 320px;
  border: 1px solid #D2D9F1;
  background-color: white;
  border-radius: 8px;
  padding: 5px;
  justify-content: center;
  cursor: pointer;
`;

const ImgRoleBig = styled.img`
  display:flex;
  height: 58px;
  width: 58px;
  position: absolute;
  margin-top: 60px;
`;

const BottomRedirectButton = styled.div`
  display: flex;
  height: 15%;
  width: 100%;
  border: 1px solid #D2D9F1;
  background-color: white;
  border-radius: 8px;
  padding: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const TextP = styled.p`
  height: 100%;
  width: 100%;
  text-align: center;
  margin-top: 5px;
  color: #3368DD;
  font-weight: 700;
  font-size: 16px;
`;

const LoadBar = styled.div`
height: 8px;
width: 40%;
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

const LoadBar3 = styled.div`
  height: 8px;
  width: 65%;
  animation: load2 3s normal forwards;
  box-shadow: 0 10px 40px -10px #fff;
  background: #3368DD;
  width: 0;
  border-top-right-radius: 10px 10px;
  border-bottom-right-radius: 10px 10px;
  @keyframes load2 {
    0% { width: 40%; }
    100% { width: 65%; }
  }
`;

const LoadBar4 = styled.div`
  height: 8px;
  width: 90%;
  background: #3368DD;
  border-top-right-radius: 10px 10px;
  border-bottom-right-radius: 10px 10px;
  animation: load4 3s normal forwards;
  @keyframes load4 {
    0% { width: 65%; }
    100% { width: 90%; }
  }
`;

const LoadBar5 = styled.div`
  height: 8px;
  width: 90%;
  background: #3368DD;
  border-top-right-radius: 10px 10px;
  border-bottom-right-radius: 10px 10px;
  animation: load4 3s normal forwards;
  @keyframes load4 {
    0% { width: 90%; }
    100% { width: 100%; }
  }
`;

export default SignUp;
