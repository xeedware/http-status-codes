/*
 * Copyright (c) 2020. XEEDware.org.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may use this file when in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for specific language governing permissions and limitations under the License.
 */

import {
    ReasonPhrase, Record, RecordSet, Reference,
} from './HttpStatusCode';
import {IanaHttpStatusCodes} from './IanaHttpStatusCodes';

/**
 * # `HttpStatusCodeAbstractSubclass`
 *
 * An abstract Typescript class to facilitate the creation of
 * a concrete class targeted to a specific HTTP API.
 *
 * `HttpStatusCodeAbstractSubclass`
 * extends `IanaHttpStatusCodes` for its initial dataset
 * that is then customizable by calling protected methods.
 */
export abstract class HttpStatusCodeAbstractSubclass extends IanaHttpStatusCodes {

    protected constructor() {
        super();
    }

    /**
     * Determine if the specified *status code* has multiple records.
     * @category Public
     * @param statusCode
     */
    hasAlternatives(statusCode: number): boolean {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        return Array.isArray(this.dataset[statusCode]);
    }

    /**
     * Get all records for the specified *status code*.
     * @category Public
     * @param statusCode
     */
    getRecords(
        statusCode: number,
    ): RecordSet {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        // Return a copy
        return [...this.dataset[statusCode]];
    }

    /**
     * Get all *reason phrases* for the specified *status code*.
     * @category Public
     * @param statusCode
     */
    getReasonPhrases(
        statusCode: number
    ): ReasonPhrase[] {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        return this.dataset[statusCode].map(record => record.reasonPhrase);
    }

    /**
     * Get all *references* for the specified *status code*
     * regardless of *reason phrase*.
     * @category Public
     * @param statusCode
     */
    getReferences(
        statusCode: number
    ): Reference[] {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        return this.dataset[statusCode].map(record => record.reference);
    }

    /**
     * Get a *status code*'s record that has the specified *reason phrase*.
     * @category Public
     * @param statusCode
     * @param reasonPhrase
     */
    getRecordForReasonPhrase(
        statusCode: number,
        reasonPhrase: ReasonPhrase
    ): Record {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        const recordIndex = this.dataset[statusCode].findIndex(record => {
            return record.reasonPhrase === reasonPhrase;
        });
        if (recordIndex === -1) {
            throw new Error(`Record with reasonPhrase "${reasonPhrase}" for statusCode ${statusCode} non-existent.`);
        }
        // Return copy
        return {...this.dataset[statusCode][recordIndex]};
    }

    /**
     * Get a *status code*'s *reference* that has the specified *reason phrase*.
     * @category Public
     * @param statusCode
     * @param reasonPhrase
     */
    getReferenceForReasonPhrase(
        statusCode: number,
        reasonPhrase: ReasonPhrase
    ): Reference {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        const recordIndex = this.dataset[statusCode].findIndex(record => {
            return record.reasonPhrase === reasonPhrase;
        });
        if (recordIndex === -1) {
            throw new Error(`Record with reasonPhrase "${reasonPhrase}" for statusCode ${statusCode} non-existent.`);
        }
        // Return copy
        return [...this.dataset[statusCode][recordIndex].reference];
    }

    /**
     * Add an alternative record for the specified *status code*.
     * @category Protected
     * @param statusCode
     * @param record
     */
    protected addRecord(
        statusCode: number,
        record: Record,
    ): this {
        const recordSet = this.dataset[statusCode];
        if (!recordSet) {
            // Add code
            this.dataset[statusCode] = [record];
        } else {
            // Code already exists.
            this.dataset[statusCode].push(record);
        }
        return this;
    }

    /**
     * Delete the specified *status code* from the dataset.
     * @category Protected
     * @param statusCode
     */
    protected deleteStatusCode(
        statusCode: number,
    ): this {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        delete this.dataset[statusCode];
        return this;
    }

    /**
     * Delete the specified *status code*'s record for the specified *reason phrase*.
     * @category Protected
     * @param statusCode
     * @param reasonPhrase
     */
    protected deleteRecord(
        statusCode: number,
        reasonPhrase: ReasonPhrase,
    ): this {
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
            // If no records, delete the status code.
            this.deleteStatusCode(statusCode);
        }
        return this;
    }

    /**
     * Replace the specified *status code*'s record for the specified *reason phrase*.
     * @category Protected
     * @param statusCode
     * @param reasonPhrase
     * @param newRecord
     */
    protected replaceRecord(
        statusCode: number,
        reasonPhrase: ReasonPhrase,
        newRecord: Record,
    ): this {
        this.deleteRecord(statusCode, reasonPhrase);
        this.addRecord(statusCode, newRecord);
        return this;
    }

    /**
     * Replace the specified *status code*'s *reason phrase*.
     * @category Protected
     * @param statusCode
     * @param oldReasonPhrase
     * @param newReasonPhrase
     */
    protected replaceReasonPhrase(
        statusCode: number,
        oldReasonPhrase: ReasonPhrase,
        newReasonPhrase: ReasonPhrase,
    ): this {
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

    /**
     * Replace the specified *status code*'s *reference* associated with the specified *reason phrase*.
     * @category Protected
     * @param statusCode
     * @param reasonPhrase
     * @param newReference
     */
    protected replaceReference(
        statusCode: number,
        reasonPhrase: ReasonPhrase,
        newReference: Reference,
    ): this {
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
