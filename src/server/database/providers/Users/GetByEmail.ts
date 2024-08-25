import { Etablename } from "../../EtableName";
import { Knex } from "../../knex";
import { IUser } from "../../models/IUser";

export const getByEmail = async (email: string): Promise<IUser | Error> => {
  try {
    const result = await Knex(Etablename.user)
      .select("*")
      .where("email", "=", email)
      .first();

    if (result) return result;

    return new Error("Registro não encontrado");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar");
  }
};
