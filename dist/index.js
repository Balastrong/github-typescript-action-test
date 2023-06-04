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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
function run() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (0, core_1.getInput)("gh-token");
        const label = (0, core_1.getInput)("label");
        const octokit = (0, github_1.getOctokit)(token);
        const pullRequest = github_1.context.payload.pull_request;
        try {
            yield octokit.rest.issues.addLabels({
                owner: github_1.context.repo.owner,
                repo: github_1.context.repo.repo,
                issue_number: pullRequest.number,
                labels: [label],
            });
        }
        catch (error) {
            if (error instanceof Error) {
                (0, core_1.setFailed)((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Unknown error");
            }
        }
    });
}
run();
