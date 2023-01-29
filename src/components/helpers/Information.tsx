import styled from 'styled-components';
import infoImage from '../../images/general/info-circle.svg';

interface InformationProps {
  display: boolean,
  texts: string[],
  onInfo: any,
  width: string,
  left?: boolean,
}

function Information({
  display, texts, onInfo, width, left = false,
}: InformationProps) {
  return (
    <Container onMouseEnter={() => onInfo(true)} onMouseLeave={() => onInfo(false)}>
      <SoftwareImage height="20px" src={infoImage} />
      { display
        ? (
          <HiddenTexts style={{ width, left: left ? `-${width}` : '0px' }}>
            {texts.map((text) => <HiddenText>{text}</HiddenText>)}
          </HiddenTexts>
        )
        : null}
    </Container>
  );
}

export default Information;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin: 20px;
`;

const SoftwareImage = styled.img`
  border-radius: 1000px;
  cursor: pointer;
  object-fit: contain;
`;

const HiddenTexts = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 40px;
  left: 0px;
  height: auto;
  padding: 20px;
  border-radius: 8px;
  border: solid rgba(110, 123, 167, 0.5) 1px;
  background-color: white;
  z-index: 12;
`;

const HiddenText = styled.div`
  font-size: 12px;
  color: grey;
  line-height: 20px;
`;
