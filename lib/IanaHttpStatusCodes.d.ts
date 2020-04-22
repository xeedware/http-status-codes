import { Dataset, ReasonPhrase, Record, Reference } from './HttpStatusCode';
export declare class IanaHttpStatusCodes {
    protected dataset: Dataset;
    getDataset(): Dataset;
    getStatusCodes(): number[];
    getRecord(statusCode: number): Record;
    getReasonPhrase(statusCode: number): ReasonPhrase;
    getReference(statusCode: number): Reference;
}
//# sourceMappingURL=IanaHttpStatusCodes.d.ts.map