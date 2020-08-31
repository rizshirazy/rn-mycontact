const mainColors = {
  green1: '#0BCAD4',
  green2: '#EDFCFD',
  dark1: '#112340',
  grey1: '#495A75',
  grey2: '#7D8797',
  grey3: '#E9E9E9',
  red1: '#E06379',
  white: '#FFFFFF',
  black: '#000000',
};

export const colors = {
  primary: mainColors.green1,
  secondary: mainColors.dark1,
  disable: mainColors.grey3,
  white: mainColors.white,
  black: mainColors.black,
  text: {
    primary: mainColors.dark1,
    secondary: mainColors.grey1,
  },
  button: {
    primary: {
      background: mainColors.green1,
      text: mainColors.white,
    },
    disabled: {
      background: mainColors.grey3,
      text: mainColors.grey2,
    },
  },
};
