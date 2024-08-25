import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { FilesProvider } from "../../database/providers/Files";
import { IFile } from "../../database/models/IFile";

interface IBodyProps extends Omit<IFile, "id"> {}

export const uploadFIle = async (
  req: Request<{}, {}, IFile>,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: { default: "Nenhum arquivo enviado!" },
      });
    }

    const result = await FilesProvider.createFile({
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path,
      createdAt: new Date(), // Aqui você define o createdAt
    });

    if (result instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: { default: result.message },
      });
    }

    return res.status(StatusCodes.CREATED).json({ id: result });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: "Erro ao realizar o upload" },
    });
  }
};
