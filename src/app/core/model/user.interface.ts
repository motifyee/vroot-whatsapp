/* eslint-disable no-unused-vars */
import { RequestOptions } from '../services/http/http.service';
import { User } from './user';

export interface IUser {
	id?: string;
	email?: string;

	username?: string;
	phone?: string;
	secondaryPhone?: string;
	address?: string;
}

export interface IUserLoginData extends IUser {
	pwd: string;
}

export interface IUserData extends IUser {
	token: string;

	branchId: number;
	companyId: number;
	employeeId: number;

	userType: string;
	userId: number;
}

export interface IUserActions {
	register: (email: string, pwd: string, opt: RequestOptions) => void;
	login: (email: string, pwd: string, opt: RequestOptions) => void;
	logout: (opt: RequestOptions) => void;
	getUser: (opt: RequestOptions) => void;
	updateUser: (user: User, opt: RequestOptions) => void;
	deleteUser: (opt: RequestOptions) => void;
	getUserSettings: (opt: RequestOptions) => void;
	updateUserSettings: (settings: IUserSettings, opt: RequestOptions) => void;
}

export interface IUserPermissions {
	canView: boolean;
	canEdit: boolean;
	canDelete: boolean;
	canCreate: boolean;
}

export interface IUserSettings {
	theme: string;
	language: string;
	timezone: string;
}

export interface IUserPreferences {
	notifications: boolean;
	otp: boolean;
	whatsapp: boolean;
}

export interface IUserStore
	extends IUserLoginData,
		IUserActions,
		IUserPermissions,
		IUserSettings,
		IUserPreferences {
	isLoggedIn: boolean;
}

export interface ILoginInfo {
	token: string;
	user: User;
	branchId: number;
	companyId: number;
	employeeId: number;
	branchName: string;
}
