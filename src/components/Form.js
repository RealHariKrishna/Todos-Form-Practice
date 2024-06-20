import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Form = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
    mode: "onChange",
  });

  const submitHandler = (data) => {
    const { name, email } = data;
    console.log(name, email);
    toast.success("Submitted Successfully");
  };

  return (
    <div className="flex flex-col p-5 justify-center items-center bg-orange-200 h-screen">
      <h1 className="mb-2 font-bold">Normal form</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="flex flex-col">
          <label className="font-semibold" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              minLength: {
                value: 4,
                message: "Enter a Valid Name",
              },
              required: {
                value: true,
                message: "Dont Leave it empty",
              },
              pattern: {
                value: /^[a-zA-Z\s]+$/,
                message: "Name has numbers",
              },
            })}
            placeholder="Enter your name"
            className={`rounded p-3 my-2 bg-gray-600 text-white font-medium ${
              errors.name?.message && "border-red-500"
            }`}
          />
          {errors.name?.message && (
            <p className=" text-red-800 text-sm mt-1 mb-2">
              {errors.name?.message}
            </p>
          )}
          <label className="font-semibold mt-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              minLength: {
                value: 10,
                message: "Email name too small",
              },
              required: {
                value: true,
                message: "Dont Leave it empty",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email invalid format",
              },
            })}
            placeholder="Enter your email"
            className={`rounded p-3 my-2 bg-gray-600 text-white font-medium ${
              errors.email?.message && "border-red-500"
            }`}
          />
          {errors.email?.message && (
            <p className="text-red-900 text-sm mt-1 mb-2">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="flex flex-row justify-center">
          <button
            disabled={!isValid}
            type="submit"
            className="mt-3 p-3 bg-sky-700 text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
