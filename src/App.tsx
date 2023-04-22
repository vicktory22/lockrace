import { Route, Routes, Router } from '@solidjs/router';
import type { Component } from 'solid-js';
import { Dashboard } from './pages/Dashboard';
import { Games } from './pages/Games';
import { Me } from './pages/Me';

const App: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={Dashboard} />
        <Route path="/games" component={Games} />
        <Route path="/me" component={Me} />
      </Routes>
    </Router>
  );
};

export default App;
