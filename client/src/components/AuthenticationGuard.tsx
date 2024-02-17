import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Typography, useColorScheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppContext } from "../hooks/useAppContext.mts";
import { getUserInfo } from "../services/user.mts";
import ErrorDisplay from "./ErrorDisplay";
import { PageLoader } from "./PageLoader";

interface AuthenticationGuardProps {
  role: string;
  component: React.ComponentType<object>;
}

export const AuthenticationGuard = ({ role, component: Component }: AuthenticationGuardProps) => {
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const { userInfo, setUserInfo } = useAppContext();
  const [error, setError] = useState<Error | undefined>(undefined);
  const { setMode } = useColorScheme();

  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const AuthenticatedComponent = withAuthenticationRequired(Component, {
    onRedirecting: () => <PageLoader />,
  });

  // Perform additional validation after withAuthenticationRequired completes
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    // Async method to fetch the user info and verify the role.
    // This way of calling async inside useEffect comes from https://devtrium.com/posts/async-functions-useeffect.
    const fetchData = async () => {
      if (userInfo) {
        return;
      }

      const token = await getAccessTokenSilently();
      const incomingUserInfo = await getUserInfo(token, user?.sub);

      if (!incomingUserInfo) {
        setError(new Error(`Unable to retrieve user information`));
        return;
      }

      setUserInfo(incomingUserInfo);
    };

    // Actually call the async method
    fetchData()
      .then(() => {
        setError(undefined);
        setIsAuthorizing(false);

        if (role && !userInfo?.roles.includes(role)) {
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      })
      .catch((err: Error) => {
        setError(err);
        setIsAuthorized(false);
        setIsAuthorizing(false);
      });
  }, [isAuthenticated, user, role, getAccessTokenSilently, setUserInfo, setMode, userInfo]);

  // If the user info changes then set the color mode
  useEffect(() => {
    if (!userInfo) {
      return;
    }

    setMode(userInfo.colorMode);
  }, [setMode, userInfo]);

  // Show errors from the authorization and user access calls
  if (error) {
    return (
      <ErrorDisplay>
        <Typography align="center">Error accessing page data: {error?.message}</Typography>
      </ErrorDisplay>
    );
  }

  // While authorizing is taking place return the page loader
  if (isAuthorizing) {
    return <PageLoader />;
  }

  // Pending users get told to hang tight.
  if (userInfo?.isPending) {
    return (
      <ErrorDisplay>
        <Typography align="center">
          Your account is pending approval.
          <br />
          You&apos;ll receive an email once your account is activated.
        </Typography>
      </ErrorDisplay>
    );
  }

  // Unauthorized users get denied.
  if (!isAuthorized) {
    return (
      <ErrorDisplay>
        <Typography align="center">
          You do not have the required permissions to view this page.
        </Typography>
      </ErrorDisplay>
    );
  }
  // Authenticated gets to see the component.
  else {
    return <AuthenticatedComponent />;
  }
};
