import { useRouter } from "next/router";
import { useEffect } from "react";

export function Redirect({ path }: { path: string }) {
  const { push } = useRouter();

  useEffect(() => {
    push(path);
  }, [path, push]);

  return <></>;
}
