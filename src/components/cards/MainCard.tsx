import { forwardRef, ForwardRefRenderFunction } from 'react';

// material-ui imports...
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

// constant
const headerSX = {
	'& .MuiCardHeader-action': { marginRight: 0 },
};

type MainCardProps = {
	border?: boolean;
	boxShadow?: boolean;
	children?: React.ReactNode;
	content?: boolean;
	contentClass?: string;
	contentSX?: Record<string, any>;
	darkTitle?: boolean;
	secondary?: React.ReactNode | string | object | any;
	shadow?: string;
	sx?: Record<string, any>;
	title?: React.ReactNode; // Update the type to React.ReactNode
};

const MainCard: ForwardRefRenderFunction<HTMLDivElement, MainCardProps> = (
	{
		border = true,
		boxShadow,
		children,
		content = true,
		contentClass = '',
		contentSX = {},
		darkTitle,
		secondary,
		shadow,
		sx = {},
		title,
		...others
	},
	ref
) => {
	const theme = useTheme();

	return (
		<Card
			ref={ref}
			{...others}
			sx={{
				border: border ? '1px solid' : 'none',
				borderColor: theme.palette.primary.light,
				':hover': {
					boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit',
				},
				...sx,
			}}
		>
			{/* card header and action */}
			{title && (
				<CardHeader
					sx={headerSX}
					title={darkTitle ? <Typography variant="h3">{title}</Typography> : title}
					action={secondary}
				/>
			)}

			{/* content & header divider */}
			{title && <Divider />}

			{/* card content */}
			{content && (
				<CardContent sx={contentSX} className={contentClass}>
					{children}
				</CardContent>
			)}
			{!content && children}
		</Card>
	);
};

export default forwardRef<HTMLDivElement, MainCardProps>(MainCard);
