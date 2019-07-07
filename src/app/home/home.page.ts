import { Component } from '@angular/core';
import PouchDB from 'pouchdb';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	
	remoteDB: any;
	constructor() {}

	async createDB() {
		try {
			this.remoteDB = new PouchDB('http://admin:secret@127.0.0.1:5984/test_ionic_db');
			const info = await this.remoteDB.info();
			console.log(info);
		} catch(e) {
			console.log(e);
		}
	}

	async deleteDB() {
		try {
			const info = await this.remoteDB.destroy();
			console.log(info);
		} catch(err) {
			console.log(err);
		}
	}

	async dbInfo() {
		try {
			const info = await this.remoteDB.info();
			console.log(info);
		} catch(e) {
			console.log(e);
		}
	}

	async createDOC() {
		try {

		} catch(err) {
			console.log(err);
		}
	}
	async readDOC() {
		try {

		} catch(err) {
			console.log(err);
		}
	}
	async updateDOC() {

	}
	
	async deleteDOC() {
		try {

		} catch(err) {
			console.log(err);
		}
	}

}
