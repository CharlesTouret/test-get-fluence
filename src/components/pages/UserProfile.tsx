import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import UserNavbar from '../navigation/UserNavbar';
import UserDrawer from '../navigation/UserDrawer';
import { UserState } from '../../store/reducers/user';
import FormSection from '../forms/FormSection';
import NotSupportScreenSize from '../helpers/NotSupportScreenSize';
import Information from '../helpers/Information';
import { ComponentWithInfoSection, ContainerHeader, Title } from '../helpers/CommonDivs';

function UserProfile() {
  const { t } = useTranslation('userProfile');
  const userState: UserState = useSelector((state: any) => state.user);
  const [displayInfos, setDisplayInfos] = useState<boolean>(false);

  return (
    <Page>
      <NotSupportScreenSize maxWidth={450} />
      <UserDrawer />
      <UserNavbar />
      <Container>
        <ContainerHeader>
          <ComponentWithInfoSection>
            <Title>{t('title')}</Title>
            <Information display={displayInfos} texts={[t('information')]} onInfo={setDisplayInfos} width="400px" />
          </ComponentWithInfoSection>
        </ContainerHeader>
        <SettingsForms>
          <SettingsForm>
            <FormSections>
              <Title>{t('profile')}</Title>
              <FormSection
                type="inputText"
                title={t('nameTitle')}
                inputTextPlaceholder="john connor"
                value={userState.fullName}
              />
              <FormSection
                type="inputText"
                title={t('email')}
                inputTextPlaceholder="john connor"
                value={userState.email}
              />
              <FormSection
                type="inputText"
                title={t('company')}
                inputTextPlaceholder="john connor"
                value={userState.companyName}
              />
            </FormSections>
          </SettingsForm>
        </SettingsForms>
      </Container>
    </Page>
  );
}

export default UserProfile;

const Page = styled.div`
      display: flex;
      height: 100vh;
      font-family: 'Manrope', sans-serif;
      position: relative;
      background-color: #F4F9FF;
      margin-left: 228px;
      @media (max-width: 1212px) {
        margin-left: 0px;
      }
  `;

const Container = styled.div`
    position: relative;
    margin-top: 90px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  `;

const SettingsForms = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  height: 500px;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 20px;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const SettingsForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100%;
  align-items: flex-start;
  justify-content: space-between;;
  padding: 50px;
  background-color: white;
  border-radius: 20px;
`;

const FormSections = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`;
