import { type Response, type Request, type NextFunction } from 'express';
import CardModel from '../models/card';

import NotFoundError from '../helpers/errors/not-found-error';
import UnauthorizedError from '../helpers/errors/unauthorized-error';
import ForbiddenError from '../helpers/errors/forbidden-error';
import { STATUS_OK, STATUS_CREATED } from '../helpers/constants/statusCodes';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await CardModel.find({}).populate('owner');

    res.status(STATUS_OK).send({ data: cards });
  } catch (error) {
    next(error);
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;
    // @ts-ignore
    const ownerId = req.user._id;

    if (!ownerId) {
      throw new UnauthorizedError('Необходима авторизация');
    }

    const card = await CardModel.create({ name, link, owner: ownerId });

    await card.populate('owner');

    res.status(STATUS_CREATED).send({ data: card });
  } catch (error) {
    next(error);
  }
};

export const deleteCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cardId = req.params.id;
    // @ts-ignore
    const userId = req.user._id;

    const card = await CardModel.findById(cardId);

    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }

    if (card.owner.toString() !== userId) {
      throw new ForbiddenError('Вы не можете удалить карточку, которую создал другой пользователь');
    }

    await CardModel.findByIdAndDelete(cardId);

    res.status(STATUS_OK).send({ message: 'Карточка успешно удалена' });
  } catch (error) {
    next(error);
  }
};

export const likeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    // @ts-ignore
    const userId = req.user._id;

    const card = await CardModel.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    ).populate(['owner', 'likes']);

    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }

    res.status(STATUS_OK).send({ data: card });
  } catch (error) {
    next(error);
  }
};

export const dislikeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    // @ts-ignore
    const userId = req.user._id;

    const card = await CardModel.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true },
    ).populate(['owner', 'likes']);

    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }

    res.status(STATUS_OK).send({ data: card });
  } catch (error) {
    next(error);
  }
};
