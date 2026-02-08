import { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "Anurag",
    },
  });

  const onSubmit = async (data) => {
    console.log("Form Data", data);
    setServerMessage("");

    try {
      // fake api delay
    await new Promise((res) => setTimeout(res, 2000));

    // Random success/fail simulation
    const success = Math.random() > 0.5;

    if(!success) {
      throw new Error("Server error. Try Again !");
    }
    setServerMessage("Signup Succesful");
    reset();
    }
    catch(error){
      setServerMessage(error.message);
    }

    // fake api delay
    await new Promise((res) => setTimeout(res, 2000));
    alert("Signup Successful");
  };

  const password = watch("password"); // Watch password field

  const [serverMessage,setServerMessage] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <h1>Production Form</h1>

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

        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        <button
          type="button"
          onClick={() => {
            reset("")
          }}
          style={{ marginLeft: 10 }}
        >
          Reset
        </button>
      </form>

      {serverMessage && (
        <p style={{
          color : serverMessage.includes("succesful") ? "green" : "red",
          margin : 10
        }}>
          {serverMessage}
        </p>
      )}
    </div>
  );
}

export default App;
