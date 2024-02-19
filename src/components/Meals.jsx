import useHttp from "../hooks/useHttp";
import Error from "./Error";
import MealItem from "./MealItem";

const requestConfig = {};

export default function Meals() {
  const {
    data: mealsState,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Data fetching....</p>;
  }
  if (error) {
    return <Error title="Meals not available right now" message={error} />;
  }
  return (
    <ul id="meals">
      {mealsState.map((item) => {
        return (
          <div>
            <MealItem key={item.id} meal={item} />
          </div>
        );
      })}
    </ul>
  );
}
