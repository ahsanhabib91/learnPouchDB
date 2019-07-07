import { Component } from '@angular/core';
import PouchDB from 'pouchdb';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	
	remoteDB: any;
	remoteDB_URL:string;
	constructor() {
		this.remoteDB_URL = 'http://admin:secret@127.0.0.1:5984/test_ionic_db';
	}

	async createDB() {
		try {
			this.remoteDB = new PouchDB(this.remoteDB_URL);
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
			var doc = {
				"_id": "mittens",
				"name": "Mittens",
				"occupation": "kitten",
				"age": 3,
				"hobbies": [
				  "playing with balls of yarn",
				  "chasing laser pointers",
				  "lookin' hella cute"
				]
			  };
			const res = await this.remoteDB.put(doc);
			console.log(res);
		} catch(err) {
			console.log(err);
		}
	}
	async readDOC() {
		try {
			const res = await this.remoteDB.get('mittens');
			console.log(res);
		} catch(err) {
			console.log(err);
		}
	}
	async fetchAllDOC() {
		try {
			const res = await this.remoteDB.allDocs({ include_docs: true, attachments: true });
			console.log(res);
		} catch(err) {
			console.log(err);
		}
	}
	async updateDOC() {
		try {
			const doc = await this.remoteDB.get('mittens');
			console.log(doc);
			// delete doc['_rev']; // without _rev doc will not update.
			doc.occupation = "coder";
			const res = await this.remoteDB.put(doc);
			console.log(res);
		} catch(err) {
			console.log(err);
		}
		
	}
	
	async deleteDOC() {
		try {

		} catch(err) {
			console.log(err);
		}
	}

}
