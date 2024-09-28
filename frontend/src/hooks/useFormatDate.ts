import { useCallback } from 'react';

export const useFormatDate = () => {
  return useCallback((date: Date | string | null) => {
    if (!date) return 'No date provided';

    let parsedDate: Date;

    if (typeof date === 'string') {
      parsedDate = new Date(date);
    } else if (date instanceof Date) {
      parsedDate = date;
    } else {
      return 'Invalid date';
    }

    if (isNaN(parsedDate.getTime())) return 'Invalid date';

    return parsedDate.toLocaleDateString('de-DE');
  }, []);
};
