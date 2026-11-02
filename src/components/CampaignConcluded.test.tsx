import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import {
  CampaignConcluded,
  FINAL_STRETCH_URL,
  QUIP_POINTS_URL,
} from './CampaignConcluded';

afterEach(cleanup);

describe('CampaignConcluded', () => {
  it('says the campaign has concluded instead of counting down to a wave', () => {
    const { container } = render(<CampaignConcluded />);

    expect(container.textContent).toContain('This campaign has concluded');
    expect(container.textContent).toContain('Earn Quip Points');
    expect(container.textContent).not.toMatch(/next point wave/i);
  });

  it('links to the final stretch update and the live Quip Points campaign', () => {
    const { container } = render(<CampaignConcluded />);
    const hrefs = Array.from(container.querySelectorAll('a')).map((a) =>
      a.getAttribute('href')
    );

    expect(hrefs).toEqual([FINAL_STRETCH_URL, QUIP_POINTS_URL]);
  });
});
