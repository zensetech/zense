interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="p-4 bg-red-50 text-red-600 rounded-md">
      <p>{message}</p>
    </div>
  );
}