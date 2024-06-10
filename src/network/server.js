

import { createServer } from 'http';
import handleUserRoutes from './routes/userRoutes.js';
import handleHobbyRoutes from './routes/hobbyRoutes.js';

const server = createServer(function (req, res) {
    if (req.url.includes('/api/users') && req.url.includes('hobbies')) {
        handleHobbyRoutes(req, res);
    } else if (req.url.includes('/api/users')) {
        handleUserRoutes(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route Not Found' }));
    }
});

server.listen(8000);