import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        type: 'dark',
        text: {
            primary: '#b7b9bc',
        },
        background: {
            paper: '#19212b',
            default: '#19212b',
        },
    },
    typography: {
        useNextVariants: true,
    },
});
