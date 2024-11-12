"use client"
import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch
  } = useForm<SignUpFormValues>();

  const onSubmit = (data: SignUpFormValues) => {
    // Handle form submission
    console.log("Form submitted:", data);
  };
  const password = watch("password");

  return (
    <div className="flex justify-around mx-auto mt-10 min-h-screen w-[80%]">
      <div className="p-8 w-full max-w-md"> 
        <h2 className="text-2xl font-bold mb-6 text-center text-[#00078F] opacity-25"><span className="text-gray-400">__________</span> Sign Up <span className="text-gray-400">__________</span></h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            {/* <label htmlFor="username" className="block font-medium">
              Username
            </label> */}
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="border border-gray-300 rounded p-2 w-full my-2 outline-none"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            {/* <label htmlFor="email" className="block font-medium">
              Email
            </label> */}
            <input
              id="email"
              type="email"
              placeholder="Email address"
              className="border border-gray-300 rounded p-2 w-full my-2 outline-none"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            {/* <label htmlFor="password" className="block font-medium">
              Password
            </label> */}
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded p-2 w-full my-2 outline-none"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            {/* <label htmlFor="confirmPassword" className="block font-medium">
              Confirm Password
            </label> */}
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="border border-gray-300 rounded p-2 w-full my-2 outline-none"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#00078F] opacity-25 hover:bg-[#00078F] hover:opacity-35 text-white p-2 rounded w-full mt-4"
          >
            Sign Up
          </button>
        </form>
      </div>

      <div className="">
        <Image src={"/images/signup.jpg"} alt="signup" width={600} height={600}/>
      </div>
    </div>
  );
}

export default page
