import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class WhatsappServiceService {
	http = inject(HttpClient);
}
const apis = [['webhook/ReceiveMessages', 'POST']];

/**
 * login
 * settings—proc—reports
 *
 * internal goups->emplyees
 * external groups->customers
 *
 * msg: sent-by, deleted-by, viewed-by-count
 *
 * forward->[internal/external] groups
 */
