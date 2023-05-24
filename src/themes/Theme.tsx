import { createTheme, Theme } from '@mui/material/styles';
import colors from '../assets/scss/themes-vars.module.scss';
import themePalette from './palette';
import componentStyleOverrides from './componentStyleOverride';
import themeTypography from "./typography";
import {JsonObject} from "type-fest";


/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization: JsonObject): import('@mui/material/styles').Theme => {
    const color = colors;

    const themeOption = {
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
        customization,
    };

    const themeOptions: import('@mui/material/styles').ThemeOptions = {
        direction: 'ltr',
        palette: themePalette(themeOption),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px',
                },
            },
        },
        typography: themeTypography(themeOption),
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themeOption);

    return themes;
};

export default theme;

