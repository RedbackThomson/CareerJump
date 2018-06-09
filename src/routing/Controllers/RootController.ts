import {Router, Request, Response, NextFunction} from 'express';
import {Controller, Param, Body, Get, Authorized, Res} from "routing-controllers";

@Controller()
export class RootController {
  @Get('/')
  get(@Res() res) {
    return res.render("index");
  }
}