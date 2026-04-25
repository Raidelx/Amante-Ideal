const Parte = require('../models/Parte');
const ParteRepository = require('../repositories/ParteRepository');

class ParteService {
  constructor(repository = new ParteRepository()) {
    this.repository = repository;
  }

  async registrarParte(payload) {
    const parte = Parte.fromInput(payload);
    return this.repository.save(parte);
  }

  async listarPartesPorTipo(tipo) {
    const tipoNormalizado = typeof tipo === 'string' ? tipo.trim() : '';

    if (!tipoNormalizado) {
      throw Parte.validationError('El parámetro tipo es obligatorio.');
    }

    const partes = await this.repository.findByTipo(tipoNormalizado);

    return partes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async eliminarParte({ tipo, id }) {
    const tipoNormalizado = typeof tipo === 'string' ? tipo.trim() : '';
    const idNormalizado = typeof id === 'string' ? id.trim() : '';

    if (!tipoNormalizado) {
      throw Parte.validationError('El parámetro tipo es obligatorio.');
    }

    if (!idNormalizado) {
      throw Parte.validationError('El parámetro id es obligatorio.');
    }

    const deleted = await this.repository.deleteByTipoAndId(tipoNormalizado, idNormalizado);

    if (!deleted) {
      const error = new Error('No existe una parte con el tipo e id indicados.');
      error.statusCode = 404;
      throw error;
    }

    return deleted;
  }
}

module.exports = ParteService;