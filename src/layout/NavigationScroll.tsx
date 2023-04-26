import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationScrollProps {
  children?: ReactNode;
}

// ==============================|| NAVIGATION SCROLL TO TOP ||============================== //

const NavigationScroll = ({ children }: NavigationScrollProps): JSX.Element | null => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return (
    <>
        {children}
    </>
    )
};

NavigationScroll.propTypes = {
  children: PropTypes.node
};

export default NavigationScroll;
