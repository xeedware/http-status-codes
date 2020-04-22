import {IanaHttpStatusCodes} from '../src';
import {HttpStatusSubclassTestHelper} from './lib/HttpStatusCodeAbstractSubclassTestHelper';
import {ReasonPhrase, Record, Reference} from '../src';

describe('HttpStatusSubclassTestHelper', () => {

    let validStatusCodes: number[];
    const ianaHttpStatus = new IanaHttpStatusCodes();
    validStatusCodes = Object.keys((ianaHttpStatus).getDataset()).map(statusCode => Number(statusCode));
    const invalidStatusCodes = [150, 250, 350, 475, 550];

    describe('IanaHttpStatus defined methods', () => {

        let httpStatusSubclassTestHelper: HttpStatusSubclassTestHelper;
        beforeAll(() => {
            httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();
        });

        describe('getData', () => {

            it('should return a dataset containing codes 418 but not 250.', () => {
                const result = httpStatusSubclassTestHelper.getDataset();
                expect(result).toBeDefined();

                // contains 418
                const statusCodes = Object.keys(result).map(statusCode => Number(statusCode));
                expect(statusCodes.findIndex(statusCode => statusCode === 418)).toBeGreaterThan(-1);

                // devoid of 250
                expect(statusCodes.findIndex(statusCode => statusCode === 250)).toEqual(-1);
            });

        });

        describe('getRecord', () => {

            it('invalid code should throw Error', () => {
                invalidStatusCodes.forEach(statusCode => {
                    expect(() => {
                        httpStatusSubclassTestHelper.getRecord(statusCode);
                    }).toThrow(new Error(`statusCode ${statusCode} non-existent.`));
                });
            });

            it('valid codes should return a value', () => {
                validStatusCodes.forEach((statusCode => {
                    const result = httpStatusSubclassTestHelper.getRecord(statusCode);
                    expect(result).toBeDefined();
                }));
            });

        });

        describe('getReasonPhrase', () => {

            it('invalid code should return undefined', () => {
                invalidStatusCodes.forEach(statusCode => {
                    expect(() => {
                        httpStatusSubclassTestHelper.getReasonPhrase(statusCode);
                    }).toThrow(new Error(`statusCode ${statusCode} non-existent.`));
                });
            });

            it('valid codes should return a value', () => {
                validStatusCodes.forEach((statusCode => {
                    const result = httpStatusSubclassTestHelper.getReasonPhrase(statusCode);
                    expect(result).toBeDefined();
                    console.log(result);
                }));
            });

        });

        describe('getReference', () => {

            it('invalid code should return undefined.', () => {
                invalidStatusCodes.forEach(statusCode => {
                    expect(() => {
                        httpStatusSubclassTestHelper.getReference(statusCode);
                    }).toThrow(new Error(`statusCode ${statusCode} non-existent.`));
                });
            });


            it('valid codes should return a value', () => {
                validStatusCodes.forEach((statusCode => {
                    const result = httpStatusSubclassTestHelper.getReference(Number(statusCode));
                    expect(result).toBeDefined();
                    console.log(result);
                }));
            });
        });

    });

    describe('HttpStatusAbstractSubclass defined methods', () => {

        describe('public', () => {

            let httpStatusSubclassTestHelper: HttpStatusSubclassTestHelper;
            beforeAll(() => {
                httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();
            });

            const multiEntryRecordStatusList = [418];

            describe('hasAlternatives', () => {

                describe('invalid status codes', () => {

                    invalidStatusCodes.forEach(statusCode => {

                        it(`hasAlternatives(${statusCode}) should throw an Error`, () => {
                            expect(() => {
                                httpStatusSubclassTestHelper.hasAlternatives(statusCode);
                            }).toThrow(new Error(`statusCode ${statusCode} non-existent.`));
                        });

                    });

                });

                describe('valid status codes with multiple records', () => {

                    multiEntryRecordStatusList.forEach(statusCode => {

                        it(`hasAlternatives(${statusCode}) should return true`, () => {
                            const result = httpStatusSubclassTestHelper.hasAlternatives(statusCode);
                            expect(result).toBeTruthy();
                        });

                    });


                });

            });

            describe('getRecords', () => {

                describe('invalid status codes', () => {

                    invalidStatusCodes.forEach(statusCode => {

                        it(`getRecords(${statusCode}) should return undefined`, () => {
                            expect(() => {
                                httpStatusSubclassTestHelper.getRecords(statusCode);
                            }).toThrow(new Error(`statusCode ${statusCode} non-existent.`));
                        });

                    });

                });

                describe('valid status code with multiple records', () => {

                    multiEntryRecordStatusList.forEach(statusCode => {

                        it(`getRecords(${statusCode}) should return an array`, () => {
                            const result = httpStatusSubclassTestHelper.getRecords(statusCode);
                            expect(Array.isArray(result)).toBeTruthy();
                        });

                    });

                });

            });

            describe('getReasonPhrases', () => {

                describe('invalid status codes', () => {

                    invalidStatusCodes.forEach(statusCode => {

                        it(`getReasonPhrases(${statusCode}) should return undefined`, () => {
                            expect(() => {
                                httpStatusSubclassTestHelper.getReasonPhrases(statusCode);
                            }).toThrow(new Error(`statusCode ${statusCode} non-existent.`));
                        });

                    });

                });

                describe('valid status code with multiple records', () => {

                    multiEntryRecordStatusList.forEach(statusCode => {

                        it(`getReasonPhrases(${statusCode}) should return an array`, () => {
                            const result = httpStatusSubclassTestHelper.getReasonPhrases(statusCode);
                            expect(Array.isArray(result)).toBeTruthy();
                        });

                    });


                });

            });

            describe('getReferences', () => {

                describe('invalid status codes', () => {

                    invalidStatusCodes.forEach(statusCode => {

                        it(`getReferences(${statusCode}) should return undefined`, () => {
                            expect(() => {
                                httpStatusSubclassTestHelper.getReferences(statusCode);
                            }).toThrow(new Error(`statusCode ${statusCode} non-existent.`));
                        });

                    });

                });

                describe('valid status code with multiple records', () => {

                    multiEntryRecordStatusList.forEach(statusCode => {
                        it(`getReferences(${statusCode}) should return an array of HttpStatusCodeReference`, () => {
                            const result = httpStatusSubclassTestHelper.getReferences(statusCode);
                            expect(result).toBeDefined();
                            expect(Array.isArray(result)).toBeTruthy();
                            // @ts-ignore
                            expect(result.length).toBeGreaterThan(1);
                            // @ts-ignore
                            expect(Array.isArray(result[0])).toBeTruthy();
                        });
                    });

                });

            });

        });

        describe('protected', () => {

            describe('methods unchained', () => {

                describe('addRecord', () => {

                    describe('invalid statusCode', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();

                        invalidStatusCodes.forEach(statusCode => {

                            it(`addRecord(${statusCode}) should return httpStatusSubclassTestHelper.`, () => {
                                const retval = httpStatusSubclassTestHelper.publicAddRecord(
                                    statusCode,
                                    {
                                        reasonPhrase: 'New Reason Phrase',
                                        reference: ["Reference 1", "Reference2"]
                                    }
                                );
                                expect(retval).toEqual(httpStatusSubclassTestHelper);
                                expect(
                                    retval.getReferences.length
                                ).toEqual(1);
                            });

                        })

                    });

                    describe('valid statusCode', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();

                        validStatusCodes.forEach(statusCode => {

                            it(`addRecord(${statusCode}) should return httpStatusSubclassTestHelper.`, () => {
                                const retval = httpStatusSubclassTestHelper.publicAddRecord(
                                    statusCode,
                                    {
                                        reasonPhrase: 'New Reason Phrase',
                                        reference: ["Reference 1", "Reference2"]
                                    }
                                );
                                expect(retval).toEqual(httpStatusSubclassTestHelper);
                                // @ts-ignore
                                expect(
                                    retval.getReferences(statusCode).length
                                ).toBeGreaterThan(1);
                            });

                        });

                    });

                });

                describe('deleteCode', () => {

                    describe('invalid statusCode', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();

                        invalidStatusCodes.forEach(statusCode => {

                            it(`deleteCode(${statusCode}) should throw Error.`, () => {
                                expect(() => {
                                    httpStatusSubclassTestHelper.publicDeleteCode(statusCode);
                                }).toThrowError(new Error(`statusCode ${statusCode} non-existent.`))
                            });

                        })

                    });

                    describe('valid statusCode', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();

                        validStatusCodes.forEach(statusCode => {

                            it(`deleteCode(${statusCode}) should return httpStatusSubclassTestHelper.`, () => {
                                expect(
                                    httpStatusSubclassTestHelper.publicDeleteCode(statusCode)
                                ).toEqual(httpStatusSubclassTestHelper);
                                // Insure status code deleted.
                                expect(() => {
                                    httpStatusSubclassTestHelper.getReasonPhrase(statusCode);
                                }).toThrow(new Error(`statusCode ${statusCode} non-existent.`));
                            });

                        });

                    });

                });

                describe('deleteRecord', () => {

                    describe('invalid statusCode', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();

                        invalidStatusCodes.forEach(statusCode => {

                            it(`deleteRecord(${statusCode}, 'Something') should throw Error.`, () => {
                                expect(() => {
                                    httpStatusSubclassTestHelper.publicDeleteRecord(
                                        statusCode,
                                        'Something',
                                    );
                                }).toThrowError(new Error(`statusCode ${statusCode} non-existent.`))
                            });

                        })

                    });

                    describe('valid statusCode', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();

                        validStatusCodes.forEach(statusCode => {
                            const reasonPhrase = httpStatusSubclassTestHelper.getReasonPhrase(statusCode);
                            it(`deleteRecord(${statusCode}, '${reasonPhrase}') should return httpStatusSubclassTestHelper.`, () => {
                                const retval = httpStatusSubclassTestHelper.publicDeleteRecord(
                                    statusCode,
                                    reasonPhrase,
                                );
                                expect(retval).toEqual(httpStatusSubclassTestHelper);
                                expect(() => {
                                    httpStatusSubclassTestHelper.getRecords(statusCode)
                                }).toThrow(new Error(`statusCode ${statusCode} non-existent.`));
                            });

                        });

                    });

                    describe(`valid statusCode with multiple records`, () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();

                        validStatusCodes.forEach(statusCode => {

                            const reasonPhrase = httpStatusSubclassTestHelper.getReasonPhrase(statusCode);
                            httpStatusSubclassTestHelper.publicAddRecord(
                                statusCode,
                                {
                                    reasonPhrase: 'New Reason',
                                    reference: ["New Reference"]
                                }
                            );

                            it(`deleteRecord(${statusCode}, '${reasonPhrase}') should return httpStatusSubclassTestHelper.`, () => {
                                const retval = httpStatusSubclassTestHelper.publicDeleteRecord(
                                    statusCode,
                                    reasonPhrase,
                                );
                                expect(retval).toEqual(httpStatusSubclassTestHelper);
                                expect(retval.getRecords(statusCode).length).toEqual(1);
                            });

                        });

                    });

                    describe('valid statusCode, invalid reasonPhrase', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();
                        const reasonPhrase = 'Bogus Reason';
                        validStatusCodes.forEach(statusCode => {

                            it(`deleteRecord(${statusCode}, ${reasonPhrase}) should throw Error`, () => {
                                expect(() => {
                                    httpStatusSubclassTestHelper.publicDeleteRecord(
                                        statusCode,
                                        'Bogus Reason'
                                    );
                                }).toThrow(new Error(`Record with reasonPhrase "${reasonPhrase}" for statusCode ${statusCode} non-existent.`));
                            });

                        });

                    });

                });

                describe('replaceRecord', () => {

                    describe('invalid statusCode', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();

                        invalidStatusCodes.forEach(statusCode => {

                            it(`replaceRecord(${statusCode}, 'Something') should throw Error.`, () => {
                                expect(() => {
                                    httpStatusSubclassTestHelper.publicReplaceRecord(
                                        statusCode,
                                        'Something phrase',
                                        {
                                            reasonPhrase: 'New Reason Phrase',
                                            reference: ["Reference 1", "Reference2"]
                                        }
                                    );
                                }).toThrowError(new Error(`statusCode ${statusCode} non-existent.`))
                            });

                        })

                    });

                    describe('valid statusCode', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();

                        validStatusCodes.forEach(statusCode => {
                            const reasonPhrase = httpStatusSubclassTestHelper.getReasonPhrase(statusCode);
                            it(`replaceRecord(${statusCode}, '${reasonPhrase}') should return httpStatusSubclassTestHelper.`, () => {
                                const newRecord: Record = {
                                    reasonPhrase: 'New Reason Phrase',
                                    reference: ["Reference 1", "Reference2"]
                                };
                                const retval = httpStatusSubclassTestHelper.publicReplaceRecord(
                                    statusCode,
                                    reasonPhrase,
                                    newRecord
                                );
                                expect(retval).toEqual(httpStatusSubclassTestHelper);
                                expect(
                                    httpStatusSubclassTestHelper.getReasonPhrase(statusCode)
                                ).toEqual(newRecord.reasonPhrase);
                                expect(
                                    httpStatusSubclassTestHelper.getReference(statusCode)
                                ).toEqual(newRecord.reference);
                            });

                        });

                    });

                });

                describe('replaceReasonPhrase', () => {

                    describe('invalid statusCode', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();

                        invalidStatusCodes.forEach(statusCode => {

                            it(`replacePhrase(${statusCode}, 'Something') should throw Error.`, () => {
                                const newPhrase: ReasonPhrase = 'New Reason Phrase';
                                expect(() => {
                                    httpStatusSubclassTestHelper.publicReplaceReasonPhrase(
                                        statusCode,
                                        'Something phrase',
                                        newPhrase
                                    );
                                }).toThrowError(new Error(`statusCode ${statusCode} non-existent.`))
                            });

                        })

                    });

                    describe('valid statusCode', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();

                        validStatusCodes.forEach(statusCode => {
                            const reasonPhrase = httpStatusSubclassTestHelper.getReasonPhrase(statusCode);
                            it(`replacePhrase(${statusCode}, '${reasonPhrase}') should return httpStatusSubclassTestHelper.`, () => {
                                const newPhrase: ReasonPhrase = 'New Reason Phrase';
                                const retval = httpStatusSubclassTestHelper.publicReplaceReasonPhrase(
                                    statusCode,
                                    reasonPhrase,
                                    newPhrase
                                );
                                expect(retval).toEqual(httpStatusSubclassTestHelper);
                                expect(
                                    httpStatusSubclassTestHelper.getReasonPhrase(statusCode)
                                ).toEqual(newPhrase);
                            });

                        });

                    });

                    describe('valid statusCode, non-existent oldReason', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();
                        const reasonPhrase = 'Bogus Reason';
                        validStatusCodes.forEach(statusCode => {

                            it(`replaceReasonPhrase(${statusCode}, non-existent reasonPhrase should throw Error`, () => {
                                expect(() => {
                                    httpStatusSubclassTestHelper.publicReplaceReasonPhrase(
                                        statusCode,
                                        'Bogus Reason',
                                        'Some Reason'
                                    );
                                }).toThrow(new Error(`Record with reasonPhrase "${reasonPhrase}" for statusCode ${statusCode} non-existent.`));
                            });

                        });

                    });

                    describe('valid statusCode, empty oldReason', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();
                        const oldReasonPhrase = '';
                        const newReasonPhrase = 'Some Reason';
                        validStatusCodes.forEach(statusCode => {

                            it(`replaceReasonPhrase(${statusCode}, empty oldReasonPhrase should throw Error`, () => {
                                expect(() => {
                                    httpStatusSubclassTestHelper.publicReplaceReasonPhrase(
                                        statusCode,
                                        oldReasonPhrase,
                                        newReasonPhrase
                                    );
                                }).toThrow(new Error('The oldReasonPhrase argument is empty.'));
                            });

                        });

                    });

                    describe('valid statusCode, empty newReason', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();
                        const newReasonPhrase = '';
                        validStatusCodes.forEach(statusCode => {

                            it(`replaceReasonPhrase(${statusCode}, empty newReasonPhrase should throw Error`, () => {
                                expect(() => {
                                    httpStatusSubclassTestHelper.publicReplaceReasonPhrase(
                                        statusCode,
                                        httpStatusSubclassTestHelper.getReasonPhrase(statusCode),
                                        newReasonPhrase
                                    );
                                }).toThrow(new Error('The newReasonPhrase argument is empty.'));
                            });

                        });

                    });

                });

                describe('replaceReference', () => {

                    describe('invalid statusCode', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();

                        invalidStatusCodes.forEach(statusCode => {

                            it(`replaceReference(${statusCode}, 'Something') should throw Error.`, () => {
                                const newReference: Reference = ["Reference 1", "Reference2"];
                                expect(() => {
                                    httpStatusSubclassTestHelper.publicReplaceReference(
                                        statusCode,
                                        'Something phrase',
                                        newReference
                                    );
                                }).toThrowError(new Error(`statusCode ${statusCode} non-existent.`))
                            });

                        })

                    });

                    describe('valid statusCode', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();

                        validStatusCodes.forEach(statusCode => {
                            const reasonPhrase = httpStatusSubclassTestHelper.getReasonPhrase(statusCode);
                            const newReference: Reference = ["Reference 1", "Reference2"];
                            it(`replaceReference(${statusCode}, '${reasonPhrase}') should return httpStatusSubclassTestHelper.`, () => {
                                const retval = httpStatusSubclassTestHelper.publicReplaceReference(
                                    statusCode,
                                    reasonPhrase,
                                    newReference
                                );
                                expect(retval).toEqual(httpStatusSubclassTestHelper);
                                expect(
                                    httpStatusSubclassTestHelper.getReference(statusCode)
                                ).toEqual(newReference);
                            });

                        });

                    });

                    describe('valid statusCode, empty oldReason', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();
                        validStatusCodes.forEach(statusCode => {

                            it(`replaceReReference(${statusCode}, empty reasonPhrase should throw Error`, () => {
                                expect(() => {
                                    httpStatusSubclassTestHelper.publicReplaceReference(
                                        statusCode,
                                        '',
                                        ['Some Reference']
                                    );
                                }).toThrow(new Error('The reasonPhrase argument is empty.'));
                            });

                        });

                    });

                    describe('valid statusCode, empty reference array', () => {

                        const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();
                        validStatusCodes.forEach(statusCode => {

                            const reasonPhrase = "Bogus Reason";

                            it(`replaceReReference(${statusCode}, bogus reasonPhrase should throw Error`, () => {
                                expect(() => {
                                    httpStatusSubclassTestHelper.publicReplaceReference(
                                        statusCode,
                                        reasonPhrase,
                                        []
                                    );
                                }).toThrow(Error(`Record with reasonPhrase "${reasonPhrase}" for statusCode ${statusCode} non-existent.`));
                            });

                        });

                    });

                });

            });

        });

        describe('methods chaining', () => {

            it('all protected methods should succeed', () => {

                const httpStatusSubclassTestHelper = new HttpStatusSubclassTestHelper();

                // Chain all:
                //  addRecord
                //  deleteStatusCode
                //  deleteRecord
                //  replaceRecord
                //  replaceReasonPhrase
                //  replaceReference
                const retval = httpStatusSubclassTestHelper
                    .publicAddRecord(
                        666,
                        {
                            reasonPhrase: 'Evil',
                            reference: ["Holy Bible"]
                        }
                    )
                    .publicDeleteCode(
                        666
                    )
                    .publicAddRecord(
                        700,
                        {
                            reasonPhrase: 'My 700 Reason',
                            reference: ["My 700 Reference"]
                        }
                    )
                    .publicAddRecord(
                        800,
                        {
                            reasonPhrase: 'My 800 Reason',
                            reference: ["My 800 Reference"]
                        }
                    )
                    .publicReplaceRecord(
                        800,
                        'My 800 Reason',
                        {
                            reasonPhrase: 'My 800 Reason replacement',
                            reference: ['My 800 Reference replacement'],
                        }
                    )
                    .publicAddRecord(
                        900,
                        {
                            reasonPhrase: 'My 900 Reason',
                            reference: ["My 900 Reference"]
                        }
                    )
                    .publicReplaceReference(
                        900,
                        'My 900 Reason',
                        ['My 900 Reference replacement']
                    )
                    .publicReplaceReasonPhrase(
                        900,
                        'My 900 Reason',
                        'My 900 Reason replacement'
                    );

                expect(retval).toEqual(httpStatusSubclassTestHelper);

                expect(() => {
                    httpStatusSubclassTestHelper.getRecord(666);
                }).toThrow(new Error(`statusCode 666 non-existent.`));

                let code700Record;
                expect(() => {
                    code700Record = httpStatusSubclassTestHelper.getRecord(700);
                }).not.toThrow();
                // @ts-ignore
                expect(code700Record.reasonPhrase).toEqual('My 700 Reason');
                // @ts-ignore
                expect(code700Record.reference).toEqual(['My 700 Reference']);

                let code800Record;
                expect(() => {
                    code800Record = httpStatusSubclassTestHelper.getRecord(800);
                }).not.toThrow();
                // @ts-ignore
                expect(code800Record.reasonPhrase).toEqual('My 800 Reason replacement');
                // @ts-ignore
                expect(code800Record.reference).toEqual(['My 800 Reference replacement']);

                let code900Record;
                expect(() => {
                    code900Record = httpStatusSubclassTestHelper.getRecord(900);
                }).not.toThrow();
                // @ts-ignore
                expect(code900Record.reasonPhrase).toEqual('My 900 Reason replacement');
                // @ts-ignore
                expect(code900Record.reference).toEqual(['My 900 Reference replacement']);

            });

        });

    });

});
