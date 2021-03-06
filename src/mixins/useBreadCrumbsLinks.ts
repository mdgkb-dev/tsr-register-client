import Link from '@/classes/shared/Link';

export default function (): { links: Link[]; pushToLinks: (linksList: string[], text: string[]) => void } {
  const links: Link[] = [];

  const pushToLinks = (linksList: string[], text: string[]): void => {
    linksList.forEach((link, i) => links.push(new Link(link, text[i])));
  };

  return {
    links,
    pushToLinks,
  };
}
