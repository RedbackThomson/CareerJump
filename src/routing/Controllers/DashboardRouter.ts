import {Router, Request, Response, NextFunction} from 'express';
import {Controller, Param, Body, Get, Authorized} from "routing-controllers";
import { AUTH_TYPES } from '../../managers/AuthManager';

@Controller('/dashboard')
export class DashboardController {
  @Get('/')
  @Authorized()
  getStudent() {
    return "Hello World!";
  }
}