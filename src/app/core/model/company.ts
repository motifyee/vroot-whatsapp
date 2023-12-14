import { Base } from './base';
import { ICompany } from './company.interface';

export class Company extends Base implements ICompany {
	id = 0;
	name = '';
	email = '';
	phone = '';
	address = '';
	city = '';
	state = '';
	country = '';
	zipcode = '';
	status = '';
	created_at = '';
	updated_at = '';

	constructor(company: ICompany) {
		super(company);
		this.map();
	}
}
