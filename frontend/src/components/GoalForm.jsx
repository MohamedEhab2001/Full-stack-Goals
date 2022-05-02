import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createGoal, SelectGoal } from "../features/goals/goalSlice";
import { SelectAuth } from "../features/auth/authSlice";
function GoalForm() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, message } = useSelector(SelectGoal);
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createGoal(text));
    setText("");
  };

  useEffect(() => {
    if (isError && !isLoading) {
      toast.error(message);
    }
    if (isSuccess && !isLoading) {
      toast.success("Goal added");
    }
  }, [isLoading, isError, isSuccess, message, dispatch]);

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
