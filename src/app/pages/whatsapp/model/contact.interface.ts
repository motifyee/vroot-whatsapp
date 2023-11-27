export interface IContact {
	id: string;
	wa_id: string;

	first_name: string;
	last_name: string;
	username: string;
	avatar?: string;
	initials?: string;
	email?: string;

	groups?: IGroup[];
	permissions?: IPermission[];
}

export interface IGroup {
	id: string;
	name: string;
}

export interface IPermission {
	id: string;
	name: string;
	allowed: boolean | number | string;
}
