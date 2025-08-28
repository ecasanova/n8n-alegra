# Script para instalar en servidor remoto

#!/bin/bash

SERVER_USER="tu-usuario"
SERVER_HOST="tu-servidor.com"
N8N_PATH="/ruta/a/n8n"  # Ajusta según tu instalación

echo "🚀 Instalando nodo Alegra en servidor remoto..."

# Compilar localmente
echo "🔨 Compilando proyecto..."
npm run build

# Crear paquete
echo "📦 Creando paquete..."
tar -czf n8n-nodes-alegra.tar.gz dist/ alegra.svg package.json

# Subir al servidor
echo "⬆️ Subiendo al servidor..."
scp n8n-nodes-alegra.tar.gz $SERVER_USER@$SERVER_HOST:/tmp/

# Instalar en servidor
echo "🛠️ Instalando en servidor..."
ssh $SERVER_USER@$SERVER_HOST << 'EOF'
    # Crear directorio de nodos
    mkdir -p ~/.n8n/nodes/n8n-nodes-alegra
    
    # Extraer archivos
    cd ~/.n8n/nodes/n8n-nodes-alegra
    tar -xzf /tmp/n8n-nodes-alegra.tar.gz
    
    # Instalar dependencias (solo las necesarias para producción)
    npm install --production --silent
    
    # Limpiar
    rm /tmp/n8n-nodes-alegra.tar.gz
    
    # Reiniciar n8n (ajusta según tu configuración)
    sudo systemctl restart n8n
    # O si usas PM2: pm2 restart n8n
EOF

echo "✅ Nodo instalado en servidor remoto!"
echo "El nodo 'Alegra' debería aparecer en la UI de n8n"

# Limpiar archivo local
rm n8n-nodes-alegra.tar.gz
