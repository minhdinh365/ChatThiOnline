import cors from "cors";
import express from "express";
import methodOverride from "method-override";
import path from "path";

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

export const ViewService = (app) => {
  // Without middleware
  app.get("/Home", function (req, res) {
    var options = {
      root: path.resolve(path.dirname("")),
    };

    var fileName = "src/index.html";

    res.sendFile(fileName, options, function (err) {
      if (err) {
        console.log(err);
        // next(err);
      } else {
        console.info("Sent:", fileName);
      }
    });
  });

  return { updatedService: app };
};
