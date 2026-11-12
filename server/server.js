// ? (creates http server; attach socket.io here if you wa
import 'dotenv/config';
import http from 'http';
import app from './app.js';
import connectDB from './config/db.js';
import config from './config/index.js';



async function start() {
   try {
        await connectDB();
        const server = http.createServer(app);
        server.listen(config.port, () => {
            console.log(`Server listening on http://localhost:${config.port}`);
        });
    } catch (err) {
        console.error("Startup failed:", err);
        process.exit(1); // ensures Railway sees a crash
    }
}

start();