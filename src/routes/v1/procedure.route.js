const express = require('express');

const procedureController = require('../../controllers/procedure.controller');

const router = express.Router();

router.post('/', procedureController.createProcedure);
router.get('/', procedureController.getProcedures);
router.get('/:procedureId', procedureController.getProcedure);
router.put('/:procedureId', procedureController.updateProcedure);
router.delete('/:procedureId', procedureController.deleteProcedure);

module.exports = router;
