import { Knex } from "knex";
import { Etablename } from "../EtableName";

export async function up(knex: Knex) {
  return await knex.schema.createTable(Etablename.user, (table) => {
    table.bigIncrements("id").primary().index();
    table.string("name", 150).notNullable().checkLength(">", 3);
    table.string("email").unique().notNullable().checkLength(">", 6);
    table.string("password").notNullable().checkLength(">", 5);
    table.string("level").notNullable();

    table.comment("Tabela é usada para armazenar usuarios do sistema.");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(Etablename.user);

  console.log(`# Droped table ${Etablename.user}`);
}
