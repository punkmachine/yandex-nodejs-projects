import { type Response, type Request, type NextFunction } from 'express';
import CardModel from '../models/card';
import { NotFoundError, UnauthorizedError, ForbiddenError } from '../errors';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await CardModel.find({}).populate('owner');

    res.status(200).send({ data: cards });
  } catch (error) {
    next(error);
  }
};


export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;
    // временное решение для авторизации
    const ownerId = req.user!._id;

    if (!ownerId) {
      throw new UnauthorizedError('Необходима авторизация');
    }

    const card = await CardModel.create({ name, link, owner: ownerId });

    await card.populate('owner');

    res.status(201).send({ data: card });
  } catch (error) {
    next(error);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cardId = req.params.id;
    const userId = req.user!._id;

    const card = await CardModel.findById(cardId);

    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }

    if (card.owner.toString() !== userId) {
      throw new ForbiddenError('Недостаточно прав для удаления карточки');
    }

    await CardModel.findByIdAndDelete(cardId);

    res.status(200).send({ message: 'Карточка успешно удалена' });
  } catch (error) {
    next(error);
  }
};
