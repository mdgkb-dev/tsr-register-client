<script lang="ts">
import { Vue } from 'vue-class-component';

export default class FilterMixin extends Vue {
  filterNameMethod = (value: string, row: any) => row.human.getFullName() === value;
  filterDateMethod = (value: string, row: any) => row.human.dateBirth === value;
}
</script>
