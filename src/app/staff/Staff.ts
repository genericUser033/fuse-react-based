
export type Staff = {
	id: string;
	avatar?: string;
	staffId: number;
	japanName?: string;
	katakanaName?: string;
	englishName?: string;
	koreanName?: string;
	position?: Position;
	joinedDate?: string;
	yearsOfWork?: number;
};

export type Position = {
	id: string;
	title: string;
};