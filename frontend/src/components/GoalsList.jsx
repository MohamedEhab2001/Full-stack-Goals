import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SelectGoal, getUserGoal } from "../features/goals/goalSlice";
import { SelectAuth } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import GoalItem from "./GoalItem";
import Spinner from "./Spinner";
const Container = styled.div`
  width: 70%;
  margin: 0 auto;
`;

const GoalsList = () => {
  const dispatch = useDispatch();
  const { goals, isLoading, isError } = useSelector(SelectGoal);
  const { isSuccess } = useSelector(SelectAuth);
  useEffect(() => {
    if (isSuccess) {
      dispatch(getUserGoal());
    }
    if (isError) {
      toast.error("There is an error getting your goals");
    }
  }, []);
  return (
    <Container>
      {isLoading ? (
        <h1>Loading goals . . . </h1>
      ) : (
        <h1>Your goals : {goals.length}</h1>
      )}
      {goals.length > 0 && !isLoading ? (
        <div className="goals">
          {goals.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
          ))}
        </div>
      ) : (
        <h3>You have not set any goals</h3>
      )}
    </Container>
  );
};

export default GoalsList;
