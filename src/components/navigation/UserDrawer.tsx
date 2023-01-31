import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useDispatch } from 'react-redux';
import logo from '../../images/navigation/logo-getfluence.svg';
import { ReactComponent as Chart } from '../../images/navigation/chart.svg';
import { ReactComponent as SearchZoomIn } from '../../images/navigation/search-zoom-in.svg';
import { ReactComponent as Help } from '../../images/navigation/info-circle.svg';
import { ReactComponent as Logout } from '../../images/navigation/logout.svg';
import { ReactComponent as BurgerMenu } from '../../images/navigation/burger-menu.svg';
import Message from '../helpers/Message';
import useWindowDimensions from '../../helpers/utils';
import { logout } from '../../store/reducers/auth';
import { endSession } from '../../store/reducers/user';

function UserDrawer() {
  const { t } = useTranslation('general');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState({ texts: [], type: null });
  const [isHovering, setIsHovering] = useState('');
  const [open, setOpen] = useState(false);
  const { width }: any = useWindowDimensions();
  const ref = useDetectClickOutside({
    onTriggered: (e: any) => {
      if (e.target.id !== 'responsive-button') { setOpen(false); }
    },
  });
  if (width >= 1212) return displayDesktopNav(isHovering, setIsHovering, messages, setMessages, dispatch, navigate, location, t);
  return displayResponsiveNav(isHovering, setIsHovering, ref, messages, setMessages, dispatch, navigate, location, open, setOpen, t);
}

export default UserDrawer;

const displayDesktopNav = (isHovering: any, setIsHovering: any, messages: any, setMessages: any, dispatch: any, navigate: any, location: any, t: any) => (
  <Container>
    <TopDiv>
      <LogoDiv>
        <LogoImg onClick={() => window.open(`${process.env.REACT_APP_URL}/profile`, '_self')} src={logo} alt="" />
      </LogoDiv>
      <NavTitleElement>{t('mainMenu').toUpperCase()}</NavTitleElement>
      {displayNavElement(Chart, t('pages'), 'pages', false, isHovering, setIsHovering, setMessages, navigate, location)}
      {displayNavSubElement(Chart, t('myProfile'), 'myProfile', false, isHovering, setIsHovering, setMessages, navigate, location)}
      {displayNavSubElement(SearchZoomIn, t('calendar'), 'calendar', false, isHovering, setIsHovering, setMessages, navigate, location)}
    </TopDiv>
    <LogoutDiv>
      {displayNavHelpElement(Help, t('help'), 'help', false, isHovering, setIsHovering, t, location)}
      {displayNavLogoutElement(Logout, t('logoutButton'), 'logout', false, isHovering, setIsHovering, dispatch, navigate, location)}
    </LogoutDiv>
    <Message messages={messages} setMessages={setMessages} withLeftDrawer />
  </Container>
);

const displayResponsiveNav = (isHovering: any, setIsHovering: any, ref: any, messages: any, setMessages: any, dispatch: any, navigate: any, location: any, open: boolean, setOpen: any, t: any) => (
  <ResponsiveContainer>
    { open
      ? (
        <ResponsiveContainerOpen ref={ref}>
          <TopDiv>
            <LogoDiv>
              <LogoImg onClick={() => window.open(`${process.env.REACT_APP_URL}/profile`, '_self')} src={logo} alt="" />
            </LogoDiv>
            <NavTitleElement>{t('mainMenu').toUpperCase()}</NavTitleElement>
            {displayNavElement(Chart, t('pages'), 'pages', false, isHovering, setIsHovering, setMessages, navigate, location)}
            {displayNavSubElement(Chart, t('myProfile'), 'myProfile', false, isHovering, setIsHovering, setMessages, navigate, location)}
            {displayNavSubElement(SearchZoomIn, t('calendar'), 'calendar', false, isHovering, setIsHovering, setMessages, navigate, location)}
          </TopDiv>
          <LogoutDiv>
            {displayNavHelpElement(Help, t('help'), 'help', false, isHovering, setIsHovering, t, location)}
            {displayNavLogoutElement(Logout, t('logoutButton'), 'logout', false, isHovering, setIsHovering, dispatch, navigate, location)}
          </LogoutDiv>
          <Message messages={messages} setMessages={setMessages} />
        </ResponsiveContainerOpen>
      )
      : (
        <ResponsiveMenuButton>
          <BurgerMenu width="90%" height="100%" id="responsive-button" ref={ref} onClick={() => setOpen(true)} />
        </ResponsiveMenuButton>
      )}
  </ResponsiveContainer>
);

function displayNavElement(SvgImage: any, title: string, element: string, disabled: boolean, isHovering: string, setIsHovering: any, setMessages: any, navigate: any, location: any) {
  const handleMouseOver = () => {
    setIsHovering(element);
  };

  const handleMouseOut = () => {
    setIsHovering('');
  };
  let color = (element === isHovering) || (Object.keys(elementNavigation).includes(element) && elementNavigation[element].includes(location.pathname)) ? '#3368DD' : '#969BA0';
  color = !disabled ? color : '#969BA0';
  return (
    <NavElement
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() => {
        if (!disabled) {
          if (Object.keys(elementNavigation).includes(element)) navigate(elementNavigation[element][0]);
          else setMessages({ type: 'ERROR', texts: ['functionnality is comming'] });
        }
      }}
    >
      <NavLogoElement>
        <SvgImage fill={color} />
      </NavLogoElement>
      <NavTextElement style={{ color }}>{title}</NavTextElement>
    </NavElement>
  );
}

function displayNavSubElement(SvgImage: any, title: string, element: string, disabled: boolean, isHovering: string, setIsHovering: any, setMessages: any, navigate: any, location: any) {
  return (
    <SubNavElement>
      {displayNavElement(SvgImage, title, element, disabled, isHovering, setIsHovering, setMessages, navigate, location)}
    </SubNavElement>
  );
}

function displayNavLogoutElement(SvgImage: any, title: string, element: string, disabled: boolean, isHovering: string, setIsHovering: any, dispatch: any, navigate: any, location: any) {
  const handleMouseOver = () => {
    setIsHovering(element);
  };

  const handleMouseOut = () => {
    setIsHovering('');
  };
  let color = (element === isHovering) || (Object.keys(elementNavigation).includes(element) && elementNavigation[element].includes(location.pathname)) ? '#3368DD' : '#969BA0';
  color = !disabled ? color : '#969BA0';
  return (
    <NavElement
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() => logoutClicked(dispatch, navigate)}
    >
      <NavLogoElement>
        <SvgImage fill={color} />
      </NavLogoElement>
      <NavTextElement style={{ color }}>{title}</NavTextElement>
    </NavElement>
  );
}

function displayNavHelpElement(SvgImage: any, title: string, element: string, disabled: boolean, isHovering: string, setIsHovering: any, t: any, location: any) {
  const handleMouseOver = () => {
    setIsHovering(element);
  };

  const handleMouseOut = () => {
    setIsHovering('');
  };
  let color = (element === isHovering) || (Object.keys(elementNavigation).includes(element) && elementNavigation[element].includes(location.pathname)) ? '#3368DD' : '#969BA0';
  color = !disabled ? color : '#969BA0';
  return (
    <NavElement
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={() => helpClicked(t)}
    >
      <NavLogoElement>
        <SvgImage />
      </NavLogoElement>
      <NavTextElement style={{ color }}>{title}</NavTextElement>
    </NavElement>
  );
}

const helpClicked = (t: any) => {
  window.open(t('helpLink'), '_blank');
};

export const logoutClicked = (dispatch: any, navigate: any) => {
  dispatch(logout());
  dispatch(endSession());
  navigate('/login');
  // @ts-ignore
  window.analytics.reset();
};

const elementNavigation: any = {
  pages: ['/profile', '/calendar'],
  myProfile: ['/profile'],
  calendar: ['/calendar'],
};

const Container = styled.div`
  position: fixed;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background-color: #FFFFFF;
  left: 0px;
  width: 228px;
  z-index: 7;
`;

const TopDiv = styled.div`
  width: 70%;
`;

const LogoDiv = styled.div`
  cursor: pointer;
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.img`
  cursor: pointer;
  width: 50px;
`;

const NavTitleElement = styled.div`
  color: #9FAAD0;
  font-family: 'Ubuntu';
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1px;
  text-align: left;
  width: 70%;
  margin-bottom: 10px;
`;

const NavElement = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 6px;
  width: 100%;
  font-weight: 800;
  cursor: pointer;
  color: #969BA0;
  &:hover {
    color: #3368DD;
  }
`;

const SubNavElement = styled.div`
  width: 80%;
  display: flex;
  margin-left: 20%;
  &:hover {
    color: #3368DD;
  }
`;

const NavTextElement = styled.div`
  font-size: 12px;
`;

const NavLogoElement = styled.div`
  width: auto;
  margin-right: 10px;
`;

const ResponsiveContainer = styled.div`
  z-index: 7;
`;

const ResponsiveMenuButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #FFFFFF;
  top: 25px;
  left: 5%;
  height: 40px;
  width: 40px;
  cursor: pointer;
`;

const ResponsiveContainerOpen = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #FFFFFF;
  left: 0px;
  width: 228px;
  height: 100%;
`;

const LogoutDiv = styled.div`
  width: 70%;
  margin-bottom: 20px;
`;
