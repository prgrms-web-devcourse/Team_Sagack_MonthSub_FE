const color = {
  mainLight: '#ffefde',
  main: '#ffb15c',
  sub: '#041b2d',
  greyLight: '#f2f2f2',
  grey: '#dbdbdb',
  greyMedium: '#bdbdbd',
  greyDark: '#4b4b4b',
  red: '#e00000',
};

const font = {
  small: '0.875rem',
  base: '1rem',
  medium: '1.125rem',
  large: '1.5rem',
  xLarge: '2rem',
};

const style = {
  boxShadow: '0 0.1875rem 0.3125rem 0 rgba(50, 50, 93, 0.15)',
};

const common = {
  navHeight: '5rem',
};

const deviceSizes = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1140px',
};

const device = {
  laptop: `screen and (min-width: ${deviceSizes.laptop}}`,
  tablet: `screen and (min-width:${deviceSizes.tablet}) and (max-width: ${
    deviceSizes.laptop - 1
  })`,
  mobileL: `screen and (min-width:${deviceSizes.mobile}) and (max-width: ${
    deviceSizes.tablet - 1
  })`,
  mobileS: `screen and (max-width: ${deviceSizes.mobile - 1}}`,
};

const theme = {
  color,
  font,
  style,
  device,
  common,
};

export default theme;
