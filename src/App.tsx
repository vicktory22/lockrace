import { Route, Routes, Router } from '@solidjs/router';
import type { Component } from 'solid-js';
import { AuthLayout } from './pages/AuthLayout';
import { Dashboard } from './pages/Dashboard';
import { Games } from './pages/Games';
import { Me } from './pages/Me';

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
