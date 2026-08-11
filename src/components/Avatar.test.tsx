import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { Avatar } from './Avatar';

afterEach(cleanup);

const BROKEN_SRC =
  'https://pbs.twimg.com/profile_images/1895756503975342080/9qB2ZxmB_normal.jpg';

describe('Avatar', () => {
  it('shows the image while it loads successfully', () => {
    render(<Avatar src={BROKEN_SRC} name="Satoshi" />);

    expect(screen.getByRole('presentation')).toHaveProperty('src', BROKEN_SRC);
  });

  it('falls back to the initial when the image fails to load', () => {
    render(<Avatar src={BROKEN_SRC} name="Satoshi" />);

    fireEvent.error(screen.getByRole('presentation'));

    expect(screen.queryByRole('presentation')).toBeNull();
    expect(screen.getByText('S')).toBeTruthy();
  });

  it('retries when a different image is given', () => {
    const { rerender } = render(<Avatar src={BROKEN_SRC} name="Satoshi" />);
    fireEvent.error(screen.getByRole('presentation'));

    rerender(<Avatar src="https://example.com/other.jpg" name="Satoshi" />);

    expect(screen.getByRole('presentation')).toHaveProperty(
      'src',
      'https://example.com/other.jpg'
    );
  });

  it('shows the initial when there is no image', () => {
    render(<Avatar src={null} name="Satoshi" />);

    expect(screen.getByText('S')).toBeTruthy();
  });
});
