import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../navigation/UserNavbar';
import { Button } from '../forms/Button';

export default function Search() {
  const { t } = useTranslation('error');
  const navigate = useNavigate();
  return (
    <Page>
      <UserNavbar />
      <Container>
        <SubtitleDiv>
          <Title>{t('errorPageTitle').toUpperCase()}</Title>
          <SubTitle>{t('errorPageSubTitle')}</SubTitle>
          <Button label={t('errorButtonLabel')} onClick={() => navigate('/mysaas')} />
        </SubtitleDiv>
      </Container>
    </Page>
  );
}

const Page = styled.div`
    display: flex;
    height: 100vh;
    font-family: 'Manrope', sans-serif;
    position: relative;
    background-color: #F4F9FF;
  `;

const Container = styled.div`
    position: relative;
    margin-top: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
  ;
  `;

const Title = styled.h1`
      line-height: 18px;
      font-size: 14px;
      font-weight: 800;
      text-align: center;
      color: #3368DD;
      width: 100%;
    
      @media (max-width: 912px) {
        font-size: 14px;
        line-height: 48px;
      }
    
      @media (max-width: 576px) {
        text-align: left;
        font-size: 14px;
        line-height: 32px;
      }
    `;

const SubtitleDiv = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      min-width: 635px;
      margin-top: 13px;
      padding-left: 24px;
      padding-right: 24px;
    
      @media (max-width: 1212px) {
      }
    
      @media (max-width: 912px) {
        min-width: 0px;
        width: auto;
      }
      
      @media (max-width: 576px) {
      }
    `;

const SubTitle = styled.h2`
      line-height: 54px;
      font-size: 35px;
      font-weight: 700;
      text-align: center;
      color: #27345E;
      width: 635px;
      margin-bottom: 20px;
    
    @media (max-width: 912px) {
      width: auto;
      font-size: 32px;
      line-height: 48px;
    }
    
    @media (max-width: 576px) {
      font-size: 24px;
      line-height: 32px;
      text-align: left;
    }
    `;
