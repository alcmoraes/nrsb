import { NEXT_DATA } from 'next/dist/next-server/lib/utils';
declare global {
  interface Window {
    __NEXT_DATA__: NEXT_DATA | null;
  }
}
