import { styled } from '@mui/material/styles';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

const Root = styled('div')(({ theme }) => ({
	'& > .logo-icon': {
		transition: theme.transitions.create(['width', 'height'], {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	},
	'& > .badge': {
		transition: theme.transitions.create('opacity', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	}
}));

/**
 * The logo component.
 */
function Logo() {
	return (
		<Root className="flex items-center">

			<img
				style={{ backgroundImage: 'none', background: '#111827' }}
				className="logo-icon h-32"
				src="assets/icons/35d775_9e2790f0b5a44f4b982533664fb8133f~mv2.png"
				alt="logo"
			/>
			<div className="flex items-center ml-48">
				<FuseSvgIcon size={20}>heroicons-outline:bell</FuseSvgIcon>
			</div>
		</Root>
	);
}

export default Logo;
