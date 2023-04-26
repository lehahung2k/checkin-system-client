/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme: any) {
    // Get the colors from the theme object.
    const colors = theme?.colors;

    // Create a palette object.
    const palette = {
        mode: theme?.customization?.navType,
        common: {
            black: colors?.darkPaper
        },
        primary: {
            light: colors?.primaryLight,
            main: colors?.primaryMain,
            dark: colors?.primaryDark,
            200: colors?.primary200,
            800: colors?.primary800
        },
        secondary: {
            light: colors?.secondaryLight,
            main: colors?.secondaryMain,
            dark: colors?.secondaryDark,
            200: colors?.secondary200,
            800: colors?.secondary800
        },
        error: {
            light: colors?.errorLight,
            main: colors?.errorMain,
            dark: colors?.errorDark
        },
        orange: {
            light: colors?.orangeLight,
            main: colors?.orangeMain,
            dark: colors?.orangeDark
        },
        warning: {
            light: colors?.warningLight,
            main: colors?.warningMain,
            dark: colors?.warningDark
        },
        success: {
            light: colors?.successLight,
            200: colors?.success200,
            main: colors?.successMain,
            dark: colors?.successDark
        },
        grey: {
            50: colors?.grey50,
            100: colors?.grey100,
            500: colors?.darkTextSecondary,
            600: colors?.heading,
            700: colors?.darkTextPrimary,
            900: colors?.textDark
        },
        dark: {
            light: colors?.darkTextPrimary,
            main: colors?.darkLevel1,
            dark: colors?.darkLevel2,
            800: colors?.darkBackground,
            900: colors?.darkPaper
        },
        text: {
            primary: colors?.darkTextPrimary,
            secondary: colors?.darkTextSecondary,
            dark: colors?.textDark,
            hint: colors?.grey100
        },
        background: {
            paper: colors?.paper,
            default: colors?.backgroundDefault
        }
    };

    // Return the palette object.
    return palette;
}