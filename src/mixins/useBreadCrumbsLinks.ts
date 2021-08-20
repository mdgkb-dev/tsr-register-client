import Link from '@/classes/shared/Link';

export default function () {
  const links: Link[] = [];

  const pushToLinks = (linksList: string[], text: string[]): void => {
    linksList.forEach((link, i) => links.push(new Link(link, text[i])));
  };

  return {
    links,
    pushToLinks,
  };
}
