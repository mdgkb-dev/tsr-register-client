import { Ref, ref } from 'vue';
import Link from '@/classes/shared/Link';

export default function() {
  const links: Ref<Link[]> = ref([]);

  const pushToLinks = (linksList: string[], text: string[]): void => {
    linksList.forEach((link, i) => links.value.push(new Link(link, text[i])));
  }

  return {
    links,
    pushToLinks,
  }
}