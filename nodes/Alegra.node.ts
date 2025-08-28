import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import axios from 'axios';

export class Alegra implements INodeType {
	description: INodeTypeDescription = {
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

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('alegraApi');

		for (let i = 0; i < items.length; i++) {
			const resource = this.getNodeParameter('resource', i) as string;
			const operation = this.getNodeParameter('operation', i) as string;
			const data = this.getNodeParameter('data', i) as object;

			let url = '';
			if (resource === 'invoice' && operation === 'create') {
				url = 'https://api.alegra.com/api/v1/invoices';
			} else if (resource === 'contact' && operation === 'create') {
				url = 'https://api.alegra.com/api/v1/contacts';
			} else {
				throw new Error('Unsupported resource/operation');
			}

			const auth = Buffer.from(`${credentials.email}:${credentials.apiKey}`).toString('base64');

			const response = await axios.post(url, data, {
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
