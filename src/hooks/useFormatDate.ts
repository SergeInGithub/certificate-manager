import { useCallback } from 'react';

export const useFormatDate = () => {
  return useCallback((date: Date | null) => {
    if (!date) return 'No date provided';
    if (!(date instanceof Date) || isNaN(date.getTime())) return 'Invalid date';

    return date.toLocaleDateString('de-DE');
  }, []);
};
