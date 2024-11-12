"use client";
import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface LoginFormValues {
  emailOrUsername: string;
  password: string;
}

const page = () => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    // Handle form submission
    console.log("Login form submitted:", data);
  };

  return (
    <div className="flex justify-around mx-auto mt-10 min-h-screen w-[80%]">
      <div className="p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#00078F] opacity-25">
          <span className="text-gray-400">__________</span> Login{" "}
          <span className="text-gray-400">__________</span>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            {/* <label htmlFor="emailOrUsername" className="block font-medium">
              Email/Username
            </label> */}
            <input
              id="emailOrUsername"
              type="text"
              placeholder="Email or Username"
              className="border border-gray-300 rounded p-2 w-full"
              {...register("emailOrUsername", {
                required: "Email or Username is required",
              })}
            />
            {errors.emailOrUsername && (
              <p className="text-red-500 text-sm">
                {errors.emailOrUsername.message}
              </p>
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
              className="border border-gray-300 rounded p-2 w-full"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#00078F] opacity-25 hover:bg-[#00078F] hover:opacity-35 text-white p-2 rounded w-full mt-4"
          >
            Login
          </button>
        </form>
      </div>

      <div className="">
        <Image src={"/images/login.jpg"} alt="login" width={600} height={600} />
      </div>
    </div>
  );
};

export default page;
