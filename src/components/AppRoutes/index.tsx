import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from '../../routes/routes';

const AppRoutes: FC = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component, childrens }) => {
        if (!childrens) {
          return <Route key={path} path={path} element={<Component />} />;
        }

        return (
          <Route key={path} path={path} element={<Component />}>
            {childrens.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        );
      })}
    </Routes>
  );
};

export default AppRoutes;
