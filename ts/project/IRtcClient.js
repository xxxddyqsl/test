"use strict";
exports.__esModule = true;
exports.MakeRtcClient = void 0;
var RtcClientImpl_1 = require("./RtcClientImpl");
;
function MakeRtcClient() {
    return RtcClientImpl_1.NewRtcClient();
}
exports.MakeRtcClient = MakeRtcClient;
