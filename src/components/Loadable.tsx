import { Suspense, ReactElement } from 'react';

// project imports
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = <P extends Record<string, unknown>>(
    Component: React.ComponentType<P>
): ((props: P) => ReactElement | null) => (
    props: P
): ReactElement | null => (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;
