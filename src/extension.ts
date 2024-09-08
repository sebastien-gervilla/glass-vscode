import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
    // Define the path to the server executable
    console.log("seifgzoi");

    let serverModule = context.asAbsolutePath(
        path.join('server', 'glass-language-server') // Ensure your Go server binary is placed here
    );

    console.log(path.join('server', 'glass-language-server'));


    // Server options
    let serverOptions: ServerOptions = {
        run: { command: serverModule },
        debug: { command: serverModule }
    };

    // Client options
    let clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'glass' }],
    };

    // Create the language client and start the client
    client = new LanguageClient(
        'glass-language',
        'Glass VSCode',
        serverOptions,
        clientOptions
    );

    // Start the client. This will also launch the server
    client.start();
}

export function deactivate(): Thenable<void> | undefined {
    if (!client) {
        return undefined;
    }
    return client.stop();
}