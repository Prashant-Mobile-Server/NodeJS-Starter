import { createUser, getUsers, getUserById, deleteUser } from '../controllers/userController.js';

const urlPatternWithId = /^\/api\/users\/[0-9a-fA-F-]+$/;

const handleUserRoutes = async (req, res) => {
    if (req.url === '/api/users' && req.method === 'POST') {
        createUser(req, res);
    } else if (req.url === '/api/users' && req.method === 'GET') {
        getUsers(req, res);
    } else if (req.url.match(urlPatternWithId) && req.method === 'GET') {
        await getUserById(req, res);
    }
    else if (req.url.match(urlPatternWithId) && req.method === 'DELETE') {
        deleteUser(req, res);
    } else {
        // Handle invalid routes
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route Not Found' }));
    }
}

export default handleUserRoutes;
