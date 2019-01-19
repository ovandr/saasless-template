import blue from '@material-ui/core/colors/blue';
import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  palette: {
    type: 'light',
    primary: blue
  },
  typography: {
    fontSize: 14,
    useNextVariants: true,
  },
  spacing: {
    unit: 6
  }
});
