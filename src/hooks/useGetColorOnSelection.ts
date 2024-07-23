import { useCallback } from 'react';

export const useGetColorOnSelection = () => {
  const getColorOnSelection = useCallback(
    (iconType: string | undefined, selectedMenuItem: string | null) => {
      return iconType === selectedMenuItem ? '#3f9ac9' : '#275c79';
    },
    [],
  );

  return getColorOnSelection;
};
