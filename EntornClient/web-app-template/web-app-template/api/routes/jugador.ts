import express, { Router, Request, Response } from 'express';
import db from '../engine/database';
import { PlayerInterface } from '../../web/src/types/interfaces';

const router = Router();

router.get('/api/jugadors', async (req: Request, res: Response) => {
    try {
        const players: PlayerInterface[] = await db('jugadors').select('*');

        if (!players.length) {
            return res.status(404).json({ message: 'No players found' });
        }

        res.json(players);
    } catch (err) {
        console.error('Error fetching players:', err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});

router.get('/api/jugadors/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!id) return res.status(400).json({ message: 'No player id provided' });

    try {
        const player: PlayerInterface | undefined = await db('jugadors')
            .where({ id_jugador: id })
            .first();

        if (!player) return res.status(404).json({ message: 'Player not found' });

        res.json(player);
    } catch (err) {
        console.error('Error fetching player:', err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});

router.post('/api/jugadors', async (req: Request, res: Response) => {
    const playerData = req.body;

    if (!playerData) return res.status(400).json({ message: 'No player data provided' });

    try {
        const [newPlayer]: PlayerInterface[] = await db('jugadors')
            .insert(playerData)
            .returning('*');

        res.status(201).json(newPlayer);
    } catch (err) {
        console.error('Error creating player:', err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});

router.put('/api/jugadors/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const playerData = req.body;

    if (!id) return res.status(400).json({ message: 'No player id provided' });
    if (!playerData) return res.status(400).json({ message: 'No player data provided' });

    try {
        const updatedPlayers: PlayerInterface[] = await db('jugadors')
            .where({ id_jugador: id })
            .update(playerData)
            .returning('*');

        if (!updatedPlayers.length) return res.status(404).json({ message: 'Player not found' });

        res.json(updatedPlayers[0]);
    } catch (err) {
        console.error('Error updating player:', err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});

router.delete('/api/jugadors/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!id) return res.status(400).json({ message: 'No player id provided' });

    try {
        const deletedPlayers: PlayerInterface[] = await db('jugadors')
            .where({ id_jugador: id })
            .del()
            .returning('*');

        if (!deletedPlayers.length) return res.status(404).json({ message: 'Player not found' });

        res.json({ message: 'Player deleted successfully', player: deletedPlayers[0] });
    } catch (err) {
        console.error('Error deleting player:', err);
        res.status(500).json({ message: 'Internal server error', error: err });
    }
});

export default router;