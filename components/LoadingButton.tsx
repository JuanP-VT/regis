import { Button } from "./ui/button";
import { RotateCwIcon } from "lucide-react";

type Props = {
  message: string;
  isLoading: boolean;
};

export default function LoadingButton({ message, isLoading }: Props) {
  if (isLoading) {
    return <RotateCwIcon className="my-1 animate-spin text-slate-700" />;
  }
  return <Button className="my-1">{message}</Button>;
}
