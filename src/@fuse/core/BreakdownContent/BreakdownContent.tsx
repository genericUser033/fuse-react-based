import React, { memo, useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import {
	useGetStaffListQuery
} from '@mock-api/api/users-api';
import FuseLoading from '@fuse/core/FuseLoading';

function BreakdownContent() {
	const [searchText, setSearchText] = useState('');
	const levels = ['部長', '次長', '課長', '社長'];
	const statuses = ['待機中', '現場'];
	const workplaces = ['アマゾン', '水は銀行', 'マイクロソフト'];
	const theads = ['社員番号', '名前(ja)', '名前(en)', '名前(ko)', '役職', '入社日', '勤続年数'];
	function handleSearchText(event: React.ChangeEvent<HTMLInputElement>) {
		setSearchText(event.target.value);
	}

	const { data, isLoading } = useGetStaffListQuery();

	console.log("data", data);

	if (isLoading) {
		return <FuseLoading />;
	}

	return (
		<div className="flex w-full h-full">
			<div className="w-1/4 bg-[#FFFFFF] p-20 border border-gray-200">
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
							className="px-6 w-full"
							value={searchText}
							onChange={handleSearchText}
						/>
					</Paper>
					<Typography className="ml-20 talign-center">40 / 40 名</Typography>
					<button className="border-2 w-60 rounded-lg bg-blue-900 flex items-center justify-center text-white ml-20"  type={"button"} >
						<span className="text-2xl">+</span>
						Add</button>
				</div>
				<hr />
				<div>
					<table className=" w-full">
						<thead>
							<tr className="bg-gray-200 text-gray-600">
							{
								theads.map((thead, index) => {
									return <th className="p-[8px]" key={index} >{thead}</th>;
								})
							}
							</tr>
						</thead>
						<tbody>
						{
							data.map((record, index) =>  {
							return (<tr className="border border-gray-200">
								<td key={index} className="w-full flex justify-stretch text-center pt-[10px]">
									<div className="w-1/2 ">{record.avatar}</div>
									<div className="w-full">{record.staffId}</div>
								</td>
								<td>
									<ul>
										<li className='font-semibold'>{record.japanName}</li>
										<li>{record.katakanaName}</li>
									</ul>
								</td>
								<td>{record.englishName}</td>
								<td>{record.koreanName}</td>
								<td>{record.position}</td>
								<td>{record.joinedDate}</td>
								<td>{record.yearsOfWork}</td>
							</tr>)
						})
						}

						</tbody>
					</table>
				</div>
				<hr />
			</div>
		</div>
	);
}

export default memo(BreakdownContent);
