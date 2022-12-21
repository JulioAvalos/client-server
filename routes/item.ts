import Router from 'express';
import {createItemByClientId, updateItemByClientId, deleteItemByClientId} from "../controller/item";
import {validateJWT} from "../middlewares/validate-jwt";

const router = Router();

router.post('/', validateJWT, createItemByClientId);
router.put('/', validateJWT, updateItemByClientId);
router.delete('/:idClient/:idItem', validateJWT, deleteItemByClientId);

module.exports = router;
