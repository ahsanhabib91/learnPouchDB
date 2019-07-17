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
	changes: any;
	backupDoc: any;
	occupation: string = "test1";
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
			// const res = await this.remoteDB.get('mittens');
			// console.log(res);

			this.backupDoc = await this.remoteDB.get('mittens');
			console.log("readDOC this.backupDoc", this.backupDoc);
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
			// const doc = await this.remoteDB.get('mittens');
			console.log("this.backupDoc", this.backupDoc);
			// delete doc['_rev']; // without _rev doc will not update.
			let doc = this.backupDoc;
			doc.occupation = this.occupation;
			const res = await this.remoteDB.put(doc);
			console.log(res);
		} catch(err) {
			console.log(err);
		}
		
	}

	async forceUpdateDOC() {
		try {
			// const doc = await this.remoteDB.get('mittens');
			console.log("force this.backupDoc", this.backupDoc);
			// delete doc['_rev']; // without _rev doc will not update.
			let doc = this.backupDoc;
			doc.occupation = this.occupation;
			const res = await this.remoteDB.put(doc, {force: true});
			console.log(res);
		} catch(err) {
			console.log(err);
		}
		
	}
	
	async deleteDOC() {
		try {
			const doc = await this.remoteDB.get('mittens');
			const res = await this.remoteDB.remove(doc);
			console.log(res);
		} catch(err) {
			console.log(err);
		}
	}

	async bulkCreateDOC() {
		try {
			const res = await this.remoteDB.bulkDocs([
				{title : 'Lisa Says', _id: 'doc1'},
				{title : 'Space Oddity', _id: 'doc2'}
			  ]);
			console.log(res);
		} catch(err) {
			console.log(err);
		}
	}
	async bulkUpdateDOC() {
		try {
			const doc1 = await this.remoteDB.get('doc1');
			const doc2 = await this.remoteDB.get('doc2');
			doc1.title = "title 3"
			doc2.title = "title 4"
			const res = await this.remoteDB.bulkDocs([doc1, doc2], { include_docs: true, attachments: true });
			console.log(res);
		} catch(err) {
			console.log(err);
		}
	}

	detectChanges() {
		this.changes = this.remoteDB.changes({
			since: 'now',
			live: true,
			include_docs: true
		}).on('change', (change) => {
			console.log('change', change);
		}).on('complete', (info) => {
			console.log('info', info);
		}).on('error', (err) => {
			console.log(err);
		});
	}

	cancelChanges() {
		this.changes.cancel();
	}

}
