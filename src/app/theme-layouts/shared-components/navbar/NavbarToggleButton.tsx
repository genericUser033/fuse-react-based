import { useAppDispatch} from 'app/store/hooks';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import React, { useState } from 'react';
import { IconButton, ListItemIcon, ListItemText, Popover } from '@mui/material';
import { Link } from 'react-router-dom';
import useAuth from '../../../auth/useAuth';
import MenuItem from '@mui/material/MenuItem';

type NavbarToggleButtonProps = {
	className?: string;
	children?: React.ReactNode;
};
/**
 * The navbar toggle button.
 */
function NavbarToggleButton(props: NavbarToggleButtonProps) {
	const { signOut } = useAuth();

	const {
		className = '',
		children = (
			<FuseSvgIcon
				size={20}
				color="action"
			>
				heroicons-outline:user-circle
			</FuseSvgIcon>
		)
	} = props;
	useAppDispatch();
	useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

	const [userMenu, setUserMenu] = useState<HTMLElement | null>(null);

	const handleClick = (event) => {
		setUserMenu(event.currentTarget);
	};

	const handleClose = () => {
		setUserMenu(null);
	};

	return (
		<div>
			<IconButton onClick={handleClick}>
				<FuseSvgIcon>heroicons-outline:user-circle</FuseSvgIcon>
			</IconButton>
			<Popover
				open={Boolean(userMenu)}//if anchorEl is not null
				anchorEl={userMenu}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				classes={{
					paper: 'py-8',
				}}
			>
				<MenuItem
					component={Link}
					to="/apps/profile"
					onClick={handleClose}
					role="button"
				>
					<ListItemIcon className="min-w-40">
						<FuseSvgIcon>heroicons-outline:user-circle</FuseSvgIcon>
					</ListItemIcon>
					<ListItemText primary="My Profile" />
				</MenuItem>

				<MenuItem onClick={() => signOut()}>
					<ListItemIcon>
						<FuseSvgIcon>heroicons-outline:logout</FuseSvgIcon>
					</ListItemIcon>
					<ListItemText primary="Sign out" />
				</MenuItem>
			</Popover>
		</div>
	);
}

export default NavbarToggleButton;
