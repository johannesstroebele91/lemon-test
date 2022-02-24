import { useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { RestLink } from "apollo-link-rest";
import Home from "./components/Home";
import Login from "./components/Login";

// Set `RestLink` with your endpoint
const restLink = new RestLink({ uri: "https://zeit.sulzer.de/zeit/rest/2/" });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Setup your client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(restLink),
});

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (isLoggedIn: boolean) => {
    console.log(isLoggedIn);
    setIsLoggedIn(isLoggedIn);
  };

  return (
    // ApolloProvider with the client property
    <ApolloProvider client={client}>
      <h1 style={{ textAlign: "center" }}>Lemon</h1>
      {!isLoggedIn && <Login onLogin={handleLogin} />}
      {isLoggedIn && <Home />}
    </ApolloProvider>
  );
}

export default App;
