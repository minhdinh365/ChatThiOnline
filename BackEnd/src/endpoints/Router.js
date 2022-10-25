import ChatThiOnline from "../router/ChatThiOnline.js";
import express from "express";

/**
 * this variable is used for imported routes
 * @param {express} app
 * @returns {express} updatedService
 */
export const RouterService = (app) => {
  app.use("/", ChatThiOnline);

  return { updatedService: app };
};
