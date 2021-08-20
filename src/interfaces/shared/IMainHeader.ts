import Link from '@/classes/shared/Link';

export default interface IMainHeader {
  title: string;
  links?: Link[];
  save?: undefined | (() => Promise<void>);
  create?: undefined | (() => Promise<void>) | (() => void);
}
