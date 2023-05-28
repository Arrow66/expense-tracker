"use client";

import { Login } from "@/Components/Forms/LoginForm"
import { RegisterForm } from "@/Components/Forms/RegisterForm"
import { useState } from "react"


export default function Home() {

  const [isRegisterSelected, setisRegisterSelected] = useState(false);

  const toggleForm  = ()=>{
    setisRegisterSelected((prev)=>(!prev));
  }

  return (
    <main>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            Expense Tracker!
          </h1>
          {
            isRegisterSelected ?
              <RegisterForm toggleForm={toggleForm} />
              : <Login toggleForm={toggleForm}/>
          }
        </div>
      </section>
    </main>
  )
}
