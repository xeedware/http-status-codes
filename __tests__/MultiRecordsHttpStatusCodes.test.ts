/*
 * Copyright (c) 2020. XEEDware.org.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may use this file when in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for specific language governing permissions and limitations under the License.
 */

import {HttpStatusCodeAbstractSubclass} from '../src';

export class MyMultiRecordHttpStatus extends HttpStatusCodeAbstractSubclass {

    constructor() {
        super();
        this.addRecord(
            418, // statusCode
            {
                reasonPhrase: "I'm a teapot",
                reference: ["RFC2324"]
            } // record
        ).addRecord(
            418, // statusCode
            {
                reasonPhrase: "I'm a Teapot",
                reference: ["RFC7168"]
            } // record
        );
    }

}

const myMultiRecordHttpStatus = new MyMultiRecordHttpStatus();

describe('HttpStatusAbstractSubclass status codes with multiple records', () => {

    describe('hasAlternatives method', () => {

        it('hasAlternatives should return true', () => {
            const hasAlternatives = myMultiRecordHttpStatus.hasAlternatives(418);
            console.log(hasAlternatives);  // true
            expect(hasAlternatives).toBeTruthy();
        });

    });

    describe('getRecords method', () => {

        it('getRecords should return multiple records', () => {
            const records = myMultiRecordHttpStatus.getRecords(418);
            console.log(records.length);
            expect(records.length).toEqual(2);
        });

    });

    describe('getReasonPhrases method', () => {

        it('getReasonPhrases(418) should return multiple reasonPhrases', () => {
            const reasonPhrases = myMultiRecordHttpStatus.getReasonPhrases(418);
            console.log(reasonPhrases);
            expect(reasonPhrases).toEqual(["I'm a teapot", "I'm a Teapot"]);
        });

    });

    describe('getRecordForReasonPhrase method', () => {

        it('getRecordForReasonPhrase(900, "Some Reason") should throw Error', () => {
            expect(() => {
                myMultiRecordHttpStatus.getRecordForReasonPhrase(900, "Some Reason");
            }).toThrow(new Error(`statusCode 900 non-existent.`))
        });

        it('getRecordForReasonPhrase(900, "Some Reason") should throw Error', () => {
            expect(() => {
                myMultiRecordHttpStatus.getRecordForReasonPhrase(418, "Some Reason");
            }).toThrow(Error(`Record with reasonPhrase "Some Reason" for statusCode 418 non-existent.`))
        });

        it('getRecordForReasonPhrase(418) should return multiple reasonPhrases', () => {
            const record = myMultiRecordHttpStatus.getRecordForReasonPhrase(418, "I'm a teapot");
            console.log(record);
            expect(record.reasonPhrase).toEqual("I'm a teapot");
            expect(record.reference).toEqual(["RFC2324"]);
        });

    });

    describe('getReferences method', () => {

        it('getReferences(418) should return multiple phrases', () => {
            const references = myMultiRecordHttpStatus.getReferences(418);
            console.log(references);
            expect(references).toEqual([["RFC2324"], ["RFC7168"]]);
        });

    });

    describe('getReferenceForReasonPhrase method', () => {

        it('getReferenceForReasonPhrase(900, "Some Reason") should throw Error', () => {
            expect(() => {
                myMultiRecordHttpStatus.getReferenceForReasonPhrase(900, "Some Reason");
            }).toThrow(new Error(`statusCode 900 non-existent.`))
        });

        it('getReferenceForReasonPhrase(900, "Some Reason") should throw Error', () => {
            expect(() => {
                myMultiRecordHttpStatus.getReferenceForReasonPhrase(418, "Some Reason");
            }).toThrow(Error(`Record with reasonPhrase "Some Reason" for statusCode 418 non-existent.`))
        });

        it('getReferenceForReasonPhrase(418) should return ["RFC2324"]', () => {
            const reference = myMultiRecordHttpStatus.getReferenceForReasonPhrase(418, "I'm a teapot");
            console.log(reference);
            expect(reference).toEqual(["RFC2324"]);
        });

    });

});
