import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from '../../routes/routes';

const AppRoutes: FC = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component, childrens }) =>
        childrens?.length ? (
          <Route key={path} path={path} element={<Component />}>
            {childrens.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>
        ) : (
          <Route key={path} path={path} element={<Component />} />
        ),
      )}
    </Routes>
  );
};

export default AppRoutes;
