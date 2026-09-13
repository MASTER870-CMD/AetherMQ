"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtocolParser = exports.Command = void 0;
var Command;
(function (Command) {
    Command[Command["PUBLISH"] = 1] = "PUBLISH";
    Command[Command["SUBSCRIBE"] = 2] = "SUBSCRIBE";
    Command[Command["POLL"] = 3] = "POLL";
    Command[Command["ACK"] = 4] = "ACK";
})(Command || (exports.Command = Command = {}));
class ProtocolParser {
    static parse(data) {
        const cmd = data.readUInt8(0);
        const payload = data.subarray(1);
        return { cmd, payload };
    }
}
exports.ProtocolParser = ProtocolParser;
//# sourceMappingURL=Protocol.js.map