const AWS = require('aws-sdk');

const region = process.env.AWS_REGION || 'us-east-1';
const endpoint = process.env.DYNAMODB_ENDPOINT || undefined;

const config = {
  region,
  endpoint,
};

if (endpoint) {
  config.accessKeyId = 'local';
  config.secretAccessKey = 'local';
}

AWS.config.update(config);

const dynamoDb = new AWS.DynamoDB.DocumentClient({
  convertEmptyValues: true,
});

const tableName = process.env.DYNAMODB_TABLE || 'new-motoparts-partes';

module.exports = {
  AWS,
  dynamoDb,
  tableName,
};