import styled from 'styled-components';
import i18n from '../../helpers/trads/i18n';
import useWindowDimensions from '../../helpers/utils';

interface MessageProps {
    messages: any,
    setMessages: any,
    withLeftDrawer?: boolean,
}

function Message({
  messages, setMessages, withLeftDrawer = false,
}: MessageProps) {
  const { width }: any = useWindowDimensions();
  if (messages.type === 'SUCCESS') {
    return (
      <Toast style={{ left: (withLeftDrawer && width >= 1212) ? 'calc(50% + 114px)' : '50%' }}>
        <SuceedMessage>
          <div style={{ marginBottom: '5px' }}>{messages.texts.map((text: string) => <div key={text}>{text}</div>)}</div>
          <div style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { setMessages({ texts: messages.texts, type: null }); }}>{i18n.resolvedLanguage === 'fr' ? 'Fermer' : 'Close'}</div>
        </SuceedMessage>
      </Toast>
    );
  } if (messages.type === 'ERROR') {
    return (
      <Toast style={{ left: (withLeftDrawer && width >= 1212) ? 'calc(50% + 114px)' : '50%' }}>
        <ErrorMessage>
          <div style={{ marginBottom: '5px' }}>{messages.texts.map((text: string) => <div key={text}>{text}</div>)}</div>
          <div style={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => { setMessages({ texts: messages.texts, type: null }); }}>{i18n.resolvedLanguage === 'fr' ? 'Fermer' : 'Close'}</div>
        </ErrorMessage>
      </Toast>
    );
  } return null;
}

export default Message;

const Toast = styled.div`
  @keyframes slidein {
    from {transform: translateY(-200px);}
    to {transform: translateY(0);}
  }

  position: fixed;
  top: 32px;
  transform: translateX(-50%);
  z-index: 11;
  animation: 0.1s linear 0s slidein;
`;

const ErrorMessage = styled.span`
  background-color: #EF5350;
  color: white;
  font-size: 14px;
  text-align: center;
  padding: 16px 12px;
  width: max-content;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-around;
  @media (max-width: 500px) {
    max-width: 300px;
  }
`;

const SuceedMessage = styled.span`
  background-color: #6BC28A;
  color: white;
  font-size: 14px;
  text-align: center;
  padding: 16px 12px;
  width: max-content;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-around;
  @media (max-width: 500px) {
    max-width: 300px;
  }
`;
