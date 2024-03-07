import { Button } from "./ui/button";
import { RotateCwIcon } from "lucide-react";

type Props = {
  message: string;
  isLoading: boolean;
};
/**
    This is a LoadingButton component. It displays a rotating icon when the isLoading prop is true,
    indicating that some operation is in progress.   When isLoading is false, it displays a button 
    with the provided message.
  */
export default function LoadingButton({ message, isLoading }: Props) {
  if (isLoading) {
    return <RotateCwIcon className="my-1 animate-spin text-slate-700" />;
  }
  return <Button className="my-1">{message}</Button>;
}
