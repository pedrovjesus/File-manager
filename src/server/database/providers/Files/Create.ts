import { Etablename } from "../../EtableName";
import { Knex } from "../../knex";
import { IFile } from "../../models/IFile";

export const createFile = async (
  file: Omit<IFile, "id">
): Promise<number | Error> => {
  try {
    // Adiciona o campo createdAt ao objeto file
    const fileWithTimestamp = {
      ...file,
      createdAt: new Date(),
    };

    const [result] = await Knex(Etablename.file)
      .insert(fileWithTimestamp)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao salvar o arquivo no banco de dados");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao salvar o arquivo no banco de dados");
  }
};
