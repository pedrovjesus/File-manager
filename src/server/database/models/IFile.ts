export interface IFile {
  id: number;
  filename: string;
  originalName: string;
  size: number;
  mimetype: string;
  path: string;
  createdAt: Date;
}
