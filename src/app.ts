/**
 * Create Server
 */
import { Server } from "./server";

var WORKERS = process.env.WEB_CONCURRENCY || 1;

Server.initialiseApp().then(() => {
    console.log(("  App is running on port %d in %s mode"), Server.app.get("port"), Server.app.get("env"));
});