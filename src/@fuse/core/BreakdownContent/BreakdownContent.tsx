import React, { memo, useEffect, useState } from 'react';
import _ from '@lodash';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {
	useGetStaffListQuery,
	useGetStaffItemQuery
} from '@mock-api/api/users-api';
import FuseLoading from '@fuse/core/FuseLoading';
import { Staff } from '../../../app/staff/Staff';
import { useAppDispatch} from 'app/store/hooks';
import { toggleUserEditPopUp } from '../../../app/main/user-edit/UserEditPopSlice';
import { UserEditPop } from '../../../app/main/user-edit/UserEditPop';
import { Avatar } from '@mui/material';
import { Button } from '@mui/base';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';

function BreakdownContent() {
	const [searchText, setSearchText] = useState('');
	const levels = ['部長', '次長', '課長', '社長'];
	const statuses = ['待機中', '現場'];
	const workplaces = ['アマゾン', '水は銀行', 'マイクロソフト'];
	const theads = ['社員番号', '名前(ja)', '名前(en)', '名前(ko)', '役職', '入社日', '勤続年数'];
	function handleSearchText(event) {
		setSearchText(event.target.value);
	}
	const { data, isLoading } = useGetStaffListQuery();

	const [filteredStaff, setFilteredStaff] = useState<Staff[]>(data);
	const [staffIdChecking, setStaffIdChecking] = useState();

	const dispatch = useAppDispatch();

	const handleClick = (staffId) => {
		setStaffIdChecking(staffId);
	};

	const {
		data: staff,
	} = useGetStaffItemQuery(staffIdChecking, {
		skip: !staffIdChecking
	});

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


	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<div className="flex w-full h-full">
			<div className="w-1/5 bg-[#FFFFFF] p-16 border border-gray-200">
				<h1 className="m-[20px]">社員管理</h1>
				<ul>
					<h3 className="m-[20px] text-blue-700 font-bold">役職</h3>
					{levels.map((level, index) => {
						return (
							<li key={index} className="m-[20px]">{level}</li>
						);
					})}
				</ul>

				<ul>
					<h3 className="m-[20px] text-blue-700 font-bold">役職</h3>
					{statuses.map((status,  index) => {
						return (
							<li key={index} className="m-[20px]">{status}</li>
						);
					})}
				</ul>

				<ul>
					<h3 className="m-[20px] text-blue-700 font-bold">役職</h3>
					{workplaces.map((workplace, index) => {
						return (
							<li key={index} className="m-[20px]">{workplace}</li>
						);
					})}
				</ul>
			</div>
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
					<Typography className="ml-20 talign-center">{filteredStaff?.length} / {filteredStaff?.length} 名</Typography>
					<Button className="border-2 w-88 rounded-full bg-blue-800 flex items-center justify-center text-white ml-20 p-7"  type={"button"} >
						<FuseSvgIcon size={20} margin="0 8px" >heroicons-outline:plus</FuseSvgIcon>
						<span className="hidden sm:flex mr-16">Add</span></Button>
				</div>
				<hr />
				<div>
					<table className="w-full">
						<thead className="bg-gray-200 text-gray-600">
							<tr >
								<th style={{ flex: '1' }}/> {/* Use flex: "1" to take up remaining space */}
							{
								theads.map((thead, index) => {
									return <th className="p-[8px]" key={index} >{thead}</th>;
								})
							}
							</tr>
						</thead>
						<tbody>
						{filteredStaff.map((item) =>
							<tr key={item.staffId} className="border border-gray-200" onClick={() => {
								handleClick(item.id);
								dispatch(toggleUserEditPopUp());
							}}
							>
								<td className="flex justify-left items-center text-center pl-10 py-[3px] ">
									<Avatar title='image' src={item.avatar}  alt='image'/>
								</td>
								<td>{item.staffId}</td>
								<td>
									<ul>
										<li className='font-semibold'>{item.japanName}</li>
										<li>{item.katakanaName}</li>
									</ul>
								</td>
								<td>{item.englishName}</td>
								<td>{item.koreanName}</td>
								<td>{item.position}</td>
								<td>{item.joinedDate}</td>
								<td>{new Date().getFullYear() - parseInt(item.joinedDate.slice(0, 4)) + " years"}</td>
							</tr>
						)}
						</tbody>

					</table>
				</div>
				<UserEditPop data={staff} />
				<hr />
			</div>
		</div>
	);
}




export default memo(BreakdownContent);
