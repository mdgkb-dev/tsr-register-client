import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

export interface State {
  anthropometries: IAnthropometry[];
  anthropometry?: IAnthropometry;
}
