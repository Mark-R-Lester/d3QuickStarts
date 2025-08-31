import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Paths } from '../../AppRoutes'

interface NavButtonProps {
  to: string
  children: React.ReactNode
}

const StyledNavButton = styled('button')({
  border: 'none',
  background: 'none',
  padding: '4px 8px',
  font: 'inherit',
  cursor: 'pointer',
  color: '#1a73e8',
  textAlign: 'inherit',
  textDecoration: 'none',
  fontSize: 20,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: '#f0f4f8',
    color: 'black',
  },
})

export const SubPage = {
  BASIC: `?subPage=basic`,
  CONFIG: `?subPage=config`,
  EDITOR: `?subPage=editor`,

  ORTHOGONAL: `?subPage=orthogonal`,
  RADIAL: `?subPage=raidal`,
  PLOTTED: `?subPage=plotted`,
}

export const SubPageTarget = {
  BASIC: `basic`,
  CONFIG: `onfig`,
  EDITOR: `editor`,

  ORTHOGONAL: `orthogonal`,
  RADIAL: `raidal`,
  PLOTTED: `plotted`,
}

const NavButton: React.FC<NavButtonProps> = ({ to, children }) => {
  const navigate = useNavigate()
  return (
    <StyledNavButton onClick={() => navigate(to)}>{children}</StyledNavButton>
  )
}

/*
 * Core Links
 */
export const CanvasPageLinkBasic: React.FC = () => (
  <NavButton to={`${Paths.CANVAS}${SubPage.BASIC}`}>
    Canvas basics, the display area, width and height, lowestViewableValue and
    highestViewableValue and the margins
  </NavButton>
)
export const CanvasPageLinkOrthogonal: React.FC = () => (
  <NavButton to={`${Paths.CANVAS}${SubPage.ORTHOGONAL}`}>
    The Othogonal canvas
  </NavButton>
)
export const CanvasPageLinkRadial: React.FC = () => (
  <NavButton to={`${Paths.CANVAS}${SubPage.RADIAL}`}>
    The Radial canvas
  </NavButton>
)
export const CanvasPageLinkPlotted: React.FC = () => (
  <NavButton to={`${Paths.CANVAS}${SubPage.PLOTTED}`}>
    The Plotted canvas
  </NavButton>
)
export const CanvasPageLinkConfig: React.FC = () => (
  <NavButton to={`${Paths.CANVAS}${SubPage.CONFIG}`}>
    Canvas Configuration
  </NavButton>
)
export const CanvasPageLinkEditor: React.FC = () => (
  <NavButton to={`${Paths.CANVAS}${SubPage.EDITOR}`}>
    Canvas try it yourself
  </NavButton>
)
export const EnumPageLink: React.FC = () => (
  <NavButton to={Paths.ENUMS}>QsEnums: listed and demostrated</NavButton>
)
export const ConfigPageLink: React.FC = () => (
  <NavButton to={Paths.CONFIG}>
    How configuration can be applied and relationship between configuration and
    data
  </NavButton>
)
export const GradientPageLink: React.FC = () => (
  <NavButton to={Paths.GRADIENT}>How to use gradients</NavButton>
)

/*
 * Unbound links
 */
export const UnboundLegendPageLink: React.FC = () => (
  <NavButton to={Paths.UNBOUND.LEGEND}>Unbound Legend</NavButton>
)
export const UnboundTextPageLink: React.FC = () => (
  <NavButton to={Paths.UNBOUND.TEXT}>Unbound Text</NavButton>
)

/*
 * Orthogonal links
 */
export const OrthogonalBarsPageLink: React.FC = () => (
  <NavButton to={Paths.ORTHOGONAL.BARS}>Orthogonal Bars</NavButton>
)
export const OrthogonalAreaPageLink: React.FC = () => (
  <NavButton to={Paths.ORTHOGONAL.AREA}>Orthogonal Area</NavButton>
)
export const OrthogonalAxisPageLink: React.FC = () => (
  <NavButton to={Paths.ORTHOGONAL.AXIS}>Orthogonal Axis</NavButton>
)
export const OrthogonalBarGroupPageLink: React.FC = () => (
  <NavButton to={Paths.ORTHOGONAL.BARGROUP}>Orthogonal Bar Group</NavButton>
)
export const OrthogonalBarStackPageLink: React.FC = () => (
  <NavButton to={Paths.ORTHOGONAL.BARSTACK}>Orthogonal Bar Stack</NavButton>
)
export const OrthogonalLinePageLink: React.FC = () => (
  <NavButton to={Paths.ORTHOGONAL.LINE}>Orthogonal Line</NavButton>
)
export const OrthogonalPointsPageLink: React.FC = () => (
  <NavButton to={Paths.ORTHOGONAL.POINTS}>Orthogonal Points</NavButton>
)
export const OrthogonalTextPageLink: React.FC = () => (
  <NavButton to={Paths.ORTHOGONAL.TEXT}>Orthogonal Text</NavButton>
)

/*
 * Plotted links
 */
export const PlottedLinePageLinkDefaults: React.FC = () => (
  <NavButton to={`${Paths.PLOTTED.TEXT}${SubPage.BASIC}`}>
    Plotted Line
  </NavButton>
)
export const PlottedLinePageLinkConfig: React.FC = () => (
  <NavButton to={`${Paths.PLOTTED.TEXT}${SubPage.BASIC}`}>
    Plotted Line
  </NavButton>
)
export const PlottedLinePageLinkEditor: React.FC = () => (
  <NavButton to={`${Paths.PLOTTED.TEXT}${SubPage.BASIC}`}>
    Plotted Line
  </NavButton>
)
export const PlottedTextPageLink: React.FC = () => (
  <NavButton to={Paths.PLOTTED.TEXT}>Plotted Text</NavButton>
)
export const PlottedPointsPageLink: React.FC = () => (
  <NavButton to={Paths.PLOTTED.POINTS}>Plotted Points</NavButton>
)

/**
 * Radial links
 */
export const RadialArcPageLink: React.FC = () => (
  <NavButton to={Paths.RADIAL_ARC.ARC}>Radial Arc</NavButton>
)
export const RadialArcTextPageLink: React.FC = () => (
  <NavButton to={Paths.RADIAL_ARC.TEXT}>Radial Arc Text</NavButton>
)
export const RadialCentroidAreaPageLink: React.FC = () => (
  <NavButton to={Paths.RADIAL_CENTROID.AREA}>Radial Centroid Area</NavButton>
)
export const RadialCentroidAxisPageLink: React.FC = () => (
  <NavButton to={Paths.RADIAL_CENTROID.AXIS}>Radial Centroid Axis</NavButton>
)
export const RadialCentroidLinePageLink: React.FC = () => (
  <NavButton to={Paths.RADIAL_CENTROID.LINE}>Radial Centroid Line</NavButton>
)
export const RadialCentroidPointsPageLink: React.FC = () => (
  <NavButton to={Paths.RADIAL_CENTROID.POINTS}>
    Radial Centroid Points
  </NavButton>
)
export const RadialCentroidSpokesPageLink: React.FC = () => (
  <NavButton to={Paths.RADIAL_CENTROID.SPOKES}>
    Radial Centroid Spokes
  </NavButton>
)
export const RadialCentroidTextPageLink: React.FC = () => (
  <NavButton to={Paths.RADIAL_CENTROID.TEXT}>Radial Centroid Text</NavButton>
)

/*
 * Transition Links
 */
export const RadialTransitionsPageLink: React.FC = () => (
  <NavButton to={Paths.RADIAL.TRANSITIONS}>Radial Transitions</NavButton>
)
export const PlottedTransitionsPageLink: React.FC = () => (
  <NavButton to={Paths.PLOTTED.TRANSITIONS}>Plotted Transitions</NavButton>
)
export const OrthogonalTransitionsPageLink: React.FC = () => (
  <NavButton to={Paths.ORTHOGONAL.TRANSITIONS}>
    Orthogonal Transitions
  </NavButton>
)
