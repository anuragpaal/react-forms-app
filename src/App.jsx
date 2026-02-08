import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data", data);
    alert("Login Successful");
  };

  return (
    <div style={{padding: 20}}>
      <h1>Login Form</h1>

      <form onSubmit={handleSubmit(onSubmit)}>

        {/* EMAIL */}

        <div>
          <input 
          type="email"
          placeholder="Enter Email"
          {...register("email",{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          })
          }
          />
          <p style={{color: "red"}}>
            {errors.email?.message}
          </p>
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
          <p style={{ color: "red" }}>
            {errors.password?.message}
          </p>
        </div>

        <button type="submit">
          Login
        </button>

      </form>
    </div>
  );
}

export default App;
