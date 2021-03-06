
import express from "express";
import bodyParser from "body-parser";
import router from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import { dbSetting } from './config/settings';

const app = express();
app.use(helmet());
app.use(hpp());
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


const mongoUri = dbSetting.uri || '';

mongoose.connect(mongoUri);
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
});

app.use(bodyParser.json({ type: '*/*' }));
app.use(router);

app.use(cors({
    origin: "*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH', 'OPTIONS']
}));

const port = process.env.PORT || 3090;
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );