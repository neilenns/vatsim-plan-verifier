import { AppContextProvider } from "../context/AppContext";
import App from "../pages/App";

const AppFramework = () => {
  return (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  );
};

export default AppFramework;
