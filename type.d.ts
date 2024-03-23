type inputEvent = React.ChangeEvent<HTMLInputElement>;
type InputHandler = (e: inputEvent) => void;
interface CustomError {
    status: number;
    data: { message: string };
  }