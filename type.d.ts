type inputEvent = React.ChangeEvent<HTMLInputElement>;
type InputHandler = (e: inputEvent) => void;
interface CustomError {
  status: number;
  data: { message: string };
}

interface filemetaData {
  id: string;
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
  id: string;
  userId: number;
  foldername: string;
  createdAt: string;
  totalSize: number;
  updatedAt: string;
}

interface FileViewDetails {
  id: string;
  filename: string;
  type: "file" | "folder";
  createdAt: string;
  filekey: string
}

type OnDropCallback = (acceptedFiles: File[]) => void;
