import PropTypes from 'prop-types';
import { forwardRef, ForwardedRef, CSSProperties, ReactNode, useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// ==============================|| CUSTOM SUB CARD ||============================== //

interface SubCardProps {
    children: ReactNode;
    content?: boolean;
    contentClass?: string;
    darkTitle?: boolean;
    secondary?: ReactNode | string | object | any;
    sx?: CSSProperties;
    contentSX?: CSSProperties;
    title?: ReactNode | string | object | any;
}

const SubCard = forwardRef(function SubCard(
    {
        children,
        content = true,
        contentClass,
        darkTitle,
        secondary,
        sx = {},
        contentSX = {},
        title,
        ...others
    }: SubCardProps,
    ref: ForwardedRef<HTMLDivElement>
) {
    const theme = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= theme.breakpoints.values.sm);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [theme.breakpoints.values.sm]);

    return (
        <Card
            ref={ref}
            sx={{
                border: '1px solid',
                borderColor: theme.palette.primary.light,
                ':hover': {
                    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 10%)',
                },
                ...sx,
            }}
            {...others}
        >
            {/* card header and action */}
            {!darkTitle && title && (
                <CardHeader
                    sx={{ p: 2.5, backgroundColor: theme.palette.secondary.light }}
                    title={<Typography variant="h4"><b>{title}</b></Typography>}
                    action={isMobile ? null : secondary}
                />
            )}
            {darkTitle && title && (
                <CardHeader
                    sx={{ p: 2.5 }}
                    title={<Typography variant="h4">{title}</Typography>}
                    action={isMobile ? null : secondary}
                />
            )}

            {/* content & header divider */}
            {title && (
                <Divider
                    sx={{
                        opacity: 1,
                        borderColor: theme.palette.primary.light,
                    }}
                />
            )}

            {/* card content */}
            {content && (
                <CardContent sx={{ p: 2.5, ...contentSX }} className={contentClass || ''}>
                    {isMobile && secondary}
                    {children}
                </CardContent>
            )}
            {!content && children}
        </Card>
    );
});

SubCard.propTypes = {
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    sx: PropTypes.object,
    contentSX: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
};

SubCard.defaultProps = {
    content: true,
};

export default SubCard;
