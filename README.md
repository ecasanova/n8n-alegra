# n8n Alegra API Connector Node

This project is an n8n custom node to connect with the Alegra API, supporting operations for creating invoices and contacts, with data normalization for Colombian parameters.

---

## Descripción en español

Este proyecto es un nodo personalizado para n8n que permite conectar con la API de Alegra. Soporta autenticación Basic Auth, creación de facturas y registro de contactos, e incluye normalización de datos para los parámetros requeridos en Colombia (tipo de identificación, departamentos, municipios, etc.).

### Recursos útiles
- Documentación general de la API: https://developer.alegra.com/
- Creación de facturas: https://developer.alegra.com/reference/post_invoices
- Registro de contactos: https://developer.alegra.com/reference/post_contacts
- Catálogo de parámetros Colombia: https://developer.alegra.com/reference/colombia
- Autenticación: https://developer.alegra.com/reference/autenticaci%C3%B3n

---

## Features
- Basic Auth credentials
- Create invoices (POST /invoices)
- Register contacts (POST /contacts)
- Data normalization for Colombian parameters

## Getting Started
1. Clone this repository into your n8n custom nodes directory.
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Add the node to your n8n instance.

## License
MIT
