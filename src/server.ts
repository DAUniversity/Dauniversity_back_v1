import express, { Router } from "express";
import bodyParser from "body-parser";
import knex from "./db/knex";
import logger from "morgan";
import Debug from "debug";
const debug = Debug("backend:server");
import nounRouter from "./routers/v1/api/noun";

class Server {
  private app;

  constructor() {
    this.app = express();
    this.config();
    this.routerConfig();
    this.routerAuthConfig();
    //this.dbConnect();
  }

  private config() {
    debug("Cargando configuraciones iniciales...");
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: "1mb" })); // 100kb default
    this.app.use(express.static('public'));
    this.app.use(logger("backendserver START :method :url"));
  }

  private async dbConnect() {
    debug("Creando conexion con base de datos...");
    await knex.create();
  }

  private routerConfig() {
    debug("Configurando rutas...");
    const router = Router();


    // eslint-disable-next-line @typescript-eslint/no-var-requires
    router.use(require("./middleware/AuthMiddleware"));
    this.app.use("/v1/api", router);
    this.app.use("/v1/api/noun", nounRouter);
  }

  private routerAuthConfig() {
    debug("Configurando rutas de Auth...");
  }
 
  public start = (port: number) => {
    return new Promise((resolve, reject) => {
      this.app
        .listen(port, () => {
          resolve(port);
        })
        // eslint-disable-next-line @typescript-eslint/ban-types
        .on("error", (err: Object) => reject(err));
    });
  };
}

export default Server;
