import { Router, Request, Response } from 'express';
import { saveinfo,RegistrationData } from './allotments/individual';
import { saveInviteRequest,InviteRequestData } from './allotments/delegation';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        const data: RegistrationData = req.body;
        await saveinfo(data);
        res.status(201).send({ message: 'Registration successful!' });
    } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).send({ message: 'Error saving registration.' });
    }
});

router.post('/request-invite', async (req: Request, res: Response) => {
    try {
        const data: InviteRequestData = req.body;
        await saveInviteRequest(data);
        res.status(201).send({ message: 'Invite request received!' });
    } catch (error) {
        console.error('Invite request failed:', error);
        res.status(500).send({ message: 'Error saving invite request.' });
    }
});

export default router;
