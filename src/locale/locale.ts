import { koKR } from './ko-KR';
import { enUS } from './en-US';

export const DEFAULT_LANGUAGE = 'ko-KR';

export const locales = [
  { label: 'English', code: 'en-US', translation: enUS, flag: 'us' },
  { label: '한국어', code: 'ko-KR', translation: koKR, flag: 'KR' },
];

const t = (prop: string) => {
  const d = locales.find((locale) => locale!.code === DEFAULT_LANGUAGE);
  return d?.translation[prop];
};

export default t;
