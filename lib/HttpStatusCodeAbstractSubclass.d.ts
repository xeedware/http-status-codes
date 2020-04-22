import { ReasonPhrase, Record, RecordSet, Reference } from './HttpStatusCode';
import { IanaHttpStatusCodes } from './IanaHttpStatusCodes';
export declare abstract class HttpStatusCodeAbstractSubclass extends IanaHttpStatusCodes {
    protected constructor();
    hasAlternatives(statusCode: number): boolean;
    getRecords(statusCode: number): RecordSet;
    getReasonPhrases(statusCode: number): ReasonPhrase[];
    getReferences(statusCode: number): Reference[];
    getRecordForReasonPhrase(statusCode: number, reasonPhrase: ReasonPhrase): Record;
    getReferenceForReasonPhrase(statusCode: number, reasonPhrase: ReasonPhrase): Reference;
    protected addRecord(statusCode: number, record: Record): this;
    protected deleteStatusCode(statusCode: number): this;
    protected deleteRecord(statusCode: number, reasonPhrase: ReasonPhrase): this;
    protected replaceRecord(statusCode: number, reasonPhrase: ReasonPhrase, newRecord: Record): this;
    protected replaceReasonPhrase(statusCode: number, oldReasonPhrase: ReasonPhrase, newReasonPhrase: ReasonPhrase): this;
    protected replaceReference(statusCode: number, reasonPhrase: ReasonPhrase, newReference: Reference): this;
}
//# sourceMappingURL=HttpStatusCodeAbstractSubclass.d.ts.map