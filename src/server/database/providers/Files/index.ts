import * as create from "./Create";
//import * as getById from './GetById'
import * as getAll from "./GetAll";
import * as count from "./Count";

export const FilesProvider = {
  ...create,
  //...getById,
  ...getAll,
  ...count,
};
