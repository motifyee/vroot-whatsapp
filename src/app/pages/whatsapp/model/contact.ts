import { Base, BaseArray } from '@model/base';
import { IContact, IGroup, IPermission } from './contact.interface';

export class Contact extends Base<Contact> implements IContact {
	id = '';
	wa_id = '';

	first_name = '';
	last_name = '';
	username = '';
	avatar?: string;
	initials?: string;
	email?: string;

	groups?: Group[];
	permissions?: Permission[];

	constructor(contact: IContact) {
		super(contact, {
			groups: Groups,
			permissions: Permissions,
		});
	}
}

export class Group extends Base implements IGroup {
	id = '';
	name = '';

	constructor(group: IGroup) {
		super(group);
		this.map();
	}
}

export interface IGroups extends Array<IGroup> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: number]: Group;
}

export class Groups extends BaseArray<Group> {
	constructor(groups: Partial<Group>[]) {
		super(groups, Group);
	}
}

export class Permission extends Base implements IPermission {
	id = '';
	name = '';
	allowed: boolean | number | string = false;

	constructor(permission: IPermission) {
		super(permission);
		this.map();
	}
}

export class Permissions extends BaseArray<Permission> {
	override unitInitializer = Permission;
	constructor(permissions: Partial<Permission>[]) {
		super(permissions, Permission);
	}
}
