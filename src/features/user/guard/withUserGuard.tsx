import type { FC } from "react";
import { Redirect } from "@/components/Redirect";
import { useGetUserQuery } from "@/features/user/queries/useGetUserQuery";

export function withUserGuard<Props extends Record<string, unknown>>(
  Component: FC<Props>
) {
  return function WithUserGuard(props: Props) {
    const { data: user, isLoading } = useGetUserQuery();

    if (isLoading) {
      return <></>;
    }

    if (!user) {
      return <Redirect path="/auth" />;
    }

    return <Component {...props} />;
  };
}
