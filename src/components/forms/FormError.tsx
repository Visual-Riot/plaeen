import { FaExclamationTriangle } from "react-icons/fa";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({
  message,
}: FormErrorProps) => {
  if (!message) return null

  return(
    <div className="bg-error/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-error justify-center">
      <FaExclamationTriangle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}