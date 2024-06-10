import { addHobbies, getHobbiesByUserId } from "../controllers/hobbyController.js";


const pattern = /^\/api\/users\/([^\/]+)\/hobbies$/;

const handleHobbyRoutes = (req, res) => {
    if (req.url.match(pattern)) {
        if (req.method === 'GET') {
            getHobbiesByUserId(req, res);
        } else if (req.method === 'PATCH') {
            addHobbies(req, res);
        } else {
            // Handle invalid routes
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Route Not Found' }));
        }
    } else {
        // Handle invalid routes
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route Not Found' }));
    }
}

export default handleHobbyRoutes;
