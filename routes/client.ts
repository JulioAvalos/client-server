import Router from 'express';

import {validateJWT} from "../middlewares/validate-jwt";
import {createClient, deleteClient, getClientList, updateClient} from '../controller/client';

const router = Router();

router.get("/", validateJWT, getClientList);
router.post('/', validateJWT, createClient);
router.put('/', validateJWT, updateClient);
router.delete('/:idClient', validateJWT, deleteClient);

module.exports = router;
