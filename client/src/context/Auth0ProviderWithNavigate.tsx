import { Auth0Provider, LogoutOptions } from "@auth0/auth0-react";
import { ENV } from "../env.mts";

export type LogoutMethod = (options?: LogoutOptions) => Promise<void>;

interface Auth0ProviderWithNavigateProps {
  children: React.ReactNode;
}

export const Auth0ProviderWithNavigate = ({ children }: Auth0ProviderWithNavigateProps) => {
  if (!(ENV.VITE_AUTH0_DOMAIN && ENV.VITE_AUTH0_CLIENT_ID)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={ENV.VITE_AUTH0_DOMAIN}
      clientId={ENV.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        audience: ENV.VITE_AUTH0_AUDIENCE,
        redirect_uri: window.location.origin,
      }}
    >
      {children}
    </Auth0Provider>
  );
};
