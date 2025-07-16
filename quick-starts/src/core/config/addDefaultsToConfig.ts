export const addDefaultsToConfig = <T extends object>(
  defaults: T,
  customConfig?: Partial<T>,
  storeConfig?: Partial<T>
): T => {
  return {
    ...defaults,
    ...storeConfig,
    ...customConfig,
  }
}
