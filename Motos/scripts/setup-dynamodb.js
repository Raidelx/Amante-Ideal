const AWS = require('aws-sdk');

const region = process.env.AWS_REGION || 'us-east-1';
const endpoint = process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';
const tableName = process.env.DYNAMODB_TABLE || 'new-motoparts-partes';

AWS.config.update({
  region,
  endpoint,
  accessKeyId: 'local',
  secretAccessKey: 'local',
});

const dynamo = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

async function ensureTable() {
  try {
    await dynamo.describeTable({ TableName: tableName }).promise();
    console.log(`La tabla ${tableName} ya existe.`);
  } catch (error) {
    if (error.code !== 'ResourceNotFoundException') {
      throw error;
    }

    console.log(`Creando tabla ${tableName}...`);
    await dynamo
      .createTable({
        TableName: tableName,
        AttributeDefinitions: [
          { AttributeName: 'tipo', AttributeType: 'S' },
          { AttributeName: 'id', AttributeType: 'S' },
        ],
        KeySchema: [
          { AttributeName: 'tipo', KeyType: 'HASH' },
          { AttributeName: 'id', KeyType: 'RANGE' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      })
      .promise();

    await dynamo.waitFor('tableExists', { TableName: tableName }).promise();
    console.log(`Tabla ${tableName} creada.`);
  }
}

async function seedData() {
  const result = await docClient
    .scan({
      TableName: tableName,
      Limit: 1,
    })
    .promise();

  if (result.Count > 0) {
    console.log('La tabla ya contiene datos. No se insertó seed.');
    return;
  }

  const now = new Date().toISOString();
  const items = [
    {
      id: 'seed-1',
      nombre: 'Pastilla de freno',
      tipo: 'frenos',
      precio: 25.5,
      createdAt: now,
    },
    {
      id: 'seed-2',
      nombre: 'Cadena de transmisión',
      tipo: 'transmision',
      precio: 48.9,
      createdAt: now,
    },
    {
      id: 'seed-3',
      nombre: 'Espejo retrovisor',
      tipo: 'accesorios',
      precio: 12.0,
      createdAt: now,
    },
  ];

  for (const item of items) {
    await docClient
      .put({
        TableName: tableName,
        Item: item,
      })
      .promise();
  }

  console.log('Datos mínimos insertados correctamente.');
}

async function main() {
  try {
    await ensureTable();
    await seedData();
    console.log('DynamoDB local listo.');
  } catch (error) {
    console.error('Error preparando DynamoDB local:', error);
    process.exit(1);
  }
}

main();