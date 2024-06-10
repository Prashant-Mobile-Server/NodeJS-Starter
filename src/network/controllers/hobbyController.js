
import UserHobby from '../models/hobbyModel.js';
import { findUserById } from './userController.js';
const userIdRegex = /\/api\/users\/([0-9a-fA-F-]+)\/hobbies/;
let userHobbyDataArray = [];

function updateHobbyLocally(userId, hobbies) {
    const userHobbyData = userHobbyDataArray.find(userHobby => {
        userHobby.id === userId
    });
    if (userHobbyData) {
        userHobbyData.hobbies.push(hobbies);
    } else {
        const data = new UserHobby(userId, hobbies);
        userHobbyDataArray.push(data);
    }
}

function getIdFromUrl(url) {
    const match = url.match(userIdRegex);
    if (match && match[1]) {
        return match[1];
    } else {
        return "";
    }
}

export async function getHobbiesByUserId(req, res) {
    const userId = getIdFromUrl(req.url);

    let userHobbyData = null;
    for (let index = 0; index < userHobbyDataArray.length; index++) {
        const element = userHobbyDataArray[index];
        if (element.id == userId) {
            userHobbyData = element;
            break;
        }
    }
    const user = findUserById(userId);
    res.setHeader('Cache-Control', 'private, max-age=3600');
    if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            data: {
                hobbies: userHobbyData ? userHobbyData.hobbies : [],
                links: {
                    self: user.getSelfLink(),
                    hobbies: user.getHobbiesLink()
                }
            },
            error: null
        }));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ data: null, error: `User with id ${userId} doesn't exist` }));
    }
}

export async function addHobbies(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const { hobbies } = JSON.parse(body);
        const userId = getIdFromUrl(req.url);
        updateHobbyLocally(userId, hobbies);
        const user = findUserById(userId);
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
            res.end(JSON.stringify({ data: null, error: `User with id ${userId} doesn't exist` }));
        }
    });
}

