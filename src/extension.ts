'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "cmake-format" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);


    // 👎 formatter implemented as separate command
    vscode.commands.registerCommand('extension.format-foo', () => {
        const { activeTextEditor } = vscode.window;

        if (activeTextEditor && activeTextEditor.document.languageId === 'foo-lang') {
            const { document } = activeTextEditor;
            var firstLine = document.lineAt(0);
            var lastLine = document.lineAt(document.lineCount - 1);
            var wholeRange = new vscode.Range(0,
                firstLine.range.start.character,
                document.lineCount - 1,
                lastLine.range.end.character);

            const edit = new vscode.WorkspaceEdit();
            edit.replace(document.uri, wholeRange, "Replacement text");
            return vscode.workspace.applyEdit(edit)
        }
    });

    // 👍 formatter implemented using API
    vscode.languages.registerDocumentFormattingEditProvider('foo-lang', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            var firstLine = document.lineAt(0);
            var lastLine = document.lineAt(document.lineCount - 1);
            var wholeRange = new vscode.Range(0,
                firstLine.range.start.character,
                document.lineCount - 1,
                lastLine.range.end.character);
            return [vscode.TextEdit.replace(wholeRange, "Replacement text")];
        }
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}