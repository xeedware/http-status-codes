/*
 * Copyright (c) 2020. XEEDware.org.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may use this file when in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for specific language governing permissions and limitations under the License.
 */

/**
 * ## *HttpStatusCode* type definitions.
 */

/**
 * A status code's **reason phrase**.
 */
export type ReasonPhrase = string;

/**
 * A status code's **reference** (typically an RFC).
 */
export type Reference = string[];

/**
 * A status code **record** composed of a *reason phrase* and its *reference*.
 */
export type Record = {
    reasonPhrase: ReasonPhrase;
    reference: Reference;
}

/**
 * A status code's **record set** as a status code may contain multiple records.
 */
export type RecordSet = Record[];

/**
 * The dataset of *status codes*, associated *reason phrases* and *references*.
 */
export type Dataset = {
    [value: string]: RecordSet;
}

