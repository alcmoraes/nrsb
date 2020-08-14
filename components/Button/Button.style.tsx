import { css } from '@emotion/core';
import { Colors } from '../styling';

export const Button = css`
  box-shadow: 0 3px 4px rgba(9, 16, 43, 0.04);
  border-radius: 6px;
  color: #ffffff;
  background-color: ${Colors['blue-600']};
  border: 1px solid transparent;
  cursor: pointer;
  outline: none;

  &:focus {
    background-color: ${Colors['blue-700']};
  }

  &:hover {
    background-color: ${Colors['blue-400']};
  }

  &:disabled {
    color: $gray-100;
    background-color: $gray-300;
    cursor: initial;
  }

  &:active {
    background-color: ${Colors['blue-600']};
  }
`;

export const Big = css`
  height: 48px;
  line-height: 18px;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.02em;
  padding: 15px 54px;

  &.inverse:focus,
  &.inverse:hover {
    padding: 14px 54px;
  }

  &.inverse:active {
    padding: 15px 54px;
  }
`;

export const Normal = css`
  height: 42px;
  line-height: 17px;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: -0.17px;
  padding: 12px 30px;

  &.inverse:focus,
  &.inverse:hover {
    padding: 11px 30px;
  }

  &.inverse:active {
    padding: 12px 30px;
  }
`;

export const Small = css`
  height: 30px;
  line-height: 20px;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: -0.17px;
  padding: 5px 20px;

  &.inverse:focus,
  &.inverse:hover {
    padding: 4px 20px;
  }

  &.inverse:active {
    padding: 5px 20px;
  }
`;

export default {
  Button,
  Big,
  Normal,
  Small,
};
