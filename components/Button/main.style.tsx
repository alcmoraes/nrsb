import { css } from '@emotion/core';
import { Colors, rem, Media, Fonts } from '../styling';

export let ButtonStyling = css`
    display: flex;
    align-items: center;
    &:not(:disabled) {
        cursor: pointer!important;
    }
    > * {
        flex: 1;
    }
    padding: 10px 13px;
    text-decoration: none;
    border-radius: 0;
    font-family: ${Fonts.Oswald};
    font-size: ${rem("17px")};
    background: ${Colors.white};
    text-transform: uppercase;
    @media ${Media.mobile} {
        font-size: ${rem("20px")};
    }
    &.inverted {
        background: ${Colors.woodsmoke};
        color: ${Colors.white};
        &:not(:disabled):hover {
            background: ${Colors.white};
            color: ${Colors.woodsmoke}!important;
        }
    }
`;

export let MainButtonStyling = css`
    text-decoration: none;
    border: 2px solid ${Colors.woodsmoke};
    color: ${Colors.woodsmoke};
    background: ${Colors.white};
    &:not(:disabled):hover {
        background: ${Colors.woodsmoke};
        color: ${Colors.white}!important;
    }`

export default [ButtonStyling, MainButtonStyling];