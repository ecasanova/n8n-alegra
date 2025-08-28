import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class AlegraApi implements ICredentialType {
	name = 'alegraApi';
	displayName = 'Alegra API';
	documentationUrl = 'https://developer.alegra.com/reference/autenticaci%C3%B3n';
	properties: INodeProperties[] = [
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
