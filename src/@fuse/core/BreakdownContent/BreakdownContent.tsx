import React, { memo, useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { Input } from '@mui/base';

function BreakdownContent() {
	const [searchText, setSearchText] = useState('');
	function handleSearchText(event: React.ChangeEvent<HTMLInputElement>) {
		setSearchText(event.target.value);
	}

	return (
		<>
			<div className="flex items-center m-20 px-16">
				<Paper className="flex float-left p-4 items-center w-1/3 py-4 border-1 h-40 rounded-full shadow-none">
					<FuseSvgIcon
						color="action"
						size={20}
					>
						heroicons-solid:search
					</FuseSvgIcon>

					<Input
						placeholder="Search by name or employee number"
						className="flex flex-1 px-6 w-full"
						disableUnderline
						fullWidth
						value={searchText}
						inputProps={{
							'aria-label': 'Search'
						}}
						onChange={handleSearchText}
					/>
				</Paper>
				<Typography className="ml-20 talign-center">40 / 40 名</Typography>
				<button className="border-2 w-60 rounded-lg bg-blue text-white ml-20"  type={"button"} >
					<span className="text-2xl">+</span>
					Add</button>
			</div>
			<hr />
			<table className="text-gray-600 mt-16 mb-12 font-normal">
				<th>社員番号</th>
				<th>名前(ja)</th>
				<th>名前(en)</th>
				<th>名前(ko)</th>
				<th>役職</th>
				<th>入社日</th>
				<th>勤続年数</th>
			</table>
			<hr />
			</>
	);
}

export default memo(BreakdownContent);
