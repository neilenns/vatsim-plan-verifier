import { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ILoginResponse from "../interfaces/ILoginResponse.mts";
import http from "../utils/http.mts";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  const verifyUser = useCallback(() => {
    http
      .post<ILoginResponse>("refreshToken", {})
      .then((response) => {
        setTimeout(verifyUser, 5 * 60 * 1000);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
      })
      .catch(() => {
        localStorage.clear();
      });
  }, []);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  // Watch for changes to local storage for a logout key and if it's there that
  // means the site was logged out in a different tab. Refresh the page and log out!
  const syncLogout = useCallback(
    (event: StorageEvent) => {
      if (event.key === "logout") {
        navigate("/");
      }
    },
    [navigate]
  );

  // Register for events on local storage to watch for cross-tab logout.
  useEffect(() => {
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, [syncLogout]);

  return <Outlet />;
};

export default App;
