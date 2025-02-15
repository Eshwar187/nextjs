"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 px-6">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl">
          <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">{loading ? "Signing Up..." : "Create an Account"}</h1>
          <p className="text-center text-gray-500 mb-6">Join us today! It takes only a few steps.</p>
          <hr className="mb-6" />
          <div className="flex flex-col space-y-5">
            <div>
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>
  
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
  
            <div>
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
  
            <button
              onClick={onSignup}
              disabled={buttonDisabled || loading}
              className={`w-full ${buttonDisabled || loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500 hover:bg-purple-600"} text-white font-bold py-3 rounded-lg transition duration-200`}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          <p className="mt-6 text-center text-gray-600">
            Already have an account? 
            <Link href="/login" className="text-purple-500 hover:underline ml-1">Login</Link>
          </p>
        </div>
      </div>
    );
  }