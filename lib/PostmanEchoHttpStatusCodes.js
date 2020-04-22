"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatusCodeAbstractSubclass_1 = require("./HttpStatusCodeAbstractSubclass");
class PostmanEchoHttpStatusCodes extends HttpStatusCodeAbstractSubclass_1.HttpStatusCodeAbstractSubclass {
    constructor() {
        super();
        this.replaceRecord(306, '(Unused)', {
            reasonPhrase: 'Switch Proxy',
            reference: ['Cohen, Josh. "HTTP/1.1 305 and 306 Response Codes". HTTP Working Group. Archived from the original on September 8, 2014. Retrieved September 8, 2014.']
        }).addRecord(418, {
            reasonPhrase: "I'm a Teapot",
            reference: ['RFC7168']
        }).replaceRecord(425, 'Too Early', {
            reasonPhrase: 'Unordered Collection',
            reference: ['RFC3648']
        });
    }
}
exports.PostmanEchoHttpStatusCodes = PostmanEchoHttpStatusCodes;
//# sourceMappingURL=PostmanEchoHttpStatusCodes.js.map