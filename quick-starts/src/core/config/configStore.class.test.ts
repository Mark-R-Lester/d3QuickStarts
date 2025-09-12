import {
  legendConfig,
  unboundTextConfig,
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
  radialArcTextConfigFollow,
  radialArcTextConfigHorizontal,
  radialArcTextConfigRotated,
  radialArcTextConfigSpoke,
  centroidAreaConfig,
  centroidAxisConfig,
  centroidLineConfig,
  centroidPointsConfig,
  centroidSpokesConfig,
  arcEnvelopeConfig,
  arcSliceConfig,
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
      expect(store.unboundText).toBeUndefined()
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

      expect(store.arcSliceConfig).toBeUndefined()
      expect(store.arcEnvelopeConfig).toBeUndefined()
      expect(store.arcSegmentConfig).toBeUndefined()
      expect(store.arcTextConfigRotated).toBeUndefined()
      expect(store.arcTextConfigHorizontal).toBeUndefined()
      expect(store.arcTextConfigSpoke).toBeUndefined()
      expect(store.arcTextConfigFollow).toBeUndefined()

      expect(store.centroidAreaConfig).toBeUndefined()
      expect(store.centroidAxisConfig).toBeUndefined()
      expect(store.centroidLineConfig).toBeUndefined()
      expect(store.centroidPointsConfig).toBeUndefined()
      expect(store.centroidSpokesConfig).toBeUndefined()
    })
  })

  describe('Getters', () => {
    it('returns undefined for all getter methods initially', () => {
      expect(configManager.getters.unbound.legendConfig()).toBeUndefined()
      expect(configManager.getters.unbound.textConfig()).toBeUndefined()
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
      expect(configManager.getters.arc.arcSliceConfig()).toBeUndefined()
      expect(configManager.getters.arc.arcSegmentConfig()).toBeUndefined()
      expect(configManager.getters.arc.arcEnvelopeConfig()).toBeUndefined()
      expect(configManager.getters.arc.textConfigRotated()).toBeUndefined()
      expect(configManager.getters.arc.textConfigHorizontal()).toBeUndefined()
      expect(configManager.getters.arc.textConfigSpoke()).toBeUndefined()
      expect(configManager.getters.arc.textConfigFollow()).toBeUndefined()
      expect(configManager.getters.centroid.areaConfig()).toBeUndefined()
      expect(configManager.getters.centroid.axisConfig()).toBeUndefined()
      expect(configManager.getters.centroid.lineConfig()).toBeUndefined()
      expect(configManager.getters.centroid.pointsConfig()).toBeUndefined()
      expect(configManager.getters.centroid.spokesConfig()).toBeUndefined()
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
      configManager.setters.arc.arcSliceConfig(arcSliceConfig)
      expect(configManager.getters.arc.arcSliceConfig()).toEqual(arcSliceConfig)
    })

    it('sets and gets radial arc config', () => {
      configManager.setters.arc.arcSegmentConfig(arcEnvelopeConfig)
      expect(configManager.getters.arc.arcSegmentConfig()).toEqual(
        arcEnvelopeConfig
      )
    })

    it('sets and gets radial arc config', () => {
      configManager.setters.arc.arcEnvelopeConfig(arcEnvelopeConfig)
      expect(configManager.getters.arc.arcEnvelopeConfig()).toEqual(
        arcEnvelopeConfig
      )
    })

    it('sets and gets radial arc text rotated config', () => {
      configManager.setters.arc.textConfigRotated(radialArcTextConfigRotated)
      expect(configManager.getters.arc.textConfigRotated()).toEqual(
        radialArcTextConfigRotated
      )
    })

    it('sets and gets radial arc text horizontal config', () => {
      configManager.setters.arc.textConfigHorizontal(
        radialArcTextConfigHorizontal
      )
      expect(configManager.getters.arc.textConfigHorizontal()).toEqual(
        radialArcTextConfigHorizontal
      )
    })

    it('sets and gets radial arc text spoke config', () => {
      configManager.setters.arc.textConfigSpoke(radialArcTextConfigSpoke)
      expect(configManager.getters.arc.textConfigSpoke()).toEqual(
        radialArcTextConfigSpoke
      )
    })

    it('sets and gets radial arc text follow config', () => {
      configManager.setters.arc.textConfigFollow(radialArcTextConfigFollow)
      expect(configManager.getters.arc.textConfigFollow()).toEqual(
        radialArcTextConfigFollow
      )
    })
  })

  describe('Centroid Configurations', () => {
    it('sets and gets radial centroid area config', () => {
      configManager.setters.centroid.areaConfig(centroidAreaConfig)
      expect(configManager.getters.centroid.areaConfig()).toEqual(
        centroidAreaConfig
      )
    })

    it('sets and gets radial centroid axis config', () => {
      configManager.setters.centroid.axisConfig(centroidAxisConfig)
      expect(configManager.getters.centroid.axisConfig()).toEqual(
        centroidAxisConfig
      )
    })

    it('sets and gets radial centroid line config', () => {
      configManager.setters.centroid.lineConfig(centroidLineConfig)
      expect(configManager.getters.centroid.lineConfig()).toEqual(
        centroidLineConfig
      )
    })

    it('sets and gets radial centroid points config', () => {
      configManager.setters.centroid.pointsConfig(centroidPointsConfig)
      expect(configManager.getters.centroid.pointsConfig()).toEqual(
        centroidPointsConfig
      )
    })

    it('sets and gets radial centroid spokes config', () => {
      configManager.setters.centroid.spokesConfig(centroidSpokesConfig)
      expect(configManager.getters.centroid.spokesConfig()).toEqual(
        centroidSpokesConfig
      )
    })
  })

  describe('Store Consistency', () => {
    it('maintains single store instance across getters and setters', () => {
      configManager.setters.unbound.legendConfig(legendConfig)
      expect(configManager.getters.unbound.legendConfig()).toBe(
        (configManager as any).store.legendConfig
      )
    })

    it('maintains single store instance across getters and setters', () => {
      configManager.setters.unbound.textConfig(unboundTextConfig)
      expect(configManager.getters.unbound.textConfig()).toBe(
        (configManager as any).store.unboundTextConfig
      )
    })
  })
})
