import cors from "cors";
import express from "express";
import methodOverride from "method-override";

/**
 * config for express
 * @param {express} app
 * @returns {express} updatedService
 */
export const AppService = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(methodOverride("_method"));

  return { updatedService: app };
};
