import { useCallback, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import ILoginResponse from "../interfaces/ILoginResponse.mts";
import http from "../utils/http.mts";
import { useNavigate } from "react-router-dom";
import useAppContext, { SetUserFunction } from "../context/AppContext";
import { IUser } from "../interfaces/IUser.mts";

const App = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAppContext();
  // Without these refs the verifyUser callback will spin forever
  // updating itself because it thinks the dependencies changed.
  const setUserRef = useRef<SetUserFunction>(setUser);
  const userRef = useRef<Partial<IUser> | undefined>(user);

  const verifyUser = useCallback(() => {
    http
      .post<ILoginResponse>("refreshToken", {})
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setTimeout(verifyUser, 5 * 60 * 1000);
        setUserRef.current({
          ...userRef.current,
          token: response.data.token,
        });
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
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
