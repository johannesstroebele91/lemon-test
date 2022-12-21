import { gql, useQuery } from "@apollo/client";

const GET_ACTIVITY = gql`
  query GetActivities {
    activity @rest(type: "Activity", path: "activity/6178778", method: "POST") {
      id
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_ACTIVITY);
  console.log("Get activities: ", data);

  if (loading || error) return <p>Loading ...</p>;

  return <h1>Data is here</h1>;
};

export default Home;
