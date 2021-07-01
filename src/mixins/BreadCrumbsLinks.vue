<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import Link from '../classes/shared/Link';

@Options({
  name: 'BreadCrumbsLinks',
})
export default class BreadCrumbsLinks extends Vue {
  links: Link[] = [];

  pushToLinks(links: string[], text: string[]) {
    links.forEach((link, i) => this.links.push(new Link(link, text[i])));
  }
}
</script>
