type StepFunction = (item: any | undefined) => unknown | void | Promise<void>;

interface IActionFunctionsGetter {
  getStepsFunctions(): StepFunction[];
}

export default class Step {
  action: StepFunction = () => undefined;
  name = '';

  constructor(act: StepFunction, name: string) {
    this.action = act;
    this.name = name;
  }
}
