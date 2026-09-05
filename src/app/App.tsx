import { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { RootProviders } from "./providers/RootProviders";
import { AppRoutes } from "./router/ui/AppRoutes";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <RootProviders>
      <BrowserRouter basename={basename}>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </RootProviders>
  );
};

export default App;
