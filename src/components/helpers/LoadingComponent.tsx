import styled from 'styled-components';
import { TailSpin } from 'react-loading-icons';
import { useEffect } from 'react';
import hurrayImage from '../../images/signup/hurrayIcon.svg';
import lockImage from '../../images/signup/lock.svg';
import { sleep } from '../../helpers/utils';

interface LoadingComponentProps{
  text?: string,
  footerText?: string,
  loading?: boolean,
  timer?: number,
  action?: any,
}

function LoadingComponent({
  text, footerText, loading = true, timer, action,
}: LoadingComponentProps) {
  useEffect(() => {
    actionTimer(timer, action);
  });
  return (
    <Container>
      <LoadingContent>
        <EmojiDiv src={hurrayImage} alt="" />
        <LoadingText>{text || 'loading'}</LoadingText>
        { loading
          ? (
            <SpinContainer>
              <TailSpin fill="#3368DD" stroke="#3368DD" />
            </SpinContainer>
          ) : null}
        <Footer>
          <LockImg src={lockImage} alt="" />
          <LoadingFooterText>{footerText}</LoadingFooterText>
        </Footer>
      </LoadingContent>
      {' '}
    </Container>
  );
}

const actionTimer = async (timer?: number, action?: any) => {
  if (timer && action) {
    await sleep(timer);
    action();
  }
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #F4F9FF;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingContent = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  gap: 30px;
`;

const EmojiDiv = styled.img`
  width: 95.9px;
  height: 89.22px;
  align-self: center;
  margin-bottom: 20px;
`;

const LoadingText = styled.div`
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

const Footer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-self: center;
  align-items: flex-start;
  margin-top: 100px;
  margin-bottom: -50px;
`;
const LockImg = styled.img`
  margin-top: 4px;
  margin-right: 5px;
`;

const LoadingFooterText = styled.p`
  height: 50px;
  width: 100%;
  text-align: center;
  color: #3368DD;
  font-weight: 700;
  font-size: 16px;
`;

const SpinContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

`;

export default LoadingComponent;
