import {PostmanEchoHttpStatusCodes} from '../src';
import {Record, Reference} from '../src';

describe('http-status-codes', () => {

    let postmanHttpStatus: PostmanEchoHttpStatusCodes;
    let validStatusCodes: number[];
    const invalidStatusCodes = [150, 250, 350, 475, 550];

    beforeAll(() => {
        postmanHttpStatus = new PostmanEchoHttpStatusCodes();
        validStatusCodes = Object.keys(postmanHttpStatus.getDataset()).map(statusCode => Number(statusCode))
    });

    describe('getData', () => {

        it('should work', () => {
            const result = postmanHttpStatus.getDataset();
            expect(result).toBeDefined();
        });

    });

    describe('getRecord', () => {

        it('valid codes should succeed', () => {
            validStatusCodes.forEach((statusCode => {
                let retval: Record;
                expect(() => {
                    retval = postmanHttpStatus.getRecord(statusCode);
                }).not.toThrow();
                // @ts-ignore
                expect(retval).toBeDefined();
            }));
        });

        it('invalid code should throw Error', () => {
            invalidStatusCodes.forEach(statusCode => {
                expect(() => {
                    postmanHttpStatus.getRecord(statusCode);
                }).toThrow(new Error(`statusCode ${statusCode} non-existent.`));
            });
        });

    });

    describe('getReasonPhrase', () => {

        it('valid codes should work', () => {
            validStatusCodes.forEach((statusCode => {
                const result = postmanHttpStatus.getReasonPhrase(statusCode);
                expect(result).toBeDefined();
                console.log(result);
            }));
        });

        it('invalid code should throw Error', () => {
            invalidStatusCodes.forEach(statusCode => {
                expect(() => {
                    postmanHttpStatus.getReasonPhrase(statusCode);
                }).toThrow(new Error(`statusCode ${statusCode} non-existent.`));
            });
        });

    });

    describe('getReference', () => {

        it('valid codes should throw Error', () => {
            validStatusCodes.forEach((statusCode => {
                let retval: Reference;
                expect(() => {
                    retval = postmanHttpStatus.getReference(statusCode);
                }).not.toThrow();
                // @ts-ignore
                expect(retval).toBeDefined();
           }));
        });

        it('invalid code should throw Error', () => {
            invalidStatusCodes.forEach(statusCode => {
                expect(() => {
                    postmanHttpStatus.getReference(statusCode);
                }).toThrow(new Error(`statusCode ${statusCode} non-existent.`));
            });
        });

    });

});
