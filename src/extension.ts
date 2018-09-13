'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('"cmake-format" extension is now active!');

    // 👍 formatter implemented using API
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

// this method is called when your extension is deactivated
export function deactivate() {
}