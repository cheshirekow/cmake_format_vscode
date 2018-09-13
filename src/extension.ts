'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('"cmake-format" extension is now active!');

    let disposable = vscode.languages.registerDocumentFormattingEditProvider(
        { scheme: 'file', language: 'cmake' }, {
            provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
                const cp = require('child_process')
                var replacementText = cp.execFileSync("cmake-format", ["-"], {
                    input: document.getText(),
                    encoding: 'utf-8'
                });
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