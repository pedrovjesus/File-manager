import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../../database/models/IUser";
import { UserProvider } from "../../database/providers/Users/index";
import { PasswordCrypto } from "../../shared/services/PasswordCrypto";
import { JWTService } from "../../shared/services";

interface IBodyProps extends Omit<IUser, "id" | "name" | "level"> {}

export const signInValidator = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().min(6).email().max(150),
      password: yup.string().required().min(6).max(150),
    })
  ),
}));

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const { email, password } = req.body;

  const result = await UserProvider.getByEmail(email);

  if (result instanceof Error) {
    return res.render("index", {
      error: "Credenciais incorretas",
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(
    password,
    result.password
  );

  if (!passwordMatch) {
    return res.render("index", {
      error: "Credenciais incorretas",
    });
  } else {
    const accessToken = JWTService.sign({ uid: result.id });

    if (accessToken === "JWT_SECRET_NOT_FOUND") {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "Erro ao gerar acesso",
        },
      });
    }
    return res.redirect("/main");
  }
};
