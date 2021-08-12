export default function () {
  const formatDate = (date: Date): string => {
    return date ? Intl.DateTimeFormat('ru-RU').format(new Date(date)) : '';
  };

  return {
    formatDate,
  };
}
