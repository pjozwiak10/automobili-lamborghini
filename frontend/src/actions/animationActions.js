import { STOP_HOME_ANIMATION } from './types';

export const stopAniHome = () => ({
  type: STOP_HOME_ANIMATION,
  stop: true,
})