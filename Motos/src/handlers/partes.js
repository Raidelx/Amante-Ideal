const ParteService = require('../services/ParteService');
const { jsonResponse, errorResponse } = require('../utils/http');

const service = new ParteService();

async function createParte(event) {
  try {
    const payload = event.body ? JSON.parse(event.body) : {};
    const parte = await service.registrarParte(payload);

    return jsonResponse(201, {
      message: 'Parte registrada correctamente.',
      data: parte,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return jsonResponse(400, {
        message: 'El body debe ser JSON válido.',
      });
    }

    return errorResponse(error);
  }
}

async function listPartes(event) {
  try {
    const tipo = event.queryStringParameters ? event.queryStringParameters.tipo : undefined;
    const partes = await service.listarPartesPorTipo(tipo);

    return jsonResponse(200, {
      count: partes.length,
      data: partes,
    });
  } catch (error) {
    return errorResponse(error);
  }
}

async function deleteParte(event) {
  try {
    const tipo = event.queryStringParameters ? event.queryStringParameters.tipo : undefined;
    const id = event.queryStringParameters ? event.queryStringParameters.id : undefined;

    const deleted = await service.eliminarParte({ tipo, id });

    return jsonResponse(200, {
      message: 'Parte eliminada correctamente.',
      data: deleted,
    });
  } catch (error) {
    return errorResponse(error);
  }
}

module.exports = {
  createParte,
  listPartes,
  deleteParte,
};