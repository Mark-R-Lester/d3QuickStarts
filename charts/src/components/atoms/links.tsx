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

const NavButton: React.FC<NavButtonProps> = ({ to, children }) => {
  const navigate = useNavigate()
  return (
    <StyledNavButton onClick={() => navigate(to)}>{children}</StyledNavButton>
  )
}

/*
 * Core Links
 */
export const CanvasPageLink: React.FC = () => (
  <NavButton to={Paths.CANVAS}>Genral canvas overview</NavButton>
)
export const EnumPageLink: React.FC = () => (
  <NavButton to={Paths.ENUMS}>QsEnums: listed and demostrated</NavButton>
)
export const ConfigPageLink: React.FC = () => (
  <NavButton to={Paths.CONFIG}>
    The relationship between configuration and data
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
  <NavButton to={`${Paths.PLOTTED.TEXT}?subPage=default`}>
    Plotted Line
  </NavButton>
)
export const PlottedLinePageLinkConfig: React.FC = () => (
  <NavButton to={`${Paths.PLOTTED.TEXT}?subPage=config`}>
    Plotted Line
  </NavButton>
)
export const PlottedLinePageLinkEditor: React.FC = () => (
  <NavButton to={`${Paths.PLOTTED.TEXT}?subPage=editor`}>
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
