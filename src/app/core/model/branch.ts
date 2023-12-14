import { Base } from './base';
import { IBranch } from './branch.interface';

export class Branch extends Base implements IBranch {
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

	constructor(branch: IBranch) {
		super(branch);
		this.map();
	}
}
