import styled from 'styled-components';
import logo from '../../images/navigation/logo-getfluence.svg';

function LogoNavBar() {
  return (
    <Container>
      <LogoImg onClick={() => window.open(`${process.env.REACT_APP_URL}/profile`, '_self')} src={logo} alt="" />
    </Container>
  );
}

export default LogoNavBar;

const Container = styled.div`
    position: absolute;
    z-index: 1;
    top: 50px;
    left: 5%;
`;

const LogoImg = styled.img`
  cursor: pointer;
`;
