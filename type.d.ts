type inputEvent = React.ChangeEvent<HTMLInputElement>;
type InputHandler = (e: inputEvent) => void;
interface CustomError {
  status: number;
  data: { message: string };
}

interface filemetaData {
  id: number;
  userId: number;
  size: number;
  key: string;
  originalname: string;
  folderId: number;
  mimetype: string;
  createdAt: string;
  updatedAt: string;
}

interface foldermetadata {
  id: number;
  userId: number;
  foldername: string;
  createdAt: string;
  totalSize: number;
  updatedAt: string;
}
