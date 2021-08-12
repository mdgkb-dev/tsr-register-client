import { ElMessage } from 'element-plus';

export default function () {
  const showMessageError = (error: string): void => {
    ElMessage.error(error);
  };

  return {
    showMessageError,
  };
}
