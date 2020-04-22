/*
 * Copyright (c) 2020. XEEDware.org.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may use this file when in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for specific language governing permissions and limitations under the License.
 */

import {
    Dataset,
    ReasonPhrase,
    Record,
    Reference
} from './HttpStatusCode';

/**
 * # `IanaHttpStatusCodes`
 *
 * IANA HTTP Status Codes, Descriptions and References.
 *
 * Source for this dataset is the [IANA Hypertext Transfer Protocol (HTTP) Status Code Registry](//www.iana.org/assignments/http-status-codes-codes/http-status-codes-codes.xhtml>)
 *
 * Data is downloaded from <https://www.iana.org/assignments/http-status-codes/http-status-codes-1.csv>,
 * then converted to JSON using shell and gawk script provided in the http-status-codes package.
 */
export class IanaHttpStatusCodes {

    /**
     * @hidden
     */
    protected dataset: Dataset = {
        "100": [{"reasonPhrase": "Continue", "reference": ["RFC7231 - Section 6.2.1"]}],
        "101": [{"reasonPhrase": "Switching Protocols", "reference": ["RFC7231 - Section 6.2.2"]}],
        "102": [{"reasonPhrase": "Processing", "reference": ["RFC2518"]}],
        "103": [{"reasonPhrase": "Early Hints", "reference": ["RFC8297"]}],
        "200": [{"reasonPhrase": "OK", "reference": ["RFC7231 - Section 6.3.1"]}],
        "201": [{"reasonPhrase": "Created", "reference": ["RFC7231 - Section 6.3.2"]}],
        "202": [{"reasonPhrase": "Accepted", "reference": ["RFC7231 - Section 6.3.3"]}],
        "203": [{"reasonPhrase": "Non-Authoritative Information", "reference": ["RFC7231 - Section 6.3.4"]}],
        "204": [{"reasonPhrase": "No Content", "reference": ["RFC7231 - Section 6.3.5"]}],
        "205": [{"reasonPhrase": "Reset Content", "reference": ["RFC7231 - Section 6.3.6"]}],
        "206": [{"reasonPhrase": "Partial Content", "reference": ["RFC7233 - Section 4.1"]}],
        "207": [{"reasonPhrase": "Multi-Status", "reference": ["RFC4918"]}],
        "208": [{"reasonPhrase": "Already Reported", "reference": ["RFC5842"]}],
        "226": [{"reasonPhrase": "IM Used", "reference": ["RFC3229"]}],
        "300": [{"reasonPhrase": "Multiple Choices", "reference": ["RFC7231 - Section 6.4.1"]}],
        "301": [{"reasonPhrase": "Moved Permanently", "reference": ["RFC7231 - Section 6.4.2"]}],
        "302": [{"reasonPhrase": "Found", "reference": ["RFC7231 - Section 6.4.3"]}],
        "303": [{"reasonPhrase": "See Other", "reference": ["RFC7231 - Section 6.4.4"]}],
        "304": [{"reasonPhrase": "Not Modified", "reference": ["RFC7232 - Section 4.1"]}],
        "305": [{"reasonPhrase": "Use Proxy", "reference": ["RFC7231 - Section 6.4.5"]}],
        "306": [{"reasonPhrase": "(Unused)", "reference": ["RFC7231 - Section 6.4.6"]}],
        "307": [{"reasonPhrase": "Temporary Redirect", "reference": ["RFC7231 - Section 6.4.7"]}],
        "308": [{"reasonPhrase": "Permanent Redirect", "reference": ["RFC7538"]}],
        "400": [{"reasonPhrase": "Bad Request", "reference": ["RFC7231 - Section 6.5.1"]}],
        "401": [{"reasonPhrase": "Unauthorized", "reference": ["RFC7235 - Section 3.1"]}],
        "402": [{"reasonPhrase": "Payment Required", "reference": ["RFC7231 - Section 6.5.2"]}],
        "403": [{"reasonPhrase": "Forbidden", "reference": ["RFC7231 - Section 6.5.3"]}],
        "404": [{"reasonPhrase": "Not Found", "reference": ["RFC7231 - Section 6.5.4"]}],
        "405": [{"reasonPhrase": "Method Not Allowed", "reference": ["RFC7231 - Section 6.5.5"]}],
        "406": [{"reasonPhrase": "Not Acceptable", "reference": ["RFC7231 - Section 6.5.6"]}],
        "407": [{"reasonPhrase": "Proxy Authentication Required", "reference": ["RFC7235 - Section 3.2"]}],
        "408": [{"reasonPhrase": "Request Timeout", "reference": ["RFC7231 - Section 6.5.7"]}],
        "409": [{"reasonPhrase": "Conflict", "reference": ["RFC7231 - Section 6.5.8"]}],
        "410": [{"reasonPhrase": "Gone", "reference": ["RFC7231 - Section 6.5.9"]}],
        "411": [{"reasonPhrase": "Length Required", "reference": ["RFC7231 - Section 6.5.10"]}],
        "412": [{
            "reasonPhrase": "Precondition Failed",
            "reference": ["RFC7232 - Section 4.2','RFC8144 - Section 3.2"]
        }],
        "413": [{"reasonPhrase": "Payload Too Large", "reference": ["RFC7231 - Section 6.5.11"]}],
        "414": [{"reasonPhrase": "URI Too Long", "reference": ["RFC7231 - Section 6.5.12"]}],
        "415": [{
            "reasonPhrase": "Unsupported Media Type",
            "reference": ["RFC7231 - Section 6.5.13','RFC7694 - Section 3"]
        }],
        "416": [{"reasonPhrase": "Range Not Satisfiable", "reference": ["RFC7233 - Section 4.4"]}],
        "417": [{"reasonPhrase": "Expectation Failed", "reference": ["RFC7231 - Section 6.5.14"]}],
        "421": [{"reasonPhrase": "Misdirected Request", "reference": ["RFC7540 - Section 9.1.2"]}],
        "422": [{"reasonPhrase": "Unprocessable Entity", "reference": ["RFC4918"]}],
        "423": [{"reasonPhrase": "Locked", "reference": ["RFC4918"]}],
        "424": [{"reasonPhrase": "Failed Dependency", "reference": ["RFC4918"]}],
        "425": [{"reasonPhrase": "Too Early", "reference": ["RFC8470"]}],
        "426": [{"reasonPhrase": "Upgrade Required", "reference": ["RFC7231 - Section 6.5.15"]}],
        "428": [{"reasonPhrase": "Precondition Required", "reference": ["RFC6585"]}],
        "429": [{"reasonPhrase": "Too Many Requests", "reference": ["RFC6585"]}],
        "431": [{"reasonPhrase": "Request Header Fields Too Large", "reference": ["RFC6585"]}],
        "451": [{"reasonPhrase": "Unavailable For Legal Reasons", "reference": ["RFC7725"]}],
        "500": [{"reasonPhrase": "Internal Server Error", "reference": ["RFC7231 - Section 6.6.1"]}],
        "501": [{"reasonPhrase": "Not Implemented", "reference": ["RFC7231 - Section 6.6.2"]}],
        "502": [{"reasonPhrase": "Bad Gateway", "reference": ["RFC7231 - Section 6.6.3"]}],
        "503": [{"reasonPhrase": "Service Unavailable", "reference": ["RFC7231 - Section 6.6.4"]}],
        "504": [{"reasonPhrase": "Gateway Timeout", "reference": ["RFC7231 - Section 6.6.5"]}],
        "505": [{"reasonPhrase": "HTTP Version Not Supported", "reference": ["RFC7231 - Section 6.6.6"]}],
        "506": [{"reasonPhrase": "Variant Also Negotiates", "reference": ["RFC2295"]}],
        "507": [{"reasonPhrase": "Insufficient Storage", "reference": ["RFC4918"]}],
        "508": [{"reasonPhrase": "Loop Detected", "reference": ["RFC5842"]}],
        "510": [{"reasonPhrase": "Not Extended", "reference": ["RFC2774"]}],
        "511": [{"reasonPhrase": "Network Authentication Required", "reference": ["RFC6585"]}]
    };

    /**
     * Get a copy of the entire status code dataset.
     * @category Public
     */
    getDataset(): Dataset {
        // return copy
        return {...this.dataset};
    }


    /**
     * Get a list of all status codes in the dataset.
     * @category Public
     */
    getStatusCodes(): number[] {
        // return copy
        return Object.keys(this.dataset).map((key: string) => {
            return Number(key);
        });
    }

    /**
     * Get a copy of the *record* for the specified *status code*.
     *
     * When a *status code* has multiple records, returns the first *record*.
     * @category Public
     */
    getRecord(
        statusCode: number
    ): Record {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        // return copy
        return {...this.dataset[statusCode][0]};
    }

    /**
     * Get the *reason phrase* for the specified *status code*.
     *
     * When a *status code* has multiple records, returns the first *reason phrase*.
     *
     * @category Public
     * @param statusCode
     */
    getReasonPhrase(
        statusCode: number
    ): ReasonPhrase {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        return this.dataset[statusCode][0].reasonPhrase;

    }

    /**
     * Get the *reference* for the specified *status code*.
     *
     * When a *status code* has multiple records, returns the first *reference*.
     *
     * @category Public
     * @param statusCode
     */
    getReference(
        statusCode: number
    ): Reference {
        if (!this.dataset[statusCode]) {
            throw new Error(`statusCode ${statusCode} non-existent.`);
        }
        // return copy
        return [...this.dataset[statusCode][0].reference];
    }

}
