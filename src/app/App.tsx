import { BrowserRouter } from "react-router-dom";
import { RootProviders } from "./providers/RootProviders";
import { AppRoutes } from "./router/ui/AppRoutes";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

const App = () => {
  return (
    <RootProviders>
      <BrowserRouter basename={basename}>
        <AppRoutes />
      </BrowserRouter>
    </RootProviders>
  );
};

export default App;
