import { ElMessage } from 'element-plus';

interface IReturn {
  showMessageError: (error: string) => void;
}

export default function (): IReturn {
  const showMessageError = (error: string): void => {
    if (!ElMessage.error) {
      return;
    }
    ElMessage.error(error);
  };

  return {
    showMessageError,
  };
}
