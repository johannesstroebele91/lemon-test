import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";

// Set `RestLink` with your endpoint
const restLink = new RestLink({
  uri: "https://zeit.sulzer.de/zeit/rest/2",
  credentials: "include",
  endpoints: {
    v1: "https://zeit.sulzer.de/zeit/rest/0",
  },
});

// Setup your client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
  typeDefs: gql`
    type LoginInput {
      username: String!
      password: String!
    }
  `,
});

/* const authRestLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }: any) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        Accept: "application/json",
        Authorization: token,
      },
    };
  });
  return forward(operation).map((result) => {
    const { restResponses } = operation.getContext();
    const authTokenResponse = restResponses.find((res: any) =>
      res.headers.has("Authorization")
    );
    // You might also filter on res.url to find the response of a specific API call
    if (authTokenResponse) {
      localStorage.setItem(
        "token",
        authTokenResponse.headers.get("Authorization")
      );
    }
    return result;
  });
}); 

const restLink = new RestLink({
  uri: "https://zeit.sulzer.de/zeit/rest/2/",
  credentials: "include",
}); 

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authRestLink, restLink]),
}); */

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (isLoggedIn: boolean) => {
    setLoggedIn(isLoggedIn);
  };

  return (
    <ApolloProvider client={client}>
      <h1 style={{ textAlign: "center" }}>Lemon</h1>
      {!loggedIn && <Login onLogin={handleLogin} />}
      {loggedIn && <Home />}
    </ApolloProvider>
  );
}

export default App;
