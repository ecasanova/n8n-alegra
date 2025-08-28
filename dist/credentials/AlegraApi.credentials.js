"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlegraApi = void 0;
class AlegraApi {
    constructor() {
        this.name = 'alegraApi';
        this.displayName = 'Alegra API';
        this.documentationUrl = 'https://developer.alegra.com/reference/autenticaci%C3%B3n';
        this.properties = [
            {
                displayName: 'Email',
                name: 'email',
                type: 'string',
                default: '',
                description: 'Your Alegra account email',
            },
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
                description: 'Your Alegra API key',
            },
        ];
    }
}
exports.AlegraApi = AlegraApi;
