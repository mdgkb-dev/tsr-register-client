import ICrud from '@/interfaces/shared/ICrud';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default class Crud implements ICrud {
  storeModule = '';
  store = useStore();
  router = useRouter();

  constructor(storeModule: string) {
    this.storeModule = storeModule;
  }

  edit = async (id: string): Promise<void> => {
    await this.router.push(`/${this.storeModule}/${id}`);
  };

  create = async (): Promise<void> => {
    await this.router.push(`/${this.storeModule}/new`);
  };

  remove = async (id: string): Promise<void> => {
    await this.store.dispatch(`${this.storeModule}/delete`, id);
  };
}
