const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { procedureService } = require('../services');

const createProcedure = catchAsync(async (req, res) => {
  const procedure = await procedureService.createProcedure(req.body);
  res.status(httpStatus.CREATED).send(procedure);
});

const getProcedures = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await procedureService.queryProcedures(filter, options);
  res.send(result);
});

const getProcedure = catchAsync(async (req, res) => {
  const procedure = await procedureService.getProcedureById(req.params.procedureId);
  if (!procedure) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Procedure not found');
  }
  res.send(procedure);
});

const updateProcedure = catchAsync(async (req, res) => {
  const procedure = await procedureService.updateProcedureById(req.params.procedureId, req.body);
  res.send(procedure);
});

const deleteProcedure = catchAsync(async (req, res) => {
  await procedureService.deleteProcedureById(req.params.procedureId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProcedure,
  getProcedures,
  getProcedure,
  updateProcedure,
  deleteProcedure,
};
