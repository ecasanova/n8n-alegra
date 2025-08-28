# Script para instalar el nodo en n8n

echo "🚀 Instalando nodo Alegra en n8n..."

# Verificar que n8n esté instalado
if ! command -v n8n &> /dev/null; then
    echo "❌ n8n no está instalado. Instálalo primero:"
    echo "npm install -g n8n"
    exit 1
fi

# Crear directorio de nodos personalizados
echo "📁 Creando directorio de nodos personalizados..."
mkdir -p ~/.n8n/nodes

# Compilar el proyecto
echo "🔨 Compilando proyecto..."
npm run build

# Copiar archivos al directorio de n8n
echo "📋 Copiando archivos..."
rm -rf ~/.n8n/nodes/n8n-nodes-alegra
cp -r . ~/.n8n/nodes/n8n-nodes-alegra

# Instalar dependencias de producción
echo "📦 Instalando dependencias..."
cd ~/.n8n/nodes/n8n-nodes-alegra
npm install --production --silent

# Configurar variables de entorno
echo "⚙️ Configurando variables de entorno..."
echo "export N8N_CUSTOM_EXTENSIONS=~/.n8n/nodes" >> ~/.bashrc
echo "export N8N_CUSTOM_EXTENSIONS=~/.n8n/nodes" >> ~/.zshrc

echo "✅ Nodo Alegra instalado correctamente!"
echo ""
echo "Para usar el nodo:"
echo "1. Reinicia tu terminal o ejecuta: export N8N_CUSTOM_EXTENSIONS=~/.n8n/nodes"
echo "2. Inicia n8n: n8n start"
echo "3. Busca 'Alegra' en el panel de nodos"
echo "4. Configura credenciales: email + API key de Alegra"
