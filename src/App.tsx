import { Route, Routes, Router } from '@solidjs/router';
import { Component, lazy } from 'solid-js';
import { AuthLayout } from './pages/AuthLayout';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Games = lazy(() => import('./pages/Games'));
const Me = lazy(() => import('./pages/Me'));

const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={AuthLayout}>
          <Route path="/" component={Dashboard} />
          <Route path="/games" component={Games} />
          <Route path="/me" component={Me} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
