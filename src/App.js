import { useState } from "react";
import "./App.css";
import Songs from "./screens/Songs";
import CurrentSongScreen from "./screens/CurrentSongScreen";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import SideBar from "./screens/SideBar";
import { Provider } from "react-redux";
import store from "./redux/Store";
import Main from "./screens/Main";

function App() {
  const client = new ApolloClient({
    uri: "https://api.ss.dev/resource/api", // Replace this with your actual GraphQL API URL
    cache: new InMemoryCache(),
  });

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        {/* <div className="app">
           <div id="div-1">
            <SideBar
            /> 
          </div>
          <div id="div-2">
            <Songs
            />
          </div>
          <div  id="div-3">
            <CurrentSongScreen/>
          </div>
        </div> */}
        <Main/>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
