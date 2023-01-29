import { TailSpin } from 'react-loading-icons';
import styled from 'styled-components';

function Loading() {
  return (
    <Container>
      <TailSpin fill="#3368DD" stroke="#3368DD" />
    </Container>
  );
}

export default Loading;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: grey;
  display: flex;
  align-items: center;
  justify-content: center;
`;
