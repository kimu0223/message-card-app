import type { AnimationType, AnimationConfig } from '@/types/card';

export const ANIMATION_CONFIGS: Record<AnimationType, AnimationConfig> = {
  none: {
    type: 'none',
    duration: 0,
    delay: 0,
    loop: false,
  },
  confetti: {
    type: 'confetti',
    duration: 3000,
    delay: 500,
    loop: false,
  },
  fade_in: {
    type: 'fade_in',
    duration: 1200,
    delay: 0,
    loop: false,
  },
  slide_up: {
    type: 'slide_up',
    duration: 800,
    delay: 0,
    loop: false,
  },
  bounce: {
    type: 'bounce',
    duration: 1000,
    delay: 0,
    loop: true,
  },
  sparkle: {
    type: 'sparkle',
    duration: 2000,
    delay: 300,
    loop: true,
  },
};

export const FREE_ANIMATIONS: AnimationType[] = ['none', 'fade_in'];
export const PRO_ANIMATIONS: AnimationType[] = ['confetti', 'slide_up', 'bounce', 'sparkle'];
