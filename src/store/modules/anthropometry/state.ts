import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

export default interface State {
  anthropometries: IAnthropometry[];
  anthropometry?: IAnthropometry;
}
