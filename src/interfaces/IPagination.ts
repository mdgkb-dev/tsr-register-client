import ICursor from '@/interfaces/ICursor';

export default interface IPagination {
  cursorMode: boolean;
  cursor: ICursor;
  limit: number;
  append: boolean;
  offset: number;
  setLoadMore: (lastCursor: string, column: string, table: string) => void;
}
