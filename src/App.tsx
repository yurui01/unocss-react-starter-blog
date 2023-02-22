/// <reference types="vite-plugin-pages/client-react" />
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import LayoutWapper from './components/LayoutWapper';
import routes from '~react-pages';

import './App.css';

function App() {
  return (
    <Suspense>
      <LayoutWapper>{useRoutes(routes)}</LayoutWapper>
    </Suspense>
  );
}

export default App;
