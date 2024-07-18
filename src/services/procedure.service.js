const httpStatus = require('http-status');
const { Procedure } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a procedure
 * @param {Object} procedureBody
 * @returns {Promise<Procedure>}
 */
const createProcedure = async (procedureBody) => {
  return Procedure.create(procedureBody);
};

/**
 * Query for procedures
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProcedures = async (filter, options) => {
  const procedures = await Procedure.paginate(filter, options);
  return procedures;
};

/**
 * Get procedure by id
 * @param {ObjectId} id
 * @returns {Promise<Procedure>}
 */
const getProcedureById = async (id) => {
  return Procedure.findById(id);
};

/**
 * Get procedure by email
 * @param {string} email
 * @returns {Promise<Procedure>}
 */
const getProcedureByEmail = async (email) => {
  return Procedure.findOne({ email });
};

/**
 * Update Procedure by id
 * @param {ObjectId} procedureId
 * @param {Object} updateBody
 * @returns {Promise<Procedure>}
 */
const updateProcedureById = async (procedureId, updateBody) => {
  const procedure = await getProcedureById(procedureId);
  if (!procedure) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Procedure not found');
  }

  Object.assign(procedure, updateBody);
  await procedure.save();
  return procedure;
};

/**
 * Delete procedure by id
 * @param {ObjectId} procedureId
 * @returns {Promise<Procedure>}
 */
const deleteProcedureById = async (procedureId) => {
  const procedure = await getProcedureById(procedureId);
  if (!procedure) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Procedure not found');
  }
  await procedure.remove();
  return procedure;
};

module.exports = {
  createProcedure,
  queryProcedures,
  getProcedureById,
  getProcedureByEmail,
  updateProcedureById,
  deleteProcedureById,
};
