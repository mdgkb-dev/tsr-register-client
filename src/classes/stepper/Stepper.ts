import Step from '@/classes/stepper/Step';

type StepFunction = (item: never) => unknown | void | Promise<void>;

export default class Stepper {
  stepIndex = 0;
  steps: Step[] = [];

  constructor(steps: Step[]) {
    this.steps = steps;
  }

  canDecrease(): boolean {
    return this.stepIndex > 0;
  }

  canIncrease(): boolean {
    return this.stepIndex < this.steps.length;
  }

  decreaseStep(): void {
    if (this.canDecrease()) {
      this.stepIndex--;
    }
  }

  increaseStep(): void {
    if (this.canIncrease()) {
      this.stepIndex++;
    }
  }

  getStep(i?: number): Step {
    return i ? this.steps[i] : this.steps[this.stepIndex];
  }

  getStepFunc(): StepFunction {
    return this.getStep().action;
  }

  actStepFunc(arg: never): void {
    this.getStepFunc()(arg);
    this.increaseStep();
  }

  getStepNumber(): number {
    return this.stepIndex;
  }

  getStepName(): string {
    if (this.steps[this.stepIndex]) {
      return this.steps[this.stepIndex].name;
    }
    return '';
  }
}
