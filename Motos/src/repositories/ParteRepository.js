const { dynamoDb, tableName } = require('../config/dynamo');

class ParteRepository {
  async save(parte) {
    await dynamoDb
      .put({
        TableName: tableName,
        Item: parte.toItem(),
      })
      .promise();

    return parte.toItem();
  }

  async findByTipo(tipo) {
    const result = await dynamoDb
      .query({
        TableName: tableName,
        KeyConditionExpression: '#tipo = :tipo',
        ExpressionAttributeNames: {
          '#tipo': 'tipo',
        },
        ExpressionAttributeValues: {
          ':tipo': tipo,
        },
      })
      .promise();

    return result.Items || [];
  }

  async deleteByTipoAndId(tipo, id) {
    const result = await dynamoDb
      .delete({
        TableName: tableName,
        Key: {
          tipo,
          id,
        },
        ReturnValues: 'ALL_OLD',
      })
      .promise();

    return result.Attributes || null;
  }
}

module.exports = ParteRepository;