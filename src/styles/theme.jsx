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
  mobile: 480,
  tablet: 768,
  laptop: 1140,
};

const device = {
  laptop: `screen and (min-width: ${deviceSizes.laptop}px)`,
  tablet: `screen and (max-width: ${deviceSizes.laptop - 0.1}px)`,
  mobile: `screen and (max-width: ${deviceSizes.tablet - 0.1}px)`,
  mobileS: `screen and (max-width: ${deviceSizes.mobile - 0.1}px)`,
};

const detailedMobile = {
  tablet: `screen and (max-width: ${
    deviceSizes.laptop - 0.1
  }px) and (min-width: ${deviceSizes.tablet}px)`,
  mobileL: `screen and (max-width: ${
    deviceSizes.tablet - 0.1
  }px) and (min-width: ${deviceSizes.mobile}px)`,
  mobileS: `screen and (max-width: ${deviceSizes.mobile - 0.1}px)`,
};

const standardValues = {
  card: {
    maxWidth: '330px',
    margin: '20px',
    maxCount: {
      top: 4,
      tab: 3,
      mobL: 2,
      mobS: 1,
    },
  },
  userList: {
    maxCount: 10,
    size: '5rem',
  },
  banner: {
    maxCount: {
      top: 5,
      tab: 3,
      mobL: 2,
      mobS: 1,
    },
  },
}

const theme = {
  color,
  font,
  style,
  common,
  device,
  detailedMobile,
  standardValues,
};

export default theme;
