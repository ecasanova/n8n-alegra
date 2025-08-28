import { Alegra } from "../nodes/Alegra.node";
import { IExecuteFunctions, INodeExecutionData, INode } from "n8n-workflow";

// Mock del contexto de ejecución
const createMockExecuteFunctions = (
  nodeParameters: any,
  credentials: any,
  inputData: INodeExecutionData[]
): IExecuteFunctions => {
  return {
    getInputData: () => inputData,
    getNodeParameter: (parameterName: string, itemIndex: number) => {
      return nodeParameters[parameterName];
    },
    getCredentials: async (type: string) => {
      return credentials;
    },
    helpers: {
      request: async (options: any) => {
        // Mock de la respuesta de la API de Alegra
        console.log("Mock API Request:", options);

        if (options.url.includes("invoices")) {
          return {
            id: 123,
            numberTemplate: "INV-001",
            date: "2025-08-28",
            status: "open",
            client: { id: 1, name: "Cliente Test" },
            total: 1000,
          };
        } else if (options.url.includes("contacts")) {
          return {
            id: 456,
            name: "Contacto Test",
            email: "test@example.com",
            identification: "12345678",
            phone: "555-1234",
          };
        }

        throw new Error("Endpoint no soportado en el mock");
      },
    },
  } as unknown as IExecuteFunctions;
};

// Test básico del nodo
async function testAlegraNode() {
  console.log("🧪 Iniciando pruebas del nodo Alegra...\n");

  const alegraNode = new Alegra();

  // Test 1: Crear factura
  console.log("📝 Test 1: Crear factura");
  try {
    const mockContext = createMockExecuteFunctions(
      {
        resource: "invoice",
        operation: "create",
        data: {
          client: { id: 1 },
          date: "2025-08-28",
          items: [
            {
              name: "Producto Test",
              price: 1000,
              quantity: 1,
            },
          ],
        },
      },
      {
        email: "test@example.com",
        apiKey: "test-api-key",
      },
      [{ json: {} }]
    );

    const result = await alegraNode.execute.call(mockContext);
    console.log("✅ Factura creada exitosamente:", result[0][0].json);
  } catch (error) {
    console.log("❌ Error creando factura:", error);
  }

  // Test 2: Crear contacto
  console.log("\n👤 Test 2: Crear contacto");
  try {
    const mockContext = createMockExecuteFunctions(
      {
        resource: "contact",
        operation: "create",
        data: {
          name: "Juan Pérez",
          email: "juan@example.com",
          identification: "12345678",
          phone: "555-1234",
        },
      },
      {
        email: "test@example.com",
        apiKey: "test-api-key",
      },
      [{ json: {} }]
    );

    const result = await alegraNode.execute.call(mockContext);
    console.log("✅ Contacto creado exitosamente:", result[0][0].json);
  } catch (error) {
    console.log("❌ Error creando contacto:", error);
  }

  // Test 3: Operación no soportada
  console.log("\n🚫 Test 3: Operación no soportada");
  try {
    const mockContext = createMockExecuteFunctions(
      {
        resource: "product",
        operation: "create",
        data: {},
      },
      {
        email: "test@example.com",
        apiKey: "test-api-key",
      },
      [{ json: {} }]
    );

    const result = await alegraNode.execute.call(mockContext);
    console.log("❌ No debería llegar aquí");
  } catch (error) {
    console.log(
      "✅ Error esperado para operación no soportada:",
      (error as Error).message
    );
  }

  console.log("\n🎉 Pruebas completadas!");
}

// Ejecutar las pruebas
testAlegraNode().catch(console.error);
