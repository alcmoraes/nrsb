import { IsMobile } from '../utils';

export const Variables = {
  header_mobile_height: '75px',
};

export const Fonts = {
  Oswald: "'Oswald', sans-serif",
  Roboto: "'Roboto', sans-serif",
  ReservationWide: "'ReservationWide', sans-serif",
};

export const Media = {
  mobile: 'screen and (max-width: 991px)',
  mobile_xxs: 'screen and (max-width: 576px)',
  mobile_xs: 'screen and (max-width: 767px)',
  desktop: 'screen and (min-width: 1201px)',
  tablet: 'screen and (min-width: 991px)',
  tablet_only: 'screen and (min-width: 992px) and (max-width: 1200px)',
  desktop_xl: 'screen and (min-width: 1200px)',
  desktop_xl_inverse: 'screen and (max-width: 1200px)',
};

export const Colors = {
  woodsmoke: '#111212',
  white: '#FFFFFF',
  'blue-100': '#ebf3ff',
  'blue-200': '#cce0ff',
  'blue-300': '#99c2ff',
  'blue-400': '#66a3ff',
  'blue-500': '#3385ff',
  'blue-600': '#3385ff',
  'blue-700': '#075fe3',
  'blue-800': '#0e58c6',
  'blue-900': '#1551aa',
};

export const rem = (...args: string[]): string => {
  const output: string[] = [];
  const base = 16;
  const power = process.browser && IsMobile() ? 0.9 : 1;

  args.map((_, idx) => {
    const innerOutput: string[] = [];
    const innerArgs = args[idx].split(' ');
    innerArgs.map((_, innerIdx) => {
      innerOutput.push((power / base) * parseInt(innerArgs[innerIdx].split('px')[0]) + 'rem');
    });
    output.push(innerOutput.join(' '));
  });

  return output.join(', ');
};
