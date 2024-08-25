import knex from "knex";
import pg from "pg";
import "dotenv/config";
import { development, production, test } from "./Environment";

const getEnvironment = () => {
  if (process.env.NODE_ENV === "production") {
    pg.types.setTypeParser(20, "text", parseInt);
  }

  switch (process.env.NODE_ENV) {
    case "production":
      return production;
    case "test":
      return test;

    default:
      return development;
  }
};

export const Knex = knex(getEnvironment());
