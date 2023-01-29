import styled from 'styled-components';
import { FiArrowUpRight } from 'react-icons/fi';

type ButtonStyle = 'primary' | 'secondary' | 'inverted';

export interface ButtonProps {
  label: string;
  styleType?: ButtonStyle;
  arrowed?: boolean;
  link?: string;
  newTab?: boolean;
  fontSize?: string;
  onClick?: any;
  width?: string;
}

export function Button({
  styleType, label, arrowed, link, newTab = false, onClick, width = 'auto',
}: ButtonProps) {
  if (link && onClick) {
    throw Error('Need to provide link or onClick props not both');
  }

  return (
    <Container
      style={{ width }}
      styleType={styleType || 'primary'}
      onClick={onClick || (() => {
        if (link) {
          const open = window.open(link, newTab ? '_blank' : '_self');

          if (open) {
            open.focus();
          }
        }
      })}
    >
      <Content>{label}</Content>
      {
        arrowed
          ? <StyledArrow size="22px" />
          : null
      }
    </Container>
  );
}

const Container = styled.button<{ styleType: ButtonStyle }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.styleType === 'primary' ? '#3368DD'
    : props.styleType === 'secondary' ? '#FFF4E9'
      : 'white')};
  color: ${(props) => (props.styleType === 'primary' ? 'white'
    : props.styleType === 'secondary' ? '#27345E'
      : '#3368DD')};
  border: 1px solid ${(props) => (props.styleType === 'primary' ? '#3368DD'
    : props.styleType === 'secondary' ? '#FFF4E9'
      : 'white')
};
  height: ${(props) => (props.styleType === 'primary' || props.styleType === 'secondary' ? '40px'
    : props.styleType === 'inverted' ? '50px'
      : 'auto')};
  width: 'auto';
  text-align: center;
  padding: 0px 32px;
  font-size: 14px;
  font-weight: 700;
  border-radius: 6px;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.2s ease-in, color 0.2s ease-in, border-color 0.2s ease-in;

  &:hover {
    background-color: ${(props) => (props.styleType === 'primary' ? 'white'
    : props.styleType === 'secondary' ? 'black'
      : 'transparent')
};
    color: ${(props) => (props.styleType === 'primary' ? '#3368DD'
    : props.styleType === 'secondary' ? 'white'
      : 'white')
};
    border: 1px solid ${(props) => (props.styleType === 'primary' ? '#3368DD'
    : props.styleType === 'secondary' ? 'black'
      : 'white')
};
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Content = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledArrow = styled(FiArrowUpRight)`
  min-width: 22px;
  margin-left: 8px;
`;
