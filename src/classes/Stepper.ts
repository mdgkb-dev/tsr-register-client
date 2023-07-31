type StepFunction = (item: any | undefined) => unknown | void | Promise<void>;

interface IActionFunctionsGetter {
  getStepsFunctions(): StepFunction[];
}

export default class Stepper {
  private step = 0;
  private minStep = 0;
  private maxStep = 5;
  private stepsActionsMap: Record<number, (i: unknown) => unknown> = {};

  constructor(...actions: StepFunction[]) {
    this.maxStep = actions.length;
    actions.forEach((a, i) => (this.stepsActionsMap[i] = a));
  }

  canDecrease(): boolean {
    return this.step > this.minStep;
  }

  canIncrease(): boolean {
    return this.step < this.minStep;
  }

  decreaseStep(): void {
    if (this.canDecrease()) {
      this.step--;
    }
  }

  increaseStep(): void {
    if (this.canIncrease()) {
      this.step++;
    }
  }

  getStepFunc(): StepFunction {
    return this.stepsActionsMap[this.step];
  }

  actStepFunc(arg: unknown) {
    this.getStepFunc()(arg);
  }

  getStep(): number {
    return this.step;
  }
}
