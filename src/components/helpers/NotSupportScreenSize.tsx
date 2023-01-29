/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import useWindowDimensions from '../../helpers/utils';

interface NotSupportScreenSizeProps {
    maxWidth: number;
}

function NotSupportScreenSize({ maxWidth }: NotSupportScreenSizeProps) {
  const { width }: any = useWindowDimensions();
  const [open, setOpen] = useState<boolean>(true);
  const [clicked, setCicked] = useState<boolean>(false);
  const { t } = useTranslation('general');
  useEffect(() => {
    if ((width > maxWidth)) setOpen(false);
    else if (clicked) setOpen(false);
    else setOpen(true);
  }, [width]);
  return open === true
    ? (
      <Container>
        {t('screenSizeProblem', { maxSize: maxWidth })}
        <a onClick={() => {
          setCicked(true);
          setOpen(false);
        }}
        >
          close
        </a>
      </Container>
    )
    : null;
}

export default NotSupportScreenSize;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-color: #F4F9FF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  color: #9FAAD0;
  z-index: 20;
`;
