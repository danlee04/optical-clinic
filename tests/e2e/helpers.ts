import type { Page } from '@playwright/test';

/**
 * Waits for one-time page-load animations (e.g. the Hero entrance) to finish so checks such as
 * axe colour-contrast see the settled page. Infinite animations (the testimonial marquee) and
 * scroll-driven animations (`.reveal`, which use a view timeline) are ignored.
 */
export async function waitForEntranceAnimations(page: Page) {
  await page.evaluate(async () => {
    const entrances = document
      .getAnimations()
      .filter(
        (animation) =>
          animation.timeline === document.timeline &&
          animation.effect?.getComputedTiming().iterations !== Infinity,
      );
    await Promise.all(entrances.map((animation) => animation.finished.catch(() => undefined)));
  });
}
