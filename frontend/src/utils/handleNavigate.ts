import { NavigateFunction } from 'react-router-dom';

export const handleNavigate = (page: string, navigate: NavigateFunction) => {
  navigate(page);
};
