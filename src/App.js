import { AppProvider } from "./context/AppContext";
import { Home } from "./pages/Home";

export const App = () => {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
};
