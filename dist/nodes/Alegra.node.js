"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alegra = void 0;
const axios_1 = __importDefault(require("axios"));
class Alegra {
    constructor() {
        this.description = {
            displayName: 'Alegra',
            name: 'alegra',
            icon: 'file:alegra.svg',
            group: ['transform'],
            version: 1,
            description: 'Interact with Alegra API',
            subtitle: '={{$parameter["operation"]}}',
            defaults: {
                name: 'Alegra',
                color: '#00b96b',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'alegraApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    options: [
                        { name: 'Invoice', value: 'invoice' },
                        { name: 'Contact', value: 'contact' },
                    ],
                    default: 'invoice',
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    options: [
                        { name: 'Create', value: 'create' },
                    ],
                    default: 'create',
                },
                {
                    displayName: 'Data',
                    name: 'data',
                    type: 'json',
                    default: '{}',
                    description: 'Data to send to Alegra API. Must match Alegra API format.'
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const credentials = await this.getCredentials('alegraApi');
        for (let i = 0; i < items.length; i++) {
            const resource = this.getNodeParameter('resource', i);
            const operation = this.getNodeParameter('operation', i);
            const data = this.getNodeParameter('data', i);
            let url = '';
            if (resource === 'invoice' && operation === 'create') {
                url = 'https://api.alegra.com/api/v1/invoices';
            }
            else if (resource === 'contact' && operation === 'create') {
                url = 'https://api.alegra.com/api/v1/contacts';
            }
            else {
                throw new Error('Unsupported resource/operation');
            }
            const auth = Buffer.from(`${credentials.email}:${credentials.apiKey}`).toString('base64');
            const response = await axios_1.default.post(url, data, {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json',
                },
            });
            returnData.push({ json: response.data });
        }
        return [returnData];
    }
}
exports.Alegra = Alegra;
