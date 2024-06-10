import React from 'react';

type StaffNavigationShortcutsProps = {
	leftSideBarOpen?: boolean;
};

const StaffNavigationShortcuts = (props: StaffNavigationShortcutsProps) => {
	const levels = ['部長', '次長', '課長', '社長'];
	const statuses = ['待機中', '現場'];
	const workplaces = ['アマゾン', '水は銀行', 'マイクロソフト'];

	return (
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
	)
}

export default StaffNavigationShortcuts;