import {
  ConfigStoreAccessors,
  createConfigStore,
} from '../core/config/configStore'

export interface ConfigSetters {
  legend: {
    legendConfig: ConfigStoreAccessors['setLegendConfig']
  }
  linear: {
    areaConfig: ConfigStoreAccessors['setLinearAreaConfig']
    axisConfigTop: ConfigStoreAccessors['setLinearAxisConfigTop']
    axisConfigBottom: ConfigStoreAccessors['setLinearAxisConfigBottom']
    axisConfigLeft: ConfigStoreAccessors['setLinearAxisConfigLeft']
    axisConfigRight: ConfigStoreAccessors['setLinearAxisConfigRight']
    barConfig: ConfigStoreAccessors['setLinearBarConfig']
    barGroupConfig: ConfigStoreAccessors['setLinearBarGroupConfig']
    barStackConfig: ConfigStoreAccessors['setLinearBarStackConfig']
    lineConfig: ConfigStoreAccessors['setLinearLineConfig']
    pointsConfig: ConfigStoreAccessors['setLinearPointsConfig']
    textConfig: ConfigStoreAccessors['setLinearTextConfig']
  }
  plotted: {
    lineConfig: ConfigStoreAccessors['setPlottedLineConfig']
    pointsConfig: ConfigStoreAccessors['setPlottedPointsConfig']
    textConfig: ConfigStoreAccessors['setPlottedTextConfig']
  }
  radialArc: {
    arcConfig: ConfigStoreAccessors['setRadialArcConfig']
    textConfigRotated: ConfigStoreAccessors['setRadialArcTextConfigRotated']
    textConfigHorizontal: ConfigStoreAccessors['setRadialArcTextConfigHorizontal']
    textConfigSpoke: ConfigStoreAccessors['setRadialArcTextConfigSpoke']
    textConfigFollow: ConfigStoreAccessors['setRadialArcTextConfigFollow']
  }
  radialCentroid: {
    areaConfig: ConfigStoreAccessors['setRadialCentroidAreaConfig']
    axisConfig: ConfigStoreAccessors['setRadialCentroidAxisConfig']
    lineConfig: ConfigStoreAccessors['setRadialCentroidLineConfig']
    pointsConfig: ConfigStoreAccessors['setRadialCentroidPointsConfig']
    spokesConfig: ConfigStoreAccessors['setRadialCentroidSpokesConfig']
  }
}

export const configStoreSetters = (): ConfigSetters => {
  const configStore = createConfigStore()
  return {
    legend: {
      legendConfig: configStore.setLegendConfig.bind(configStore),
    },
    linear: {
      areaConfig: configStore.setLinearAreaConfig.bind(configStore),
      axisConfigTop: configStore.setLinearAxisConfigTop.bind(configStore),
      axisConfigBottom: configStore.setLinearAxisConfigBottom.bind(configStore),
      axisConfigLeft: configStore.setLinearAxisConfigLeft.bind(configStore),
      axisConfigRight: configStore.setLinearAxisConfigRight.bind(configStore),
      barConfig: configStore.setLinearBarConfig.bind(configStore),
      barGroupConfig: configStore.setLinearBarGroupConfig.bind(configStore),
      barStackConfig: configStore.setLinearBarStackConfig.bind(configStore),
      lineConfig: configStore.setLinearLineConfig.bind(configStore),
      pointsConfig: configStore.setLinearPointsConfig.bind(configStore),
      textConfig: configStore.setLinearTextConfig.bind(configStore),
    },
    plotted: {
      lineConfig: configStore.setPlottedLineConfig.bind(configStore),
      pointsConfig: configStore.setPlottedPointsConfig.bind(configStore),
      textConfig: configStore.setPlottedTextConfig.bind(configStore),
    },
    radialArc: {
      arcConfig: configStore.setRadialArcConfig.bind(configStore),
      textConfigRotated:
        configStore.setRadialArcTextConfigRotated.bind(configStore),
      textConfigHorizontal:
        configStore.setRadialArcTextConfigHorizontal.bind(configStore),
      textConfigSpoke:
        configStore.setRadialArcTextConfigSpoke.bind(configStore),
      textConfigFollow:
        configStore.setRadialArcTextConfigFollow.bind(configStore),
    },
    radialCentroid: {
      areaConfig: configStore.setRadialCentroidAreaConfig.bind(configStore),
      axisConfig: configStore.setRadialCentroidAxisConfig.bind(configStore),
      lineConfig: configStore.setRadialCentroidLineConfig.bind(configStore),
      pointsConfig: configStore.setRadialCentroidPointsConfig.bind(configStore),
      spokesConfig: configStore.setRadialCentroidSpokesConfig.bind(configStore),
    },
  }
}
