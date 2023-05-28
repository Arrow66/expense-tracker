"use client"

import DashBoardForm from "@/Components/Forms/DashBoardForm";
import Table from "@/Components/Table/ExpenseTable";
import { ref } from "firebase/database";
import { useAuth, useDatabase, useUser } from "reactfire";
import { useState } from "react";
import { CurrencyDollarIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const database = useDatabase();
  const transactions = ref(database, "transactions");
  const { data } = useUser();
  const auth  = useAuth();
  const [sum, setSum] = useState(0.0);
  const router  = useRouter();

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const handleLogout = async ()=>{
    await signOut(auth);
    router.replace("/")
  }

  return (
    <section className="bg-gradient-to-b from-blue-500 to-purple-500 text-white min-h-screen flex flex-col items-center justify-center px-6 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
      
        <div className="flex items-center mb-6">
          <CurrencyDollarIcon className="w-8 h-8 mr-2 text-gray-900" />
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
          <button
          className=" text-gray-400 hover:text-gray-600 justify-end ml-5"
          onClick={handleLogout}
        >
          Logout
        </button>
        </div>
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <EnvelopeIcon className="w-6 h-6 mr-2 text-gray-600" />
            <h2 className="text-lg font-bold text-gray-800">{data.email}</h2>
          </div>
        </div>
        <div className="flex items-center justify-center bg-gray-100 rounded-lg p-4 mb-4">
          <CurrencyDollarIcon className="w-6 h-6 text-gray-900 mr-2" />
          <div>
            <h3 className="text-lg font-bold text-gray-800">Total Balance</h3>
            <p className={`text-3xl font-bold ${sum >= 0 ? "text-green-600" : "text-red-600"}`}>
              {sum >= 0 ? "+" : "-"} ${Math.abs(sum).toFixed(2)}
            </p>
          </div>
        </div>
        <div className="space-y-4 flex-grow">
          <DashBoardForm transactions={transactions} />
        </div>
        <div className="mt-6">
          <Table transactions={transactions} onUpdateSum={setSum} />
        </div>
      </div>
    </section>
  );
}
