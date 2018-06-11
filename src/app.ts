/**
 * Create Server
 */
import * as throng from 'throng';
import {logger} from './config/logging';
import { Server } from "./server";

var WORKERS = process.env.WEB_CONCURRENCY || 1;

if (process.env.NODE_ENV === 'development') {
// Don't multithread for debugging ease
Server.initialiseApp().then(() => {
  logger.log(("Development app is running on port %d in %s mode"), Server.app.get("port"), Server.app.get("env"));
});
} else {
  throng({
    workers: WORKERS,
    lifetime: Infinity
  }, Server.initialiseApp);
}