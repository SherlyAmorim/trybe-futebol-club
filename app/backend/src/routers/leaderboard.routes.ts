import { Request, Response, Router } from 'express';
import LeaderboardController from '../controller/Leaderboard.controller';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => leaderboardController.getAllTeams(req, res),
);

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getTeamsHome(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getTeamsAway(req, res),
);

export default router;
