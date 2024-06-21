import IconButton from '@mui/material/IconButton';
import clsx from 'clsx';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import FuseSvgIcon from '../FuseSvgIcon';
import { FuseFlatNavItemType } from '../FuseNavigation/types/FuseNavItemType';
import { useThemeMediaQuery } from '@fuse/hooks';

type FuseShortcutsProps = {
	className?: string;
	navigation: FuseFlatNavItemType[];
	onChange: (T: string[]) => void;
	shortcuts?: string[];
	variant?: 'horizontal' | 'vertical';
};

/**
 * The FuseShortcuts component is responsible for rendering a list of shortcuts based on the navigation and shortcuts props.
 * It uses various MUI components to render the list items and search input.
 * The component is memoized to prevent unnecessary re-renders.
 */
const LeftSidebarContext = createContext({});

export const LeftSidebarProvider = ({ children }) => {
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const [leftSidebarOpen, setLeftSidebarOpen] = useState(!isMobile);
	useEffect(() => {
		setLeftSidebarOpen(!isMobile);
	}, [isMobile]);

	useEffect(() => {
		if (isMobile) {
			setLeftSidebarOpen(false);
		}
	}, [location, isMobile]); // Assuming location is defined somewhere

	return (
		<LeftSidebarContext.Provider value={{ leftSidebarOpen, setLeftSidebarOpen }}>
			{children}
		</LeftSidebarContext.Provider>
	);
};
export const useLeftSidebar = () => useContext(LeftSidebarContext);

function FuseShortcuts(props: FuseShortcutsProps) {
	const { variant = 'horizontal', className = '' } = props;
	useRef<HTMLInputElement>(null);
	const {leftSidebarOpen, setLeftSidebarOpen } = useLeftSidebar();
	return (useMemo(() => {
		return (
			<div className={clsx('flex flex-1', variant === 'vertical' && 'flex-col')}>
				<IconButton
					className="h-40 w-40 p-0"
					aria-haspopup="true"
					onClick={() => {
						setLeftSidebarOpen(prevState => !prevState); // Toggle leftSidebarOpen
					}}
					size="large"
				>
					<FuseSvgIcon>heroicons-solid:view-list</FuseSvgIcon>
				</IconButton>
			</div>
		);
	}, [variant, leftSidebarOpen]))
}

export default FuseShortcuts;
