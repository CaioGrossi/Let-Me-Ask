import { AuthProvider } from "./hooks/useAuth";
import Routes from "./Routes";
import GlobalStyles from "./styles/global";

function App() {
  return (
    <AuthProvider>
      <Routes />
      <GlobalStyles />
    </AuthProvider>
  );
}

export default App;
