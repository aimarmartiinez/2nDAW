import express, { Router, Request, Response } from 'express';
import db from '../engine/database'
import type { TeamInterface } from '../../web/src/types/interfaces'

const router = express.Router();

router.get('/api/equips/', async (req: Request, res: Response) => {
    try{
        const teams: TeamInterface[] = await db('equips').select('*');
        if(!teams.length) return res.status(404).json({message:'no teams found it'});
        res.json(teams);
    }catch(err){
        console.error('error fetching teams', err);
    }
});

export default router;
