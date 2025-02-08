import { Router } from 'express';
import usersRouter from './users.js';
import postsRouter from './posts.js';
import commentsRouter from './comments.js';
import networkRouter from './networks.js';

const router = Router();

// Mount routers
router.get('/', (req, res) => {
    res.send('Hello World!');
})
router.use('/users', usersRouter)
router.use('/posts', postsRouter);
router.use('/comments', commentsRouter);
router.use('/networks', networkRouter);

// Export router
export default router