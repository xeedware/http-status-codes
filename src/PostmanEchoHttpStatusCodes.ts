/*
 * Copyright (c) 2020. XEEDware.org.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may use this file when in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for specific language governing permissions and limitations under the License.
 */

import {HttpStatusCodeAbstractSubclass} from './HttpStatusCodeAbstractSubclass';

/**
 * # `PostmanEchoHttpStatusCodes`
 *
 * HTTP *status codes* and associated *reason phrases* as returned by [Postman Echo](https://docs.postman-echo.com)
 */
export class PostmanEchoHttpStatusCodes extends HttpStatusCodeAbstractSubclass {

    constructor() {
        super();
        this.replaceRecord(
            306,
            '(Unused)',
            {
                reasonPhrase: 'Switch Proxy',
                reference: ['Cohen, Josh. "HTTP/1.1 305 and 306 Response Codes". HTTP Working Group. Archived from the original on September 8, 2014. Retrieved September 8, 2014.']
            }
        ).addRecord(
            418,
            {
                reasonPhrase: "I'm a Teapot",
                reference: ['RFC7168']
            },
        ).replaceRecord(
            425,
            'Too Early',
            {
                reasonPhrase: 'Unordered Collection',
                reference: ['RFC3648']
            }
        );
    }
}
