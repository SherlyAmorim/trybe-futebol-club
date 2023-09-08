import { Request, Response, Router } from 'express';
import MatchesController from '../controller/Matches.controller';
import TokenValidation from '../middlewares/TokenValidation';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));

router.patch(
  '/:id/finish',
  TokenValidation.validateToken,
  (req: Request, res: Response) => matchesController.updateMatchesEnding(req, res),
);

export default router;
