import { Base } from './base';
import { IUser, IUserData, IUserLoginData } from './user.interface';

export class User extends Base implements IUser {
	id?: string;
	email?: string;

	username?: string;
	phone?: string;
	secondaryPhone?: string;
	address?: string;

	constructor(user: IUserLoginData) {
		super(user);
		this.map();
	}
}

export class UserData extends Base implements IUserData {
	token = '';

	branchId = 0;
	companyId = 0;
	employeeId = 0;

	userType = '';
	userId = 0;

	constructor(user: IUserData) {
		super(user);
		this.map();
	}
}
