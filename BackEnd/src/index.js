import * as dotenv from "dotenv";
import express from "express";
import { AppService } from "./endpoints/ServiceConfig.js";
import { mongooseConnection } from "./endpoints/connection.js";
import { routerService } from "./endpoints/Router.js";

dotenv.config();
let app = express();

app = AppService(app).updatedService;

mongooseConnection(app);

app = routerService(app).updatedService;
