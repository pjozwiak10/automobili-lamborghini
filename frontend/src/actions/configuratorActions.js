import { CONFIRM_CONFIGURATION, DELETE_CONFIGURATION } from './types';

export const confirmConfiguration = (configuredModel) => ({
  type: CONFIRM_CONFIGURATION,
  payload: configuredModel,
})

export const deleteConfiguration = () => ({
  type: DELETE_CONFIGURATION,
})

