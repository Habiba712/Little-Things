import express from 'express'
// import morgan from './morgan'
// import helmet from './helmet'

import apiRouter from './routers/index.routes.js'
import cors from 'cors'

const app = express();

app.use(express.json());
// app.use(cors({
//   origin: ["https://ecbi.vercel.app", "http://localhost:3000", "http://localhost:5173", "exp://127.0.0.1:8081", "exp://192.168.0.239:8081", "http://192.168.0.239:8081"],
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization",
//     "Access-Control-Allow-Origin",
//     "Access-Control-Allow-Credentials",
//     "Access-Control-Allow-Headers"

//   ],
//   credentials: true
// }));

// app.options("*", cors());

// app.use(express.urlencoded({ extended: true }));


app.get('/ping', (req, res) => res.json({ ok: true }));



app.use(cors());
// app.use(helmet());
// app.use(morgan('dev'));

// app.use(express.json({limit: '50mb'}));



app.use('/api', apiRouter);

// app.get('/', (req, res) => res.send('MemoryOS'));

// app.use((req, res, next) => {
//   res.status(404).json({ message: 'Route Not Found' });
// });

// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
// });
console.log('wer er here')

export default app;