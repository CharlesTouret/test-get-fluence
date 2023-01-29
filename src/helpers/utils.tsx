/* eslint-disable consistent-return */
import { useState, useEffect } from 'react';

const isEmail = (email: string): boolean => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  return false;
};

const isName = (name: string): boolean => {
  const regEx = /^[A-Za-z ,.'-]+$/;
  if (name.match(regEx)) return true;
  return false;
};

const isPassword = (password: string): boolean => {
  if (password.length >= 8) return true;
  return false;
};

const isEmpty = (field: any): boolean => {
  field = field.trim();
  const emptyValues = ['', null, undefined];
  if (emptyValues.includes(field)) return true;
  return false;
};

const isSame = (field1: any, field2: any): boolean => {
  if (!isEmpty(field1)) return field1 === field2;
  return false;
};

export default function useWindowDimensions() {
  const hasWindow = typeof window !== 'undefined';

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}

function sleep(s: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, s * 1000);
  });
}

export {
  isEmail,
  isName,
  isPassword,
  isEmpty,
  isSame,
  sleep,
};
