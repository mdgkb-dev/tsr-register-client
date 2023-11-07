type StepFunction = (item: never) => unknown | void | Promise<void>;

export default class Step {
  action: StepFunction = () => undefined;
  name = '';

  constructor(act: StepFunction, name: string) {
    this.action = act;
    this.name = name;
  }
}
