<template>
  <div class="wrapper" v-if="mount" style="height:100%">
    <PageHead :title="title" />
    <el-row>
      <div class="table-background">
        <el-scrollbar>
          <MkbTree></MkbTree>
        </el-scrollbar>
      </div>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue';
import { Options, Vue } from 'vue-class-component';

import PageHead from '@/components/PageHead.vue';

const MkbTree = defineAsyncComponent(() => import('@/components/Mkb/MkbTree.vue'));

@Options({
  name: 'MkbList',
  components: {
    PageHead,
    MkbTree,
  },
})
export default class MkbList extends Vue {
  title = 'МКБ10';
  mount = false;

  mounted() {
    this.mount = true;
  }
}
</script>
