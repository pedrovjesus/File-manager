import { Etablename } from "../../EtableName";
import { Knex } from "../../knex";

export const count = async (filter = ""): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(Etablename.file)
      .where("originalName", "like", `%${filter}%`)
      .count<[{ count: number }]>("* as count");

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error("Erro ao consultar registros");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar registros");
  }
};
