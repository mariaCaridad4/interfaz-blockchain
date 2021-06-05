require('dotenv/config');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const { 
    createAccessToken, 
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken,
} = require('./tokens.js');

const { fakeDB } = require('./fakeDB.js');
const { isAuth } = require('./isAuth.js');


//1. registrar un usario
//2. usuario login
//3. usuario logout
//4. setup a protected route
//5. ger a new accesstoken with a refresh token

const server = express();

//use express middleware for easier cookie handling
server.use(cookieParser());
//esto permite cominicar el fronend con el servidor
server.use(
    cors({
        origin: 'http:localhost:3000',
        credentials: true,
    })
);

//needed to bea able to read body data
server.use(express.json());
server.use(express.urlencoded({extended: true}));


//1.register a user
server.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        //1.check if user exists
        const user = fakeDB.find(user => user.email === email);
        if (user) throw new Error('User already exist');
        //2. if not user exist, hash the password
        const hashedPassword = await hash(password, 10);
        //3. insert the user un "database"
        fakeDB.push({
            id: fakeDB.length,
            email,
            password: hashedPassword
        });
        res.send({ message: 'User Created' })
        console.log(fakeDB);
    } catch (err) {
        res.send({
            error: `${err.message}`,
        });

    }
});

//2. Login a user
server.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        //1. Find user in database. if not exist send error
        const user = fakeDB.find(user => user.email === email);
        if (!user) throw new Error("User does not exist");
        //2. Compare crypted password and see if it checks out. Send error if not
        const valid = await compare(password, user.password);
        if (!valid) throw new Error ("Password not correct");
        //3. Create refresh and accesstoken
        const accesstoken = createAccessToken(user.id);
        const refreshtoken = createRefreshToken(user.id);
        //4. Put the refresedtoken un the database
        user.refreshtoken = refreshtoken;
        console.log(fakeDB);
        //5. Send token. Refreshed token as a cookie ans accesstoken as a regular response
        sendRefreshToken(res, refreshtoken);
        sendAccessToken(res, req, accesstoken);


    }catch (err) {
        res.send({
            rror: `${err.message}`,
        });

    }
});

//3. logout user
server.post('/logout', (_req, res) => {
    res.clearCookie('refreshtoken', { path: '/refresh_token'});
    return res.send({
        message: 'Logged out',
    })
});

//4. Protected rout
server.post('/protected', async (req, res) => {
    try {
        const userId = isAuth(req);
        if(userId !== null) {
            res.send({
                data: 'This is protected data.'
            });
        }
    } catch (err) {
        res.send({
            error: `${err.message}`,
        })
    }

});

//5. get a new access token with a refresh token
server.post('/refresh_token', (req, res) => {
    const token = req.cookies.refreshtoken;
    if(!token) return res.send({accesstoken: ''});

    let payload = null;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    }catch (err) {
        return res.send({ accesstoken: ''});
    }

    const user = fakeDB.find(user => user.id === payload.userId);
    if (!user) return res.send({accesstoken: ''});
    if (user.refreshtoken !== token) {
        return res.send({accesstoken: ''});
    }
    const accesstoken = createAccessToken(user.id);
    const refreshtoken = createRefreshToken(user.id);
    user.refreshtoken = refreshtoken;

    sendRefreshToken(res, refreshtoken);
    return res.send({accesstoken});
});

server.listen(process.env.PORT, () =>
    console.log(`Server listening on port ${process.env.PORT}`),
);