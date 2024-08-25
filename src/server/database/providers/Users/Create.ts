import { PasswordCrypto } from "../../../shared/services/PasswordCrypto";
import { Etablename } from "../../EtableName";
import { Knex } from "../../knex";
import { IUser } from "../../models/IUser";

export const create = async (
  user: Omit<IUser, "id">
): Promise<number | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(user.password);

    user.password = hashedPassword;

    const [result] = await Knex(Etablename.user).insert(user).returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar usuario");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar o registro");
  }
};
