export default interface IAnthropometry {
  id?: string;
  name: string;
  measure: string;

  isWeight(): boolean;
  isHeight(): boolean;
}
