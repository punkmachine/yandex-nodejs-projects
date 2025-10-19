import { Router } from 'express';
import { getCards, createCard, deleteCard } from '../controllers/card';
import { createCardValidation } from '../helpers/cardValidations';

const router = Router();

router.get('/', getCards);
router.post('/', createCardValidation, createCard);
router.delete('/:id', deleteCard);

export default router;