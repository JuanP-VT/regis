import { Button } from "./ui/button";
import { RotateCwIcon } from "lucide-react";

type Props = {
  message: string;
  isLoading: boolean;
};

export default function LoadingButton({ message, isLoading }: Props) {
  if (isLoading) {
    return <RotateCwIcon className="animate-spin text-slate-700 my-1" />;
  }
  return <Button className="my-1">{message}</Button>;
}
