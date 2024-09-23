import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { LanguageProvider, UserProvider } from '@components/Context';

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
