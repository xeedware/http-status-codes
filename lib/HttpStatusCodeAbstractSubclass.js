"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IanaHttpStatusCodes_1 = require("./IanaHttpStatusCodes");
class HttpStatusCodeAbstractSubclass extends IanaHttpStatusCodes_1.IanaHttpStatusCodes {
    constructor() {
        super();
    }
    hasAlternatives(statusCode) {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        return Array.isArray(this.dataset[statusCode]);
    }
    getRecords(statusCode) {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        return [...this.dataset[statusCode]];
    }
    getReasonPhrases(statusCode) {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        return this.dataset[statusCode].map(record => record.reasonPhrase);
    }
    getReferences(statusCode) {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        return this.dataset[statusCode].map(record => record.reference);
    }
    getRecordForReasonPhrase(statusCode, reasonPhrase) {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        const recordIndex = this.dataset[statusCode].findIndex(record => {
            return record.reasonPhrase === reasonPhrase;
        });
        if (recordIndex === -1) {
            throw new Error(`Record with reasonPhrase "${reasonPhrase}" for statusCode ${statusCode} non-existent.`);
        }
        return Object.assign({}, this.dataset[statusCode][recordIndex]);
    }
    getReferenceForReasonPhrase(statusCode, reasonPhrase) {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        const recordIndex = this.dataset[statusCode].findIndex(record => {
            return record.reasonPhrase === reasonPhrase;
        });
        if (recordIndex === -1) {
            throw new Error(`Record with reasonPhrase "${reasonPhrase}" for statusCode ${statusCode} non-existent.`);
        }
        return [...this.dataset[statusCode][recordIndex].reference];
    }
    addRecord(statusCode, record) {
        const recordSet = this.dataset[statusCode];
        if (!recordSet) {
            this.dataset[statusCode] = [record];
        }
        else {
            this.dataset[statusCode].push(record);
        }
        return this;
    }
    deleteStatusCode(statusCode) {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        delete this.dataset[statusCode];
        return this;
    }
    deleteRecord(statusCode, reasonPhrase) {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        const recordIndex = this.dataset[statusCode].findIndex(record => {
            return record.reasonPhrase === reasonPhrase;
        });
        if (recordIndex === -1) {
            throw new Error(`Record with reasonPhrase "${reasonPhrase}" for statusCode ${statusCode} non-existent.`);
        }
        this.dataset[statusCode].splice(recordIndex, 1)[0];
        if (this.dataset[statusCode].length === 0) {
            this.deleteStatusCode(statusCode);
        }
        return this;
    }
    replaceRecord(statusCode, reasonPhrase, newRecord) {
        this.deleteRecord(statusCode, reasonPhrase);
        this.addRecord(statusCode, newRecord);
        return this;
    }
    replaceReasonPhrase(statusCode, oldReasonPhrase, newReasonPhrase) {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        if (oldReasonPhrase.length === 0) {
            throw new Error('The oldReasonPhrase argument is empty.');
        }
        if (newReasonPhrase.length === 0) {
            throw new Error('The newReasonPhrase argument is empty.');
        }
        const foundRecord = this.dataset[statusCode].find(record => record.reasonPhrase === oldReasonPhrase);
        if (!foundRecord) {
            throw new Error(`Record with reasonPhrase "${oldReasonPhrase}" for statusCode ${statusCode} non-existent.`);
        }
        foundRecord.reasonPhrase = newReasonPhrase;
        return this;
    }
    replaceReference(statusCode, reasonPhrase, newReference) {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        if (reasonPhrase.length === 0) {
            throw new Error('The reasonPhrase argument is empty.');
        }
        const foundRecord = this.dataset[statusCode].find(record => record.reasonPhrase === reasonPhrase);
        if (!foundRecord) {
            throw new Error(`Record with reasonPhrase "${reasonPhrase}" for statusCode ${statusCode} non-existent.`);
        }
        foundRecord.reference = newReference;
        return this;
    }
}
exports.HttpStatusCodeAbstractSubclass = HttpStatusCodeAbstractSubclass;
//# sourceMappingURL=HttpStatusCodeAbstractSubclass.js.map