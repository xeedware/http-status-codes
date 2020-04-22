import {IanaHttpStatusCodes} from '../src';

describe('http-status-codes', () => {

    let ianaHttpStatus: IanaHttpStatusCodes;
    let validStatusCodes: number[];
    const invalidStatusCodes = [150, 250, 350, 475, 550];

    beforeAll(() => {
        ianaHttpStatus = new IanaHttpStatusCodes();
        validStatusCodes = Object.keys(ianaHttpStatus.getDataset()).map(statusCode => Number(statusCode));
    });

    describe('getDataset', () => {

        it('should work', () => {
            validStatusCodes.forEach(() => {
                const result = ianaHttpStatus.getDataset();
                expect(result).toBeDefined();
            });
        });

    });

    describe('getStatusCodes', () => {

        it('should work', () => {
            validStatusCodes.forEach(() => {
                const result = ianaHttpStatus.getStatusCodes();
                expect(result).toEqual([
                    100, 101, 102, 103, 200, 201, 202, 203, 204,
                    205, 206, 207, 208, 226, 300, 301, 302, 303,
                    304, 305, 306, 307, 308, 400, 401, 402, 403,
                    404, 405, 406, 407, 408, 409, 410, 411, 412,
                    413, 414, 415, 416, 417, 421, 422, 423, 424,
                    425, 426, 428, 429, 431, 451, 500, 501, 502,
                    503, 504, 505, 506, 507, 508, 510, 511
                ]);
            });
        });

    });

    describe('getRecord', () => {

        it('valid codes should work', () => {
            validStatusCodes.forEach((statusCode => {
                const result = ianaHttpStatus.getRecord(statusCode);
                expect(result).toBeDefined();
            }));
        });

        it('invalid code should throw Error', () => {
            invalidStatusCodes.forEach(statusCode => {
                expect(() => {
                    ianaHttpStatus.getRecord(statusCode);
                }).toThrow(new Error(`statusCode ${statusCode} non-existent.`));
            });
        });

    });

    describe('getReasonPhrase', () => {

        it('valid codes should work', () => {
            validStatusCodes.forEach((statusCode => {
                const result = ianaHttpStatus.getReasonPhrase(statusCode);
                expect(result).toBeDefined();
                console.log(result);
            }));
        });

        it('invalid code should throw Error', () => {
            invalidStatusCodes.forEach(statusCode => {
                expect(() => {
                    ianaHttpStatus.getReasonPhrase(statusCode);
                }).toThrow(new Error(`statusCode ${statusCode} non-existent.`));
            });
        });

    });

    describe('getReference', () => {

        it('valid codes should work', () => {
            validStatusCodes.forEach((statusCode => {
                const result = ianaHttpStatus.getReference(Number(statusCode));
                expect(result).toBeDefined();
                console.log(result);
            }));
        });

        it('invalid code should throw Error', () => {
            invalidStatusCodes.forEach(statusCode => {
                expect(() => {
                    ianaHttpStatus.getReference(statusCode);
                }).toThrow(new Error(`statusCode ${statusCode} non-existent.`));
            });
        });

    });

});
