import { createMuiTheme } from '@material-ui/core/styles';

const theme = {
    palette: {
        common: {
            black: '#000',
            white: '#fff',
            lightGray: '#E0E0E0',
            extraLightGray: '#EDEDED',
            greenHighlight: '#AFFF96'
        },
        background: { paper: '#fff', default: '#fafafa' },
        primary: {
            main: '#152857',
            dark: '#0D172F',
            light: '#2551C4',
            contrastText: '#fff'
        },
        secondary: {
            light: '#E0E1E9',
            main: '#838AA7',
            contrastText: '#fff'
        },
        error: {
            main: '#F25C3A',
            dark: '#a94028',
            light: '#f47c61',
            contrastText: '#FFFFFF'
        },
        text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.70)',
            hint: 'rgba(0, 0, 0, 0.38)'
        },
    },
    typography: {
        fontFamily: 'Poppins, Roboto, Arial, sans-serif'
    }
};

export default createMuiTheme(theme);