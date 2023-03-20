import { registerRootComponent } from "expo";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./components/Home/Redux/store";

import App from "./App";
const AppComponent = () => (
  <QueryClientProvider client={new QueryClient()}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
// AppRegistry.registerComponent('main', () => AppComponent)
registerRootComponent(AppComponent);
