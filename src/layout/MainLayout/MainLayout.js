import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Breadcrumbs from '../../components/extended/Breadcrumbs';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Customization from '../Customization';
import navigation from '../../menu-items/menuItems';
import { drawerWidth } from '../../store/constant';
import { SET_MENU } from '../../store/actions/actions';
import { IconChevronRight } from "@tabler/icons-react";
import Welcome from "../../view/common/unauthen/Welcome";
import jwtDecode from 'jwt-decode'; // Import the JWT decoding library

// assets

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    // Handle left drawer
    const leftDrawerOpened = useSelector((state) => state.customization.opened);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLeftDrawerToggle = () => {
        dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
    };

    // Utility function to retrieve and validate the access token
    const getAccessToken = () => {
        const accessToken = Cookies.get('accessToken');

        if (!accessToken) {
            // Access token is not available, redirect to login page or handle accordingly
            navigate('auth/login');
            return null;
        }

        // Decode the access token
        try {
            const decodedToken = jwtDecode(accessToken);
            const { role } = decodedToken;

            // Additional client-side validation for the role
            if (role !== 'admin' && role !== 'tenant' && role !== 'poc') {
                navigate('/error'); // Invalid role, redirect to an error page or handle accordingly
                return null;
            }
            return accessToken;
        } catch (error) {
            // Invalid token, redirect to login page or handle accordingly
            navigate('auth/login');
            return null;
        }
    };

    const accessToken = getAccessToken();

    const isAccessTokenExpired = () => {
        const accessToken = Cookies.get('accessToken');

        if (!accessToken) {
            // Access token is not available
            return true;
        }

        try {
            const decodedToken = jwtDecode(accessToken);
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

            return decodedToken.exp < currentTime; // Compare expiration time with current time
        } catch (error) {
            // Invalid token
            return true;
        }
    };

    // Function to remove the access token from Cookies
    const removeAccessToken = () => {
        Cookies.remove('accessToken');
        Cookies.remove('user');
    };

// Example usage: Check if the access token has expired and remove it if expired
    if (isAccessTokenExpired()) {
        removeAccessToken();
    }

    return (
        <>
            {!accessToken ? (<Welcome />) : (<Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {/* header */}
                <AppBar
                    enableColorOnDark
                    position="fixed"
                    color="inherit"
                    elevation={0}
                    sx={{
                        bgcolor: theme.palette.background.default,
                        transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                    }}
                >
                    <Toolbar>
                        <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
                    </Toolbar>
                </AppBar>

                {/* drawer */}
                <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened}
                    drawerToggle={handleLeftDrawerToggle} />

                {/*/!* main content *!/*/}
                <Main theme={theme} open={leftDrawerOpened}>
                    {/* breadcrumb */}
                    <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
                    <Outlet />
                </Main>
                <Customization />
            </Box>)}
        </>
    );
};

export default MainLayout;
