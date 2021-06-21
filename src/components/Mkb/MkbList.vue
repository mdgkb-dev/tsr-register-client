<template>
  <ListHead :title="title" />
  <el-row>
    <div class="table-background" style="width: 100%; margin-bottom: 20px">
      <MkbTree></MkbTree>
    </div>
  </el-row>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue';

import { Vue, Options } from 'vue-class-component';
import ListHead from '@/components/ListHead.vue';

const MkbTree = defineAsyncComponent(() => import('@/components/Mkb/MkbTree.vue'));

@Options({
  components: {
    ListHead,
    MkbTree,
  },
})
export default class MkbList extends Vue {
  title = 'МКБ10';
}
</script>
