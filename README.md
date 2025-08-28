
# n8n-nodes-alegra

> Nodo personalizado de n8n para integración con la API de Alegra.

## Descripción

Este paquete permite conectar n8n con la API de Alegra para crear facturas y registrar contactos, incluyendo normalización de datos para Colombia (tipo de identificación, departamentos, municipios, etc.).

## Características

- Autenticación Basic Auth
- Crear facturas (POST /invoices)
- Registrar contactos (POST /contacts)
- Normalización de datos para parámetros colombianos

## Instalación

1. Clona este repositorio en tu carpeta de nodos personalizados de n8n.
2. Instala las dependencias:

 ```bash
 npm install
 ```

3. Compila el proyecto:

 ```bash
 npm run build
 ```

4. Reinicia n8n y verifica que el nodo "Alegra" aparece en el editor.

## Uso

1. Agrega el nodo "Alegra" a tu flujo.
2. Configura las credenciales con tu email y API Key de Alegra.
3. Selecciona el recurso (factura/contacto) y la operación (crear).
4. Proporciona los datos requeridos en formato JSON según la documentación de Alegra.

## Recursos útiles

- [Documentación general de la API](https://developer.alegra.com/)
- [Creación de facturas](https://developer.alegra.com/reference/post_invoices)
- [Registro de contactos](https://developer.alegra.com/reference/post_contacts)
- [Catálogo de parámetros Colombia](https://developer.alegra.com/reference/colombia)
- [Autenticación](https://developer.alegra.com/reference/autenticaci%C3%B3n)

## Pruebas y desarrollo

+Puedes probar el nodo localmente en tu instancia de n8n. 

## Licensia
MIT
