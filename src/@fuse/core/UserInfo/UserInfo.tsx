import { memo } from 'react';
import Avatar from '@mui/material/Avatar';

/**
 * UserInfo is a React component used to render a demo content on the page.
 * It renders a image on the page followed by a heading, some text and a footer.
 * It also renders a quote and some content about a person being transformed into a vermin.
 */
function UserInfo() {
	return (
		<div className="flex flex-col flex-0 lg:flex-row items-center max-w-5xl w-full mx-auto px-32 lg:h-72">
			<div className="-mt-96 lg:-mt-88 rounded-full">
				<Avatar
					sx={{ borderColor: 'background.paper' }}
					className="w-128 h-128 border-4"
					src="assets/images/avatars/male-04.jpg"
					alt="User avatar"
				/>
			</div>
		</div>
	);
}

export default memo(UserInfo);
