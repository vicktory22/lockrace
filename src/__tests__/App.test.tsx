import { render } from '@solidjs/testing-library';
import App from '../App';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';

describe('App', () => {
  it('should render the app', () => {
    const { getByText } = render(() => <App />);
    expect(getByText('Dashboard')).toBeInTheDocument();
  });
});
