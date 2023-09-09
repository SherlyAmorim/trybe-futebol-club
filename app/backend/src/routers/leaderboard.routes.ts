import { Request, Response, Router } from 'express';
import LeaderboardController from '../controller/Leaderboard.controller';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/home', (req: Request, res: Response) => leaderboardController.getTeamsHome(req, res));

export default router;
