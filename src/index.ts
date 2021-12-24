import express from "express";
import { gitRouter } from "./git-router";

const PORT = 8080; // default port to listen

// Create Express instance
export const app = express();

// Sub-routers
app.use('/api/v1', gitRouter);

// start the Express server
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
