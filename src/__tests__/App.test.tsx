import { render } from '@solidjs/testing-library';
import App from '../App';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';

describe('App', () => {
  it('should lazy load all routes', () => {
    const { queryByText } = render(() => <App />);
    expect(queryByText('Dashboard')).toBeNull();
  });
});
