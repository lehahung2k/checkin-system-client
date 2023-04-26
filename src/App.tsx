import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import themes from './themes/Theme';
import NavigationScroll from './layout/NavigationScroll';


// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state: any) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            {/* <ThemeProvider theme={themes(customization)}> */}
                <CssBaseline />
                <NavigationScroll>
                    Hello
                </NavigationScroll>
            {/* </ThemeProvider> */}
        </StyledEngineProvider>
    );
};

export default App;