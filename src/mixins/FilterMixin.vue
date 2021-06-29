<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  name: 'FilterMixin',
})
export default class FilterMixin extends Vue {
  filterNameMethod = (value: string, row: any) => row.human.getFullName() === value;
  filterDateMethod = (value: string, row: any) => row.human.dateBirth === value;
}
</script>
