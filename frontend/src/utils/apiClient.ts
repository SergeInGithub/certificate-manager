import { AxiosRestApplicationClient } from '@types';

const apiUrl = process.env.REACT_APP_API_URL || '/';

export const apiClient = new AxiosRestApplicationClient(apiUrl);
