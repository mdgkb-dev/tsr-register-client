<template>
  <ListHead :title="title" />
  <MkbTree></MkbTree>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue';

import { Vue, Options } from 'vue-class-component';
import ListHead from '@/components/ListHead.vue';

const MkbTree = defineAsyncComponent(() => import('@/components/MkbTree.vue'));

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
