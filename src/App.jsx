import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data", data);
    alert("Signup Successful");
  };

  const password = watch("password"); // Watch password field

  return (
    <div style={{ padding: 20 }}>
      <h1>SignUp Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* USER NAME */}

        <div>
          <input
            type="text"
            placeholder="Enter User Name"
            {...register("userName", {
              required: "UserName is required",
            })}
          />

          <p style={{ color: "red" }}>{errors.userName?.message}</p>
        </div>

        {/* NAME */}

        <div>
          <input
            placeholder="Enter Name"
            {...register("name", {
              required: "Name is required",
            })}
          />

          <p style={{ color: "red" }}>{errors.name?.message}</p>
        </div>

        {/* EMAIL */}

        <div>
          <input
            type="email"
            placeholder="Enter Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
          />
          <p style={{ color: "red" }}>{errors.email?.message}</p>
        </div>

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Min 6 characters",
              },
            })}
          />
          <p style={{ color: "red" }}>{errors.password?.message}</p>
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <input
            type="passowrd"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Password do not match",
            })}
          />

          <p style={{ color: "red" }}>{errors.confirmPassword?.message}</p>
        </div>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default App;
