import { Injectable, inject } from '@angular/core';
import { IStorage } from './storage.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root',
})
export class StorageService implements IStorage {
	localStorage = inject(LocalStorageService);

	get = this.localStorage.get;
	set = this.localStorage.set;
	remove = this.localStorage.remove;
	clear = this.localStorage.clear;
}
