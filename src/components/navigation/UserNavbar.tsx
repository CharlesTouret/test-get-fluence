import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useState } from 'react';
import { Button } from '../forms/Button';
import Message from '../helpers/Message';

function UserNavbar() {
  const { t } = useTranslation('general');
  const [messages, setMessages] = useState({ texts: [], type: null });
  return (
    <Container>
      <Button styleType="secondary" label={t('talkToAnExpert')} link={t('calendlyLink')} newTab />
      <Message messages={messages} setMessages={setMessages} withLeftDrawer />
    </Container>
  );
}

export default UserNavbar;

const Container = styled.div`
  z-index: 6;
  gap: 20px;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #FFFFFF;
  width: 100%;
  height: 90px;
  padding-right: 60px;
`;
