import { useAppDispatch, useAppSelector } from 'app/store/hooks';
import { selectUserEditPopUpOpen, toggleUserEditPopUp } from './UserEditPopSlice';
import { motion } from 'framer-motion';
import { SwipeableDrawer, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { SyntheticEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

const StyledSwipeableDrawer = styled(SwipeableDrawer)(() => ({
	'& .MuiDrawer-paper': {
		width: 550
	}
}));

export const UserEditPop = (props) => {
	const {data} = { ...props };
	const [selectedTab, setSelectedTab] = useState(0);

	function handleTabChange(event: SyntheticEvent, value: number) {
		setSelectedTab(value);
	}

	const dispatch = useAppDispatch();
	const open = useAppSelector(selectUserEditPopUpOpen);

	const useStyles = makeStyles({
		activeTab: {
			color: 'blue',
			borderBottom: '3px solid rgba(0, 0, 128, 0.5)',
		},
	});

	useEffect(() => {
		if(!open) {
			setSelectedTab(0);
		}
	}, [open])

	const classes = useStyles();

	return (
		<StyledSwipeableDrawer
			open={open}
			anchor="right"
			onOpen={() => {}}
			onClose={() => dispatch(toggleUserEditPopUp())}
			disableSwipeToOpen
		>
			<div className="h-full">
				<div className="flex flex-col w-full h-300" style={{ backgroundColor: '#292E5F', minHeight: '120px' }}>
					{/* No content */}
				</div>
				<div className="flex items-center max-w-5xl w-full mx-auto px-32 lg:h-72">
					<div className="-mt-96 lg:-mt-88 rounded-full">
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1, transition: { delay: 0.1 } }}
						>
							<Avatar
								sx={{ borderColor: 'background.paper' }}
								className="w-128 h-128 border-2"
								src={data?.avatar }
								alt="User avatar"
							/>
						</motion.div>
					</div>
					<div className="flex flex-grow justify-end items-center mr-20">
						<button className='flex border border-1 rounded-3xl pr-[15px] py-[5px] text-sm'><FuseSvgIcon className='mr-8  mx-[15px]'>heroicons-outline:pencil-alt</FuseSvgIcon>編集</button>
					</div>
				</div>
				<div className="flex-wrap" />
				<div className="flex items-center ml-60 mb-16">
					<Typography className="text-2xl font-bold leading-none mr-32">{data?.japanName }</Typography>
					<Typography className="text-2xl font-bold leading-none">{data?.katakanaName }</Typography>
				</div>
				<div className="flex flex-1 justify-start ml-20 my-20 lg:my-0">
					<Tabs
						value={selectedTab}
						onChange={handleTabChange}
						indicatorColor="primary"
						textColor="inherit"
						variant="scrollable"
						scrollButtons={false}
						className="-mx-4 min-h-40"
						classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
						TabIndicatorProps={{
							children: (
								<Box
									className="w-full h-full rounded-full opacity-20"
								/>
							)
						}}
					>
						<Tab
							className={`${selectedTab === 0 ? classes.activeTab : ''} text-14 font-medium mx-8 px-12`}
							disableRipple
							label="基本情報"
						/>
						<Tab
							className={`${selectedTab === 1 ? classes.activeTab : ''} text-14 font-medium mx-8 px-12`}
							disableRipple
							label="現場情報"
						/>
					</Tabs>
				</div>
				<hr className={`mt-[2px]`} />
				{selectedTab === 0 ?
					<div className="tab1　flex m-[20px]">
						<div className="flex m-[24px] mr-20">
							<div className="w-1/3">社員番号</div>
							<div>{data?.staffId}</div>
						</div>
						<div className="flex m-[24px]">
							<div className="w-1/3">E-Mail</div>
							<div>{data?.avatar}</div>
						</div>
						<div className="flex m-[24px]">
							<div className="w-1/3">名前</div>
							<div>{data?.japanName}</div>
						</div>
						<div className="flex m-[24px]">
							<div className="w-1/3">役職</div>
							<div>{data?.position}</div>
						</div>
						<div className="flex m-[24px]">
							<div className="w-1/3">入社日</div>
							<div>{data?.joinedDate}</div>
						</div>
					</div>
					:
					<div className="tab1　flex m-[20px] items-center">
						<div className="flex m-[20px] mr-20">
							<FuseSvgIcon size={20} color='gray' marginRight='20px'>heroicons-outline:menu-alt-2</FuseSvgIcon>
							<div className="w-2/5">現場名</div>
							<div>{data?.yearsOfWork}</div>
						</div>
						<div className="flex m-[20px]">
							<FuseSvgIcon size={20} color='gray' marginRight='20px'>heroicons-outline:menu-alt-2</FuseSvgIcon>
							<div className="w-2/5">状態</div>
							<div>{data?.koreanName}</div>
						</div>
					</div>
				}
			</div>
		</StyledSwipeableDrawer>
	);
}