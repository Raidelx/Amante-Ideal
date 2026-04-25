function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(body),
  };
}

function errorResponse(error) {
  const statusCode = error.statusCode || 500;

  return jsonResponse(statusCode, {
    message: error.message || 'Error interno del servidor',
  });
}

module.exports = {
  jsonResponse,
  errorResponse,
};