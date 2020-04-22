# `@xeedware/http-status-codes`

Typescript classes customizable to a target HTTP API to get
its **status codes**, associated **reason phrases**
and **references**.

Two concrete classes provided in this package target HTTP API's conforming to

- *IANA HTTP Status Code Registry* and
- *Postman Echo*.

## Overview

This package includes three Typescript classes:

- `IanaHttpStatusCodes`\
    Contains a dataset of definitive [IANA HTTP Status Code Registry](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml)
  - *status codes* (e.g., 404) and it associated
  - *reason phrase* (e.g. "Not Found") and
  - *reference* (e.g., "RFC7231, Section 6.5.4").
  
- `HttpStatusCodeAbstractSubclass`\
    An abstract Typescript class
    to facilitate the creation of a concrete class targeted to
    a specific HTTP API.
    `HttpStatusCodeAbstractSubclass` extends `IanaHttpStatusCodes`
    for its initial dataset that is then customizable by calling
    protected methods.
    
- `PostmanEchoHttpStatusCodes`\
    A concrete class that extends `HttpStatusCodeAbstractSubclass`
    with several alterations to the IANA dataset
    to conform to HTTP *status codes* and *reason phrases*
    returned by *Postman Echo* (see <https://docs.postman-echo.com/>).

## Install

```bash
npm install [-D] @xeedware/http-status
```

## Usage

### IanaHttpStatusCodes Class

1. **Import and Instantiate**

   ```typescript
   import {IanaHttpStatusCodes} from '@xeedware/http-status-codes';
   const ianaHttpStatusCodes = new IanaHttpStatusCodes();
   ```

2. **Frequently Used Methods**

   1. **getStatusCodes**\
      Get all *status codes* of the instance.

      ```typescript
      const statusCodes = ianaHttpStatusCodes.getStatusCodes();
          // [
          //     100, 101, 102, 103, 200, 201, 202, 203, 204,
          //     205, 206, 207, 208, 226, 300, 301, 302, 303,
          //     304, 305, 306, 307, 308, 400, 401, 402, 403,
          //     404, 405, 406, 407, 408, 409, 410, 411, 412,
          //     413, 414, 415, 416, 417, 421, 422, 423, 424,
          //     425, 426, 428, 429, 431, 451, 500, 501, 502,
          //     503, 504, 505, 506, 507, 508, 510, 511
          // ]
      ```

   2. **getReasonPhrase**\
      Get the *reason phrase* associated with the specified *status code*.

      ```typescript
      const reasonPhrase200 = ianaHttpStatusCodes.getReasonPhrase(200);
         // 'OK'
      const reasonPhrase404 = ianaHttpStatusCodes.getReasonPhrase(404);
         // 'Not Found'
      ```

   3. **getReference**\
      Get the *reference* associated with the specified *status code*.

      ```typescript
      const reference200 = ianaHttpStatusCodes.getReference(200);
          // ["RFC7231, Section 6.3.1"]
      const reference404 = ianaHttpStatusCodes.getReference(404);
         // ["RFC7231, Section 6.5.4"]
      ```

3. **Other Methods**

   1. **getDataset**\
      Get the entire dataset as a JSON object.

      ```typescript
      const dataSet = ianaHttpStatusCodes.getDataset();
      ```

   2. **getRecord**\
      Get the record associated with the specified *status code*.

      ```typescript
      const recordSet = ianaHttpStatusCodes.getRecord(200);
         // [{"reasonPhrase": "OK", "reference": ["RFC7231 - Section 6.3.1"]}]
      ```

### PostmanEchoHttpStatusCodes Class

1. **Import and Instantiate**

   ```typescript
   import {PostmanEchoHttpStatusCodes} from '@xeedware/http-status-codes';
   const postmanEchoHttpStatusCodes = new PostmanEchoHttpStatusCodes();
   ```

2. **Methods**\
   Identical to `IanaHttpStatusCodes` but returns *status codes* and
   associated *reason phrase* as returned by *Postman Echo*.

### HttpStatusCodeAbstractSubclass Class

What can you do with `HttpStatusCodeAbstractSubclass`?

#### 1. Create a new class that modifies the `IanaHttpStatusCodes` dataset for your particular HTTP API

`PostmanEchoHttpStatusCodes` is an example.
We used `PostmanEchoHttpStatusCodes` for known HTTP *status codes*
and *reason phrases* during evaluation of HTTP clients
Axios and Angular's HttpClient against HTTP requests
to *Postman Echo*.

`PostmanEchoHttpStatusCodes` differs from `IanaHttpStatusCodes` by:

- Returning *status phrase* "Switch Proxy" for *status code* **306**,
    instead of "(Unused)"
    and references a "HTTP/1.1 305 and 306 Response Codes" document
    authored by Josh Cohen.
- Adding *status code* **418** with *reason phrase*
    "I'm a **T**eapot" referenced in RFC7168.\\
    Note other services may add *status code* **418**
    but instead return the *reason phrase*
    "I'm a **t**eapot" referenced in RFC2324.
- Returning *sstatus phrase*s "Unordered Collection" for *status code* **425**
      and references RFC3648.

Within your subclass, you can call any of the following chainable
`HttpStatusCodeAbstractSubclass` methods
to alter the initial IANA dataset:
- `addRecord(statusCode, record)`
- `deleteStatusCode(statusCode)`
- `deleteRecord(statusCode, reasonPhrase)`
- `replaceRecord(statusCode, reasonPhrase, record)`
- `replaceReasonPhrase(statusCode, oldReasonPhrase, newReasonPhrase)`
- `replaceReference(statusCode, reasonPhrase, reference)`

For example:

```typescript
import {HttpStatusCodeAbstractSubclass} from '@xeedware/http-status-codes';
export class MyHttpStatusCodes extends HttpStatusCodeAbstractSubclass {
    constructor() {
        super();
        this.addRecord(
            418, // statusCode
            {
                reasonPhrase: "I'm a Teapot",
                reference: ['RFC7168']
            } // record
        ).replaceRecord(
            425, // statusCode
            'Too Early', // reasonPhrase
            {
                reasonPhrase: 'Unordered Collection',
                reference: ['RFC3648']
            } // record
        );
    }
}
```

#### 2. Create a more extensive dataset in which *status code*s can have multiple records

Should your application need knowledge of non-standard *status codes*
and *reason phrases*
in **addition** to those in the IANA dataset, `HttpStatusCodeAbstractSubclass`
can provide that capability with its methods:

- `addRecord(statusCode, record)`\
    Protected method accessible only by a subclass
    to add an alternative record for the specified *status code*.

- `hasAlternatives(statusCode)`\
    Determine if a *status code* has more than one record.

- `getRecords(statusCode)`\
    Get all records for the specified *status code*.

- `getReasonPhrases(statusCode)`\
    Get all *reason phrases* for the specified *status code*.

- `getReferences(statusCode)` \
    Get all *references* for the specified *status code*
    regardless of *reason phrase*.

- `getRecordForReasonPhrase(statusCode, reasonPhrase)`\
    Get a *status code*'s record that has the specified *reason phrase*.

- `getReferenceForReasonPhrase(statusCode, reasonPhrase)`\
    Get a *status code*'s *reference* that has the specified *reason phrase*.

For example:

```typescript
// MyMultiRecordHttpStatusCodes.ts
import {HttpStatusCodeAbstractSubclass} from '@xeedware/http-status-codes'
export class MyMultiRecordHttpStatusCode extends HttpStatusCodeAbstractSubclass {
    constructor() {
        super();
        this.addRecord(
            307, // statusCode
            {
                reasonPhrase: 'Switch Proxy',
                reference: ['Cohen, Josh. "HTTP/1.1 305 and 306 Response Codes". HTTP Working Group. Archived from the original on September 8, 2014. Retrieved September 8, 2014.']
            }
        ).addRecord(
            418, // statusCode
            {
                reasonPhrase: "I'm a teapot",
                reference: ['RFC2324']
            } // record
        ).addRecord(
            418, // statusCode
            {
                reasonPhrase: "I'm a Teapot",
                reference: ['RFC7168']
            } // record
        );
    }
}
```

```typescript
// demo.ts
import {MyMultiRecordHttpStatusCodes} from './MyMultiRecordHttpStatusCodes.ts';

const myMultiRecordHttpStatusCodes = new MyMultiRecordHttpStatusCodes();

const hasAlternatives307 = myMultiRecordHttpStatusCodes.hasAlternatives(307);
console.log(hasAlternatives307);  // true

const hasAlternatives418 = myMultiRecordHttpStatusCodes.hasAlternatives(418);
console.log(hasAlternatives418);  // true

const records418 = myMultiRecordHttpStatusCodes.getRecords(418);
console.log(records418.length);  // 2

const reasonPhrases418 = myMultiRecordHttpStatusCodes.getReasonPhrases(418);
console.log(reasonPhrases418);  // [ "I'm a teapot", "I'm a Teapot" ]

const references418 = myMultiRecordHttpStatusCodes.getReferences(418);
console.log(references418);  // [ ["RFC2324"], ["RFC7168"] ]

const reference418 = myMultiRecordHttpStatusCodes.getReferenceForReasonPhrase(418, "I'm a teapot");
console.log(reference418);  // ["RFC2324"]
```

In addition to *status code* 418 in the example above plus 306 and 425 previously mentioned,
for unofficial *status codes* and associated *reason phrase*/*reference* see
<https://en.wikipedia.org/wiki/List_of_HTTP_status_codes>.
You'll find unofficial *status codes*/*reason phrases* used by other services
like Apache Web Server, Spring Framework, Twitter, IIS and nginx.

## About the IanaHttpStatusCodes Class's Dataset

The HTTP status code dataset is hardcoded into the `IanaHttpStatusCodes` class.
We used the following shell and awk scripts found in the `scripts` directory
to capture the IANA's offial dataset from
<https://www.iana.org/assignments/http-status-codes/http-status-codes-1.csv>
then transform the CSV to JSON:

- `http-status-csv_to_json.sh`\
    Shell script to download the official IANA HTTP StatusCode Registry dataset
    then transform the CSV to JSON
    that we then copied into the `IanaHttpStatusCodes` class.

- `http-status-csv_to_json.awk`\
     Awk script referenced by `http-status-csv_to_json.sh` to assist
     transforming CSV to JSON.

When IANA's HTTP status code dataset changes,
we intend to use these scripts
to update the `IanaHttpStatusCodes` hardcoded dataset, rebuild the package,
then release a new version.
