/**
 * Create Server
 */
import * as throng from 'throng';
import {logger} from './config/logging';
import { Server } from "./server";

var WORKERS = process.env.WEB_CONCURRENCY || 1;

if (process.env.NODE_ENV === 'development') {
  // Don't multithread for debugging ease
  Server.initialiseApp();
} else {
  throng({
    workers: WORKERS,
    lifetime: Infinity
  }, Server.initialiseApp);
}