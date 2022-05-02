import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SelectAuth, AutherizeUser, reset } from "../features/auth/authSlice";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import GoalForm from "../components/GoalForm";
import GoalsList from "../components/GoalsList";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, userData, isLoading, isSuccess, message, isError } =
    useSelector(SelectAuth);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(AutherizeUser(user));
    }
    //clean Up
    return () => {
      dispatch(reset());
    };
  }, []);

  if (isError && !isLoading) {
    return (
      <>
        <Error msg={message} />
      </>
    );
  } else if (isSuccess && !isLoading) {
    return (
      <>
        <section className="heading">
          <h1>Welcome {userData.name}</h1>
          <p>Goals Dashboard</p>
        </section>
        <GoalForm />
        <GoalsList />
      </>
    );
  } else if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
};

export default Dashboard;
/*



      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
*/
