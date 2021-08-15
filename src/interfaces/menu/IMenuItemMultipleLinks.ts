import IMenuLink from '@/interfaces/menu/IMenuLink';

export default interface IMenuItemSingleLink {
  title: string;
  class: string;
  links: IMenuLink[];
}
