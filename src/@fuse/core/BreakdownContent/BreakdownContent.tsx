import React, { memo, useEffect, useState } from 'react';
import _ from '@lodash';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import { Staff } from '../../../app/staff/Staff';
import { useAppDispatch} from 'app/store/hooks';
import { toggleUserEditPopUp } from '../../../app/main/user-edit/UserEditPopSlice';
import { UserEditPop } from '../../../app/main/user-edit/UserEditPop';
import { Avatar } from '@mui/material';
import { Button } from '@mui/base';
import StaffNavigationShortcuts from 'app/theme-layouts/shared-components/navigation/StaffNavigationShortcuts';
import { useLeftSidebar } from '@fuse/core/FuseShortcuts/FuseShortcuts';
import {
	useGetStaffListQuery,
	useGetStaffItemQuery
} from '@mock-api/api/users-api';

const theads = ['名前(ja)', '名前(en)', '名前(ko)', '役職', '入社日', '勤続年数'];

function BreakdownContent() {
	const [searchText, setSearchText] = useState('');
	const [sortAscending, setSortAscending] = useState(true);
	function handleSearchText(event) {
		setSearchText(event.target.value);
	}
	const { data, isLoading } = useGetStaffListQuery();
	const [filteredStaff, setFilteredStaff] = useState<Staff[]>(data);
	const [staffIdChecking, setStaffIdChecking] = useState();
	const [sidebarFilterValues, setSidebarFilterValues] = useState('');

	const dispatch = useAppDispatch();

	const handleClick = (staffId) => {
		setStaffIdChecking(staffId);
	};

	const leftSidebarOpen = useLeftSidebar();

	const {
		data: staff,
	} = useGetStaffItemQuery(staffIdChecking, {
		skip: !staffIdChecking
	});

	useEffect(() => {
		if (filteredStaff && filteredStaff.length > 0) {
			const sortedStaff = sortAscending ? [...filteredStaff].sort((a, b) => a.staffId - b.staffId) :
				[...filteredStaff].sort((a, b) => b.staffId - a.staffId);
			setFilteredStaff(sortedStaff);
		} else {
			setFilteredStaff([]);
		}
	}, [sortAscending]);

	useEffect(() => {
		function getFilteredArray() {
			if (data && searchText.length === 0) {
				return data;
			}
			return _.filter(data, (item) => {
				return item.englishName.toLowerCase().includes(searchText.toLowerCase());
			});
		}

		if (data) {
			setFilteredStaff(getFilteredArray());
		}
	}, [data, searchText]);

	useEffect(() => {
		function positionFilter() {
			if(!(sidebarFilterValues && data)) {
				return data;
			}
			return _.filter(data, (item) => {
				return checkFieldsForObject(item, sidebarFilterValues)});
		}
		setFilteredStaff(positionFilter());
	}, [sidebarFilterValues]);

	const handleFilterChange = (newFilter) => {
		setSidebarFilterValues(newFilter);
	};

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<div className="flex w-full h-full">
			{leftSidebarOpen.leftSidebarOpen === true && 
				<StaffNavigationShortcuts 
					onFilterChange={handleFilterChange} 
					data={data} />
			}
			<div className="w-full bg-white">
				<div className="flex items-center m-20 px-16">
					<Paper className="flex p-4 items-center w-1/3 py-4 border-1 h-40 rounded-full shadow-none">
						<FuseSvgIcon
							color="action"
							size={20}
						>
							heroicons-solid:search
						</FuseSvgIcon>
						<input
							placeholder="Search by name or employee number"
							className="px-5 w-full"
							value={searchText}
							onChange={handleSearchText}
						/>
					</Paper>
					<Typography
						className="ml-20 talign-center"
					>
						{filteredStaff?.length} / {filteredStaff?.length} 名
					</Typography>
					<Button 
						className="border-2 w-88 rounded-full bg-blue-800 flex items-center justify-center text-white ml-20 p-7"  
					>
						<FuseSvgIcon
							size={20} 
							margin="0 7px"
						>
							heroicons-outline:plus
						</FuseSvgIcon>
						<span className="hidden sm:flex mr-16">Add</span>
					</Button>
				</div>
				<hr />
				<div>
					<table className="w-full">
						<thead className="bg-gray-200 text-gray-600 ">
							<tr >
								<th style={{ flex: '1' }} className="px-20"/> {/* Use flex: "1" to take up remaining space */}
								<th className="px-18 flex">
									<span>社員番号</span>
									<button 
										onClick={() => {
										setSortAscending(!sortAscending);}}
									>
										{sortAscending ? '↑' : '↓'}
									</button>
								</th>
							{
								theads.map((thead, index) => {
									return <th 
										key={index} 
										className="px-20 text-justify"
									>
										{thead}
									</th>;
								})
							}
							</tr>
						</thead>
						<tbody>
						{filteredStaff?.map((item) =>
							<tr 
								key={item.staffId} className="border border-gray-200" 
								onClick={() => {
									handleClick(item.id);
									dispatch(toggleUserEditPopUp());}}
							>
								<td className="flex justify-left items-center text-center pl-10 py-[3px] px-20 " >
									<Avatar
										title='image'
										src={item.avatar}  alt='image'
									/>
								</td>
								<td className="px-20">{item.staffId}</td>
								<td className="px-20">
									<ul>
										<li 
											className='font-semibold'
										>
											{item.japanName}
										</li>
										<li>{item.katakanaName}</li>
									</ul>
								</td>
								<td className="px-20">{item.englishName}</td>
								<td className="px-20">{item.koreanName}</td>
								<td className="px-20">{item.position}</td>
								<td className="px-20">{item.joinedDate}</td>
								<td className="px-20">
									{new Date().getFullYear() - parseInt(item.joinedDate.slice(0, 4)) + " years"}
								</td>
							</tr>
						)}
						</tbody>
					</table>
				</div>
				<UserEditPop data={staff} />
			</div>
		</div>
	);
}

function checkFieldsForObject(obj, valueToCheck) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (obj[key] === valueToCheck) {
				return obj;
			}
		}
	}
}

export default memo(BreakdownContent);
