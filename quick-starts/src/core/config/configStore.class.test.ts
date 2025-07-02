import {
  legendConfig,
  linearAreaConfig,
  linearAxisConfigBottom,
  linearAxisConfigLeft,
  linearAxisConfigRight,
  linearAxisConfigTop,
  linearBarConfig,
  linearBarGroupConfig,
  linearBarStackConfig,
  linearLineConfig,
  linearPointsConfig,
  linearTextConfig,
  plottedLineConfig,
  plottedPointsConfig,
  plottedTextConfig,
  radialArcConfig,
  radialArcTextConfigFollow,
  radialArcTextConfigHorizontal,
  radialArcTextConfigRotated,
  radialArcTextConfigSpoke,
  radialCentroidAreaConfig,
  radialCentroidAxisConfig,
  radialCentroidLineConfig,
  radialCentroidPointsConfig,
  radialCentroidSpokesConfig,
} from './__mocks__/configDefaults'
import { ConfigStoreManager } from './configStore.class'

jest.mock('./configDefaults')

describe('ConfigStoreManager', () => {
  let configManager: ConfigStoreManager

  beforeEach(() => {
    configManager = new ConfigStoreManager()
  })

  describe('Constructor', () => {
    it('initializes store with undefined values', () => {
      const store = (configManager as any).store
      expect(store.legendConfig).toBeUndefined()
      expect(store.linearAreaConfig).toBeUndefined()
      expect(store.linearAxisConfigTop).toBeUndefined()
      expect(store.linearAxisConfigBottom).toBeUndefined()
      expect(store.linearAxisConfigLeft).toBeUndefined()
      expect(store.linearAxisConfigRight).toBeUndefined()
      expect(store.linearBarConfig).toBeUndefined()
      expect(store.linearBarGroupConfig).toBeUndefined()
      expect(store.linearBarStackConfig).toBeUndefined()
      expect(store.linearLineConfig).toBeUndefined()
      expect(store.linearPointsConfig).toBeUndefined()
      expect(store.linearTextConfig).toBeUndefined()
      expect(store.plottedLineConfig).toBeUndefined()
      expect(store.plottedPointsConfig).toBeUndefined()
      expect(store.plottedTextConfig).toBeUndefined()
      expect(store.radialArcConfig).toBeUndefined()
      expect(store.radialArcTextConfigRotated).toBeUndefined()
      expect(store.radialArcTextConfigHorizontal).toBeUndefined()
      expect(store.radialArcTextConfigSpoke).toBeUndefined()
      expect(store.radialArcTextConfigFollow).toBeUndefined()
      expect(store.radialCentroidAreaConfig).toBeUndefined()
      expect(store.radialCentroidAxisConfig).toBeUndefined()
      expect(store.radialCentroidLineConfig).toBeUndefined()
      expect(store.radialCentroidPointsConfig).toBeUndefined()
      expect(store.radialCentroidSpokesConfig).toBeUndefined()
    })
  })

  describe('Getters', () => {
    it('returns undefined for all getter methods initially', () => {
      expect(configManager.getters.legend.legendConfig()).toBeUndefined()
      expect(configManager.getters.linear.areaConfig()).toBeUndefined()
      expect(configManager.getters.linear.axisConfigTop()).toBeUndefined()
      expect(configManager.getters.linear.axisConfigBottom()).toBeUndefined()
      expect(configManager.getters.linear.axisConfigLeft()).toBeUndefined()
      expect(configManager.getters.linear.axisConfigRight()).toBeUndefined()
      expect(configManager.getters.linear.barConfig()).toBeUndefined()
      expect(configManager.getters.linear.barGroupConfig()).toBeUndefined()
      expect(configManager.getters.linear.barStackConfig()).toBeUndefined()
      expect(configManager.getters.linear.lineConfig()).toBeUndefined()
      expect(configManager.getters.linear.pointsConfig()).toBeUndefined()
      expect(configManager.getters.linear.textConfig()).toBeUndefined()
      expect(configManager.getters.plotted.lineConfig()).toBeUndefined()
      expect(configManager.getters.plotted.pointsConfig()).toBeUndefined()
      expect(configManager.getters.plotted.textConfig()).toBeUndefined()
      expect(configManager.getters.radialArc.arcConfig()).toBeUndefined()
      expect(
        configManager.getters.radialArc.textConfigRotated()
      ).toBeUndefined()
      expect(
        configManager.getters.radialArc.textConfigHorizontal()
      ).toBeUndefined()
      expect(configManager.getters.radialArc.textConfigSpoke()).toBeUndefined()
      expect(configManager.getters.radialArc.textConfigFollow()).toBeUndefined()
      expect(configManager.getters.radialCentroid.areaConfig()).toBeUndefined()
      expect(configManager.getters.radialCentroid.axisConfig()).toBeUndefined()
      expect(configManager.getters.radialCentroid.lineConfig()).toBeUndefined()
      expect(
        configManager.getters.radialCentroid.pointsConfig()
      ).toBeUndefined()
      expect(
        configManager.getters.radialCentroid.spokesConfig()
      ).toBeUndefined()
    })
  })

  describe('Linear Configurations', () => {
    it('sets and gets linear area config', () => {
      configManager.setters.linear.areaConfig(linearAreaConfig)
      expect(configManager.getters.linear.areaConfig()).toEqual(
        linearAreaConfig
      )
    })

    it('sets and gets linear axis top config', () => {
      configManager.setters.linear.axisConfigTop(linearAxisConfigTop)
      expect(configManager.getters.linear.axisConfigTop()).toEqual(
        linearAxisConfigTop
      )
    })

    it('sets and gets linear axis bottom config', () => {
      configManager.setters.linear.axisConfigBottom(linearAxisConfigBottom)
      expect(configManager.getters.linear.axisConfigBottom()).toEqual(
        linearAxisConfigBottom
      )
    })

    it('sets and gets linear axis left config', () => {
      configManager.setters.linear.axisConfigLeft(linearAxisConfigLeft)
      expect(configManager.getters.linear.axisConfigLeft()).toEqual(
        linearAxisConfigLeft
      )
    })

    it('sets and gets linear axis right config', () => {
      configManager.setters.linear.axisConfigRight(linearAxisConfigRight)
      expect(configManager.getters.linear.axisConfigRight()).toEqual(
        linearAxisConfigRight
      )
    })

    it('sets and gets linear bar config', () => {
      configManager.setters.linear.barConfig(linearBarConfig)
      expect(configManager.getters.linear.barConfig()).toEqual(linearBarConfig)
    })

    it('sets and gets linear bar group config', () => {
      configManager.setters.linear.barGroupConfig(linearBarGroupConfig)
      expect(configManager.getters.linear.barGroupConfig()).toEqual(
        linearBarGroupConfig
      )
    })

    it('sets and gets linear bar stack config', () => {
      configManager.setters.linear.barStackConfig(linearBarStackConfig)
      expect(configManager.getters.linear.barStackConfig()).toEqual(
        linearBarStackConfig
      )
    })

    it('sets and gets linear line config', () => {
      configManager.setters.linear.lineConfig(linearLineConfig)
      expect(configManager.getters.linear.lineConfig()).toEqual(
        linearLineConfig
      )
    })

    it('sets and gets linear points config', () => {
      configManager.setters.linear.pointsConfig(linearPointsConfig)
      expect(configManager.getters.linear.pointsConfig()).toEqual(
        linearPointsConfig
      )
    })

    it('sets and gets linear text config', () => {
      configManager.setters.linear.textConfig(linearTextConfig)
      expect(configManager.getters.linear.textConfig()).toEqual(
        linearTextConfig
      )
    })
  })

  describe('Plotted Configurations', () => {
    it('sets and gets plotted line config', () => {
      configManager.setters.plotted.lineConfig(plottedLineConfig)
      expect(configManager.getters.plotted.lineConfig()).toEqual(
        plottedLineConfig
      )
    })

    it('sets and gets plotted points config', () => {
      configManager.setters.plotted.pointsConfig(plottedPointsConfig)
      expect(configManager.getters.plotted.pointsConfig()).toEqual(
        plottedPointsConfig
      )
    })

    it('sets and gets plotted text config', () => {
      configManager.setters.plotted.textConfig(plottedTextConfig)
      expect(configManager.getters.plotted.textConfig()).toEqual(
        plottedTextConfig
      )
    })
  })

  describe('RadialArc Configurations', () => {
    it('sets and gets radial arc config', () => {
      configManager.setters.radialArc.arcConfig(radialArcConfig)
      expect(configManager.getters.radialArc.arcConfig()).toEqual(
        radialArcConfig
      )
    })

    it('sets and gets radial arc text rotated config', () => {
      configManager.setters.radialArc.textConfigRotated(
        radialArcTextConfigRotated
      )
      expect(configManager.getters.radialArc.textConfigRotated()).toEqual(
        radialArcTextConfigRotated
      )
    })

    it('sets and gets radial arc text horizontal config', () => {
      configManager.setters.radialArc.textConfigHorizontal(
        radialArcTextConfigHorizontal
      )
      expect(configManager.getters.radialArc.textConfigHorizontal()).toEqual(
        radialArcTextConfigHorizontal
      )
    })

    it('sets and gets radial arc text spoke config', () => {
      configManager.setters.radialArc.textConfigSpoke(radialArcTextConfigSpoke)
      expect(configManager.getters.radialArc.textConfigSpoke()).toEqual(
        radialArcTextConfigSpoke
      )
    })

    it('sets and gets radial arc text follow config', () => {
      configManager.setters.radialArc.textConfigFollow(
        radialArcTextConfigFollow
      )
      expect(configManager.getters.radialArc.textConfigFollow()).toEqual(
        radialArcTextConfigFollow
      )
    })
  })

  describe('RadialCentroid Configurations', () => {
    it('sets and gets radial centroid area config', () => {
      configManager.setters.radialCentroid.areaConfig(radialCentroidAreaConfig)
      expect(configManager.getters.radialCentroid.areaConfig()).toEqual(
        radialCentroidAreaConfig
      )
    })

    it('sets and gets radial centroid axis config', () => {
      configManager.setters.radialCentroid.axisConfig(radialCentroidAxisConfig)
      expect(configManager.getters.radialCentroid.axisConfig()).toEqual(
        radialCentroidAxisConfig
      )
    })

    it('sets and gets radial centroid line config', () => {
      configManager.setters.radialCentroid.lineConfig(radialCentroidLineConfig)
      expect(configManager.getters.radialCentroid.lineConfig()).toEqual(
        radialCentroidLineConfig
      )
    })

    it('sets and gets radial centroid points config', () => {
      configManager.setters.radialCentroid.pointsConfig(
        radialCentroidPointsConfig
      )
      expect(configManager.getters.radialCentroid.pointsConfig()).toEqual(
        radialCentroidPointsConfig
      )
    })

    it('sets and gets radial centroid spokes config', () => {
      configManager.setters.radialCentroid.spokesConfig(
        radialCentroidSpokesConfig
      )
      expect(configManager.getters.radialCentroid.spokesConfig()).toEqual(
        radialCentroidSpokesConfig
      )
    })
  })

  describe('Store Consistency', () => {
    it('maintains single store instance across getters and setters', () => {
      configManager.setters.legend.legendConfig(legendConfig)
      expect(configManager.getters.legend.legendConfig()).toBe(
        (configManager as any).store.legendConfig
      )
    })
  })
})
