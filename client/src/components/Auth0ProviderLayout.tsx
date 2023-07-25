import { Outlet } from "react-router-dom";
import { Auth0ProviderWithRedirectCallback } from "./Auth0ProviderWithRedirectCallback";

// From https://stackoverflow.com/a/73938067/9206264
export default function Auth0ProviderLayout() {
  return (
    <Auth0ProviderWithRedirectCallback
      domain="dev-q5itijfspt3smgyw.us.auth0.com"
      clientId="SEuOg3vgIVRaf1Aka0ent4iTpzZHY88B"
      authorizationParams={{
        redirect_uri: "http://localhost:4000/callback",
      }}
    >
      <Outlet />
    </Auth0ProviderWithRedirectCallback>
  );
}
