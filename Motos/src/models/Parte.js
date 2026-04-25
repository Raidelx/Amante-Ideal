const { randomUUID } = require('crypto');

class Parte {
  constructor({ id, nombre, tipo, precio, createdAt }) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.precio = precio;
    this.createdAt = createdAt;
  }

  static fromInput(input) {
    if (!input || typeof input !== 'object') {
      throw Parte.validationError('El body debe ser un objeto JSON válido.');
    }

    const nombre = typeof input.nombre === 'string' ? input.nombre.trim() : '';
    const tipo = typeof input.tipo === 'string' ? input.tipo.trim() : '';
    const precio = Number(input.precio);

    if (!nombre) {
      throw Parte.validationError('El campo nombre es obligatorio.');
    }

    if (!tipo) {
      throw Parte.validationError('El campo tipo es obligatorio.');
    }

    if (!Number.isFinite(precio) || precio < 0) {
      throw Parte.validationError('El campo precio debe ser un número válido mayor o igual a cero.');
    }

    return new Parte({
      id: randomUUID(),
      nombre,
      tipo,
      precio,
      createdAt: new Date().toISOString(),
    });
  }

  static validationError(message) {
    const error = new Error(message);
    error.statusCode = 400;
    return error;
  }

  toItem() {
    return {
      id: this.id,
      nombre: this.nombre,
      tipo: this.tipo,
      precio: this.precio,
      createdAt: this.createdAt,
    };
  }
}

module.exports = Parte;