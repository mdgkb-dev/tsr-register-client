<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import Link from '../classes/shared/Link';

@Options({
  name: 'ConfirmLeavePage',
})
export default class ConfirmLeavePage extends Vue {
  links: Link[] = [];

  pushToLinks(links: string[], text: string[]) {
    links.forEach((link, i) => this.links.push(new Link(link, text[i])));
  }
}
</script>
