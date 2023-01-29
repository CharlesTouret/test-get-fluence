import { useState } from 'react';
import styled from 'styled-components';
import { Badge, BadgeProps, Calendar } from 'antd';
import { Moment } from 'moment';
import { useTranslation } from 'react-i18next';
import UserNavbar from '../navigation/UserNavbar';
import UserDrawer from '../navigation/UserDrawer';
import Message from '../messages/Message';
import Auth from '../../backend/api/auth';
import { BackendApiError } from '../../helpers/types';
import NotSupportScreenSize from '../helpers/NotSupportScreenSize';
import { ComponentWithInfoSection, ContainerHeader, Title } from '../helpers/CommonDivs';
import Information from '../helpers/Information';
import '../../helpers/css/calendar.css';

function CalendarPage() {
  const [messages, setMessages] = useState({ texts: [], type: null });
  const { t } = useTranslation('calendar');
  const [displayInfos, setDisplayInfos] = useState<boolean>(false);
  const getCalendarListData = (value: Moment) => {
    let listData;
    const year = value.year();
    const month = value.month();
    const day = value.date();
    let events = [
      { type: 'warning', date: '01-29-2023', content: 'RDV Charles' },
      { type: 'warning', date: '01-30-2023', content: 'RDV Arnaud' },
      { type: 'warning', date: '01-31-2023', content: 'RDV Jacques' },
      { type: 'error', date: '02-01-2023', content: 'RDV Claude' },
      { type: 'warning', date: '02-01-2023', content: 'RDV John' },
      { type: 'error', date: '02-02-2023', content: 'RDV Hubert' },
    ];
    events = events.filter((item: any) => {
      const date = new Date(item.date);
      return (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day);
    });
    if (events.length > 0) {
      listData = events.map((item) => ({ type: item.type, content: item.content }));
    }
    return listData || [];
  };

  const dateCellRender = (value: Moment) => {
    const listData = getCalendarListData(value);
    return (
      <CalendarCell>
        {listData.map((item: any) => (
          displayRenewalDateModal(item)
        ))}
      </CalendarCell>
    );
  };

  const displayRenewalDateModal = (item: any) => {
    const [show, setShow] = useState<boolean>(false);
    return (
      <div onMouseEnter={() => setShow(!show)} onMouseLeave={() => setShow(!show)}>
        <Badge status={item.type as BadgeProps['status']} />
        {show ? (<EventAlert>{item.content }</EventAlert>)
          : null}
      </div>
    );
  };

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
        <Calendar
          style={{ marginLeft: '10%', marginRight: '10%' }}
          dateCellRender={dateCellRender}
        />
        <Message messages={messages} setMessages={setMessages} withLeftDrawer />
      </Container>
    </Page>
  );
}

export const resetPwd = async (email: string, setMessages: any, t: any) => {
  const response = await Auth.resetPassword(email);
  if (response.status === 200) {
    setMessages({ texts: [t('resetPasswordSuccessMessage')], type: 'SUCCESS' });
  } else {
    const result: BackendApiError = await response.json();
    setMessages(({ texts: [Auth.mapResetPasswordErrorsMessage(t, result.message)], type: 'ERROR' }));
  }
};

export default CalendarPage;

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

const CalendarCell = styled.div`
  `;

const EventAlert = styled.div`
  color: black;
  position: absolute;
  height: auto;
  width: 100px;
  z-index: 5;
  background-color: rgba(255, 255, 255, 5);
  border: solid lightgrey 0.5px;
  padding: 5px;
  border-radius: 7px;
`;
