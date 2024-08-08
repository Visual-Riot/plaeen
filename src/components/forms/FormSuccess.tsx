import { FaCheckCircle } from "react-icons/fa";

interface FormErrorProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-success/20 p-3 rounded-md flex items-center gap-x-4 text-sm text-success justify-center">
      <FaCheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
