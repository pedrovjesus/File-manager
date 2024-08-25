import { Knex } from "knex";
import { Etablename } from "../EtableName";

export async function up(knex: Knex) {
  return await knex.schema.createTable(Etablename.file, (table) => {
    table.bigIncrements("id").primary().index();
    table.string("filename", 150).notNullable().checkLength(">", 3);
    table
      .string("originalName")
      .unique()
      .index()
      .notNullable()
      .checkLength(">", 6);
    table.string("size").notNullable();
    table.string("mimetype").notNullable();
    table.string("path").notNullable();
    table.string("createdAt").notNullable().index();

    table.comment("Tabela é usada para armazenar usuarios do sistema.");
  });
}

export async function down(knex: Knex) {
  return await knex.schema.dropTable(Etablename.file);

}
