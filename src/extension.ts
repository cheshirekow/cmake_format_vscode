'use strict';

import * as vscode from 'vscode';

function isEmpty(obj: any) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function activate(context: vscode.ExtensionContext) {
    console.log('"cmake-format" extension is now active!');

    let disposable = vscode.languages.registerDocumentFormattingEditProvider(
        { scheme: 'file', language: 'cmake' }, {
            provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
                var config = vscode.workspace.getConfiguration('cmakeFormat');
                var exePath = config.get("exePath");
                var args = config.get<string[]>("args", []).concat(["-"]);
                var opts: any = {
                    input: document.getText(),
                    encoding: 'utf-8'
                };

                var cwd = config.get("cwd");
                if (cwd === null) {
                    cwd = vscode.workspace.getWorkspaceFolder(document.uri);
                }
                if (cwd === null && document.uri.fsPath !== null) {
                    cwd = require('path').dirname(document.uri.fsPath)
                }
                if (cwd !== null) {
                    opts["cwd"] = cwd;
                }

                var env: any = {}
                if (config.get("mergeEnv", true)) {
                    env = JSON.parse(JSON.stringify(process.env));
                }
                var cenv: any = config.get("env", {});
                if (cenv !== null) {
                    var delim = require('path').delimeter;
                    for (var [key, value] of Object.entries(cenv)) {
                        if (key.endsWith("PATH")) {
                            var items = cenv[key].split(delim);
                            if (key in env) {
                                items = items.concat(env[key].spit(delim));
                            }
                            env[key] = items.join(delim);
                        } else {
                            env[key] = value;
                        }
                    }
                }
                if (!isEmpty(env)) {
                    opts["env"] = env;
                }

                const cp = require('child_process')
                var replacementText = cp.execFileSync(exePath, args, opts);
                var firstLine = document.lineAt(0);
                var lastLine = document.lineAt(document.lineCount - 1);
                var wholeRange = new vscode.Range(0,
                    firstLine.range.start.character,
                    document.lineCount - 1,
                    lastLine.range.end.character);
                return [vscode.TextEdit.replace(wholeRange, replacementText)];
            }
        });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}