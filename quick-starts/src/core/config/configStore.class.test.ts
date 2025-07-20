import {
  legendConfig,
  orthogonalAreaConfig,
  orthogonalAxisConfigBottom,
  orthogonalAxisConfigLeft,
  orthogonalAxisConfigRight,
  orthogonalAxisConfigTop,
  orthogonalBarConfig,
  orthogonalBarGroupConfig,
  orthogonalBarStackConfig,
  orthogonalLineConfig,
  orthogonalPointsConfig,
  orthogonalTextConfig,
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
      expect(store.orthogonalAreaConfig).toBeUndefined()
      expect(store.orthogonalAxisConfigTop).toBeUndefined()
      expect(store.orthogonalAxisConfigBottom).toBeUndefined()
      expect(store.orthogonalAxisConfigLeft).toBeUndefined()
      expect(store.orthogonalAxisConfigRight).toBeUndefined()
      expect(store.orthogonalBarConfig).toBeUndefined()
      expect(store.orthogonalBarGroupConfig).toBeUndefined()
      expect(store.orthogonalBarStackConfig).toBeUndefined()
      expect(store.orthogonalLineConfig).toBeUndefined()
      expect(store.orthogonalPointsConfig).toBeUndefined()
      expect(store.orthogonalTextConfig).toBeUndefined()
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
      expect(configManager.getters.orthogonal.areaConfig()).toBeUndefined()
      expect(configManager.getters.orthogonal.axisConfigTop()).toBeUndefined()
      expect(
        configManager.getters.orthogonal.axisConfigBottom()
      ).toBeUndefined()
      expect(configManager.getters.orthogonal.axisConfigLeft()).toBeUndefined()
      expect(configManager.getters.orthogonal.axisConfigRight()).toBeUndefined()
      expect(configManager.getters.orthogonal.barConfig()).toBeUndefined()
      expect(configManager.getters.orthogonal.barGroupConfig()).toBeUndefined()
      expect(configManager.getters.orthogonal.barStackConfig()).toBeUndefined()
      expect(configManager.getters.orthogonal.lineConfig()).toBeUndefined()
      expect(configManager.getters.orthogonal.pointsConfig()).toBeUndefined()
      expect(configManager.getters.orthogonal.textConfig()).toBeUndefined()
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

  describe('orthogonal Configurations', () => {
    it('sets and gets orthogonal area config', () => {
      configManager.setters.orthogonal.areaConfig(orthogonalAreaConfig)
      expect(configManager.getters.orthogonal.areaConfig()).toEqual(
        orthogonalAreaConfig
      )
    })

    it('sets and gets orthogonal axis top config', () => {
      configManager.setters.orthogonal.axisConfigTop(orthogonalAxisConfigTop)
      expect(configManager.getters.orthogonal.axisConfigTop()).toEqual(
        orthogonalAxisConfigTop
      )
    })

    it('sets and gets orthogonal axis bottom config', () => {
      configManager.setters.orthogonal.axisConfigBottom(
        orthogonalAxisConfigBottom
      )
      expect(configManager.getters.orthogonal.axisConfigBottom()).toEqual(
        orthogonalAxisConfigBottom
      )
    })

    it('sets and gets orthogonal axis left config', () => {
      configManager.setters.orthogonal.axisConfigLeft(orthogonalAxisConfigLeft)
      expect(configManager.getters.orthogonal.axisConfigLeft()).toEqual(
        orthogonalAxisConfigLeft
      )
    })

    it('sets and gets orthogonal axis right config', () => {
      configManager.setters.orthogonal.axisConfigRight(
        orthogonalAxisConfigRight
      )
      expect(configManager.getters.orthogonal.axisConfigRight()).toEqual(
        orthogonalAxisConfigRight
      )
    })

    it('sets and gets orthogonal bar config', () => {
      configManager.setters.orthogonal.barConfig(orthogonalBarConfig)
      expect(configManager.getters.orthogonal.barConfig()).toEqual(
        orthogonalBarConfig
      )
    })

    it('sets and gets orthogonal bar group config', () => {
      configManager.setters.orthogonal.barGroupConfig(orthogonalBarGroupConfig)
      expect(configManager.getters.orthogonal.barGroupConfig()).toEqual(
        orthogonalBarGroupConfig
      )
    })

    it('sets and gets orthogonal bar stack config', () => {
      configManager.setters.orthogonal.barStackConfig(orthogonalBarStackConfig)
      expect(configManager.getters.orthogonal.barStackConfig()).toEqual(
        orthogonalBarStackConfig
      )
    })

    it('sets and gets orthogonal line config', () => {
      configManager.setters.orthogonal.lineConfig(orthogonalLineConfig)
      expect(configManager.getters.orthogonal.lineConfig()).toEqual(
        orthogonalLineConfig
      )
    })

    it('sets and gets orthogonal points config', () => {
      configManager.setters.orthogonal.pointsConfig(orthogonalPointsConfig)
      expect(configManager.getters.orthogonal.pointsConfig()).toEqual(
        orthogonalPointsConfig
      )
    })

    it('sets and gets orthogonal text config', () => {
      configManager.setters.orthogonal.textConfig(orthogonalTextConfig)
      expect(configManager.getters.orthogonal.textConfig()).toEqual(
        orthogonalTextConfig
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
