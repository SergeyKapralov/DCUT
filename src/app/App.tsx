import { BrowserRouter } from "react-router-dom";
import { RootProviders } from "./providers/RootProviders";
import { AppRoutes } from "./router/ui/AppRoutes";

const App = () => {
  return (
    <RootProviders>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </RootProviders>
  );
}

export default App;