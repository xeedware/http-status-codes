/*
 * Copyright (c) 2020. XEEDware.org.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may use this file when in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for specific language governing permissions and limitations under the License.
 */


import {HttpStatusCodeAbstractSubclass} from '../../src';
import {ReasonPhrase, Record, Reference} from '../../src';

export class HttpStatusSubclassTestHelper extends HttpStatusCodeAbstractSubclass {

    constructor() {
        super();
        this.replaceRecord(
            306,
            '(Unused)',
            {
                reasonPhrase: 'Switch Proxy',
                reference: ['Cohen, Josh. "HTTP/1.1 305 and 306 Response Codes". HTTP Working Group. Archived from the original on September 8, 2014. Retrieved September 8, 2014.']
            }
        );
        this.addRecord(
            418,
            {
                reasonPhrase: "I'm a teapot",
                reference: ['RFC2324']
            },
        );
        this.addRecord(
            418,
            {
                reasonPhrase: "I'm a Teapot",
                reference: ['RFC7168']
            },
        );
        this.addRecord(
            250,
            {
                reasonPhrase: "I'm bogus",
                reference: ['A test for deleteRecord().']
            },
        );
        this.deleteRecord(
            250,
            "I'm bogus"
        );
    }

    publicAddRecord(
        statusCode: number,
        record: Record,
    ): this {
        return this.addRecord(statusCode, record);
    }

    publicDeleteCode(
        statusCode: number,
    ): this {
        return this.deleteStatusCode(statusCode);
    }

    publicDeleteRecord(
        statusCode: number,
        reasonPhrase: ReasonPhrase,
    ): this {
        return this.deleteRecord(statusCode, reasonPhrase);
    }

    publicReplaceRecord(
        statusCode: number,
        reasonPhrase: ReasonPhrase,
        newRecord: Record,
    ): this {
        return this.replaceRecord(statusCode, reasonPhrase, newRecord);
    }

    publicReplaceReasonPhrase(
        statusCode: number,
        oldReasonPhrase: ReasonPhrase,
        newReasonPhrase: ReasonPhrase,
    ): this {
        return this.replaceReasonPhrase(statusCode, oldReasonPhrase, newReasonPhrase);
    }

    publicReplaceReference(
        statusCode: number,
        reasonPhrase: ReasonPhrase,
        newReference: Reference,
    ): this {
        return this.replaceReference(statusCode, reasonPhrase, newReference);
    }


}
