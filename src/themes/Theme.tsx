import { createTheme, Theme } from '@mui/material/styles';
import colors from '../assets/css/themes-vars.module.css';
import themePalette from './palette';
import componentStyleOverrides from './componentStyleOverride';


/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

interface ThemeOption {
    colors: Record<string, string>;
    heading: string;
    paper: string;
    backgroundDefault: string;
    background: string;
    darkTextPrimary: string;
    darkTextSecondary: string;
    textDark: string;
    menuSelected: string;
    menuSelectedBack: string;
    divider: string;
    customization: Record<string, any>;
}

interface ThemeOptions {
    direction: 'ltr' | 'rtl';
    palette: ReturnType<typeof themePalette>;
    mixins: {
        toolbar: {
            minHeight: string;
            padding: string;
            '@media (min-width: 600px)': {
                minHeight: string;
            };
        };
    };
}

const theme = (customization: Record<string, any>): Theme => {
    const color = colors;

    const themeOption: ThemeOption = {
        colors: color,
        heading: color.grey900,
        paper: color.paper,
        backgroundDefault: color.paper,
        background: color.primaryLight,
        darkTextPrimary: color.grey700,
        darkTextSecondary: color.grey500,
        textDark: color.grey900,
        menuSelected: color.secondaryDark,
        menuSelectedBack: color.secondaryLight,
        divider: color.grey200,
        customization
    };

    const themeOptions: ThemeOptions = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
    };

    const themes: Theme = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default theme;

