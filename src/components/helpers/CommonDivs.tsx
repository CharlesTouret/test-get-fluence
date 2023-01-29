import styled from 'styled-components';

export const ContainerHeader = styled.div`
  display: flex;
  width: 95%;
  height: 100px;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const ComponentWithInfoSection = styled.div`
  display: flex;
  align-items: flex-start;
  @media (max-width: 912px) {
    align-items: center;
  }
`;

export const Title = styled.div`
  line-height: 54px;
  font-family: Ubuntu, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  font-size: 35px;
  font-weight: 900;
  text-align: center;
  color: #27345E;

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
