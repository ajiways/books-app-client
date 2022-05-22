import { FC } from 'react';
import { AppRoutes, Header } from './components';

const App: FC = () => {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
};

export default App;
