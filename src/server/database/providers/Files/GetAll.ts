import { Etablename } from "../../EtableName";
import { Knex } from "../../knex";
import { IFile } from "../../models/IFile";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<IFile[] | Error> => {
  try {
    const result = await Knex(Etablename.file)
      .select("*")
      .where("id", Number(id))
      .orWhere("originalName", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((item) => item.id !== id)) {
      const resultById = await Knex(Etablename.file)
        .select("*")
        .where("id", "=", id)
        .first();

      if (resultById) return [...result, resultById];
    }
    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar arquivos");
  }
};
