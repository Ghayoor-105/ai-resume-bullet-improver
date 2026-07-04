interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="w-full max-w-2xl mt-6 rounded-lg bg-red-950 border border-red-800
                 text-red-200 p-4 text-sm"
    >
      {message}
    </div>
  );
}

export default ErrorMessage;