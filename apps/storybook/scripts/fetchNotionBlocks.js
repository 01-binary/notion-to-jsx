"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var notion_to_utils_1 = require("notion-to-utils");
var dotenv_1 = require("dotenv");
// 환경 변수 로드
dotenv_1.default.config();
// 페이지 ID
var PAGE_ID = '1239c6bf-2b17-8076-a838-d17ca1c89783';
function fetchAndSaveBlocks() {
    return __awaiter(this, void 0, void 0, function () {
        var apiKey, client, blocks, outputPath, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    apiKey = process.env.NOTION_API_KEY;
                    if (!apiKey) {
                        console.error('NOTION_API_KEY 환경 변수가 설정되지 않았습니다.');
                        process.exit(1);
                    }
                    console.log('Notion API에서 블록 데이터를 가져오는 중...');
                    client = new notion_to_utils_1.Client({ auth: apiKey });
                    return [4 /*yield*/, client.getPageBlocks(PAGE_ID)];
                case 1:
                    blocks = _a.sent();
                    outputPath = (0, path_1.join)(__dirname, '../src/data/notionBlocks.json');
                    (0, fs_1.writeFileSync)(outputPath, JSON.stringify(blocks, null, 2), 'utf8');
                    console.log("\uBE14\uB85D \uB370\uC774\uD130\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC800\uC7A5\uB418\uC5C8\uC2B5\uB2C8\uB2E4: ".concat(outputPath));
                    console.log("\uCD1D ".concat(blocks.length, "\uAC1C\uC758 \uBE14\uB85D\uC744 \uAC00\uC838\uC654\uC2B5\uB2C8\uB2E4."));
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('블록 데이터 가져오기 실패:', error_1);
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// 스크립트 실행
fetchAndSaveBlocks();
