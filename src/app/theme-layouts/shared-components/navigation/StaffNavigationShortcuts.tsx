import React from 'react';

const StaffNavigationShortcuts = ({ onFilterChange, data }) => {
	const levels = [...new Set(data?.map(staff => staff.position))];
	const statuses = [...new Set(data?.map(staff => staff.status))];
	const workplaces = [...new Set(data?.map(staff => staff.workplace))];

	return (
		<div className="w-1/5 bg-[#FFFFFF] p-16 border border-gray-200">
			<h1 className="m-[20px]">社員管理</h1>
			<ul>
				<h3 className="m-[20px] text-blue-700 font-bold">役職</h3>
				{levels.map((level, index) => {
					return (
						<button
							key={index}
							className="mx-[20px] my-[10px] block"
							onClick={() =>onFilterChange(level)}
						>
							{level}
						</button>
					);
				})}
			</ul>

			<ul>
				<h3 className="m-[20px] text-blue-700 font-bold">役職</h3>
				{
					statuses.map((status, index) => {
					return (
						<button
							key={index}
							className="mx-[20px] my-[10px] block"
							onClick={() =>onFilterChange(status)}
						>
							{status}
						</button>
					);
				})}
			</ul>
			<ul>
				<h3 className="m-[20px] text-blue-700 font-bold">役職</h3>
				{
					workplaces.map((workplace, index) => {
					return (
						<button
							key={index}
							className="mx-[20px] my-[10px] block"
							onClick={() =>onFilterChange(workplace)}
						>
							{workplace}
						</button>
					);
				})}
			</ul>
		</div>
	)
}

export default StaffNavigationShortcuts;