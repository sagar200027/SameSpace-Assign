import "./App.css";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Provider } from "react-redux";
import store from "./redux/Store";
import Main from "./screens/Main";

function App() {
  const client = new ApolloClient({
    uri: "https://api.ss.dev/resource/api",
    cache: new InMemoryCache(),
  });

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Main />
      </ApolloProvider>
    </Provider>
  );
}

export default App;
