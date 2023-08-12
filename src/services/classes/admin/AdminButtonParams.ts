import { ComputedRef, Ref } from 'vue';
import { NavigationGuardNext } from 'vue-router';

type actionFunction = ((next?: NavigationGuardNext | undefined) => Promise<void>) | (() => Promise<void>) | ((param?: unknown) => void);
export type buttonAction = undefined | actionFunction | ComputedRef<actionFunction>;
export default class AdminButtonParams {
  text?: string | ComputedRef<string> = 'Сохранить';
  color?: string | ComputedRef<string> = '#ffffff';
  type?: string = 'save-button';
  condition?: boolean | ComputedRef<boolean> | Ref<boolean> = true;
  action?: buttonAction;

  constructor(adminButtonParams?: AdminButtonParams) {
    if (!adminButtonParams) {
      return;
    }
    if (adminButtonParams.text) {
      this.text = adminButtonParams.text;
    }
    if (adminButtonParams.color) {
      this.color = adminButtonParams.color;
    }
    if (adminButtonParams.type) {
      this.type = adminButtonParams.type;
    }
    if (adminButtonParams.condition !== undefined) {
      this.condition = adminButtonParams.condition;
    }
    this.action = adminButtonParams.action;
  }
}
