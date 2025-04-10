import express from 'express';

import { validateEvent } from '../middleware/validation.js';
import { verifyAdmin } from '../middleware/auth.js';
import { getAdmin, getAdminById, createAdmin, updateAdmin, deleteAdmin } from '../controllers/admin.controller.js';
const router = express.Router();


router.use(verifyAdmin);

router.get('/',getAdmin);
router.get('/:id',getAdminById);
router.post('/',createAdmin);
router.put('/:id',updateAdmin);
router.delete('/:id',deleteAdmin);



export default router;