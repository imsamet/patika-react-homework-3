import { CityProvider } from "./context/city";
import Layout from "./components/layout/layout";

function App() {
  return (
    <CityProvider>

      <Layout/>

    </CityProvider>
  );
}

export default App;
