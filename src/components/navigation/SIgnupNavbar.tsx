import styled from 'styled-components';
import loginLeftImage from '../../images/login/login-left-image.jpg';

function DisplayLeftDiv() {
  return (
    <LeftDiv style={{
      backgroundImage: `url(${loginLeftImage})`,
    }}
    >
      <ImgBlueFilter />
      <ImgBlackFilter />
    </LeftDiv>
  );
}

export default DisplayLeftDiv;

const LeftDiv = styled.div`
  display: flex;
  flex: 1;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const ImgBlueFilter = styled.div`
  background-color: rgba(0, 26, 170, 0.2);
  position: absolute;
  height: 100vh;
  width: 100%;
`;

const ImgBlackFilter = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  height: 100vh;
  width: 100%;
`;
