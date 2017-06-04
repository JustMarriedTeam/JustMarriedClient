import {
    red300,
  lightGreen200,
    cyan500,
    cyan700,
    pinkA200,
    grey100,
    grey300,
    grey400,
    grey500,
    white,
    darkBlack,
    fullBlack,
} from 'material-ui/styles/colors';
import spacing from './spacing.js';
import { fade } from './utils/colorUtils';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default getMuiTheme({
  appBar: {
    height: 50,
  },
  spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: red300,
    primary2Color: lightGreen200,
    primary3Color: lightGreen200,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
});
