# Tests del Nodo Alegra

## Pruebas Unitarias (Mock)

Las pruebas unitarias utilizan datos simulados y verifican:

✅ **Creación de facturas** - El nodo procesa correctamente los datos de factura  
✅ **Creación de contactos** - El nodo maneja datos de contactos apropiadamente  
✅ **Manejo de errores** - Operaciones no soportadas generan errores correctos  

Ejecutar: `npm test`

## Pruebas de Integración (API Real)

Para probar con la API real de Alegra:

1. **Configura variables de entorno**:
   ```bash
   export ALEGRA_EMAIL="tu-email@ejemplo.com"
   export ALEGRA_API_KEY="tu-api-key"
   ```

2. **Ejecuta pruebas de integración**:
   ```bash
   npm run test:integration
   ```

## Pruebas Manuales en n8n

### Instalación Local para Pruebas

1. **Copia los archivos compilados**:
   ```bash
   # Crea directorio de nodos personalizados
   mkdir -p ~/.n8n/nodes/n8n-nodes-alegra
   
   # Copia archivos compilados
   cp -r dist/* ~/.n8n/nodes/n8n-nodes-alegra/
   cp alegra.svg ~/.n8n/nodes/n8n-nodes-alegra/
   
   # Copia package.json
   cp package.json ~/.n8n/nodes/n8n-nodes-alegra/
   ```

2. **Configura n8n**:
   ```bash
   export N8N_CUSTOM_EXTENSIONS=~/.n8n/nodes
   n8n start
   ```

3. **Prueba el nodo**:
   - Busca "Alegra" en el panel de nodos
   - Configura credenciales (email + API key)
   - Crea un flujo simple para probar

### Casos de Prueba Manual

#### Crear Factura
```json
{
  "client": {
    "id": 1
  },
  "date": "2025-08-28",
  "items": [
    {
      "name": "Servicio de consultoría",
      "price": 150000,
      "quantity": 1
    }
  ]
}
```

#### Crear Contacto
```json
{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "identification": "12345678-9",
  "phone": "+57 300 123 4567",
  "address": {
    "address": "Calle 123 #45-67",
    "city": "Bogotá"
  }
}
```

## Validación de Datos

El nodo debería validar:
- Credenciales válidas (email + API key)
- Formato JSON correcto en el campo `data`
- IDs de cliente existentes para facturas
- Campos requeridos según la API de Alegra

## Próximos Pasos

1. **Agregar más operaciones**: Consultar, actualizar, eliminar
2. **Mejor validación**: Campos requeridos y opcionales
3. **Normalización de datos**: Catálogos de Colombia automáticos
4. **Manejo de errores**: Respuestas más descriptivas
5. **Paginación**: Para consultas que devuelven múltiples resultados
