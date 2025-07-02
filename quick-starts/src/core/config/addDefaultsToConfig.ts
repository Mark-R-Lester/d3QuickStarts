export const addDefaultsToConfig = <T extends object>(
  defaults: T,
  customConfig?: Partial<T>,
  storeConfig?: Partial<T>
): T => {
  const update = (config?: Partial<T>) => {
    if (config) {
      Object.keys(config).forEach((key) => {
        ;(defaults as any)[key] = (config as any)[key]
      })
    }
  }

  update(storeConfig)
  update(customConfig)

  return defaults
}
