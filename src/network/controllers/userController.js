import User from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';
const userIdRegex = /\/api\/users\/([0-9a-fA-F-]+)/;

let users = [];

export async function createUser(req, res) {
    const id = uuidv4();
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const { name, email } = JSON.parse(body);
        const newUser = new User(id, name, email);
        users.push(newUser);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            data: {
                user: newUser,
                links: {
                    self: newUser.getSelfLink(),
                    hobbies: newUser.getHobbiesLink()
                }
            },
            error: null
        }));
    });
}

function getIdFromUrl(url) {
    const match = url.match(userIdRegex);
    if (match && match[1]) {
        return match[1];
    } else {
        return "";
    }
}

export async function getUserById(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    const { id } = getIdFromUrl(req.url);

    const user = findUserById(id)
    if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            data: {
                user,
                links: {
                    self: user.getSelfLink(),
                    hobbies: user.getHobbiesLink()
                }
            },
            error: null
        }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: null, error: 'User not found' }));
    }
}

export async function getUsers(req, res) {
    res.setHeader('Cache-Control', 'public, max-age=3600');
    if (users.length > 0) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            data: users.map(user => ({
                user,
                links: {
                    self: user.getSelfLink(),
                    hobbies: user.getHobbiesLink()
                }
            })),
            error: null
        }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: null, error: 'User list empty' }));
    }

}

export async function deleteUser(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    const id = getIdFromUrl(req.url);
    const index = findUserIndexById(id);
    if (index !== -1) {
        users.splice(index, 1);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            data: {
                "success": true
            },
            error: null
        }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: null, error: 'User not found' }));
    }
}

export const findUserById = (userId) => {
    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        if (element.id == userId) {
            return element;
        }
    }
    return null;
};

export const findUserIndexById = (userId) => {
    for (let index = 0; index < users.length; index++) {
        const element = users[index];
        if (element.id == userId) {
            return index;
        }
    }
    return -1;
};

