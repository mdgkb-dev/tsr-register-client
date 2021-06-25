<script lang="ts">
import { Vue } from 'vue-class-component';
import Link from '../classes/shared/Link';

export default class ConfirmLeavePage extends Vue {
  links: Link[] = [];

  pushToLinks(links: string[], text: string[]) {
    links.forEach((link, i) => this.links.push(new Link(link, text[i])));
  }
}
</script>
