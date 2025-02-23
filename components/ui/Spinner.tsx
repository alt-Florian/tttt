import { ClipLoader } from "react-spinners";

interface SpinnerProps {
  className?: string;
  color?: string;
  size?: number;
}

export function BigSpinner({ className, color, size }: SpinnerProps) {
  return (
    <ClipLoader
      color={color || "#4338CA"}
      size={size || 60}
      className={className}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export function SmallSpinner({ className, color, size }: SpinnerProps) {
  return (
    <ClipLoader
      color={color || "#4338CA"}
      size={size || 30}
      className={className}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export function ButtonSpinner({ className, color, size }: SpinnerProps) {
  return (
    <ClipLoader
      color={color || "#4338CA"}
      size={size || 20}
      className={className}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
