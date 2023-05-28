"use client"

import useForm from "@/Lib/hooks/useForm";
import { useUser } from "reactfire";
import { DatabaseReference,push, child } from 'firebase/database';
import { useState } from "react";


const DashBoardForm: React.FunctionComponent<{ transactions: DatabaseReference }> = ({ transactions }) => {

    const { data } = useUser();
    const [isSuccess,setIsSucess] = useState(false);

    const { handleChange, handleSubmit, errors, values,reset } = useForm(() => {
        addToDB()
       
    }, {
        transaction:"",
        trtype:"",
        amount:""

    });

    const addToDB = async () => {
        if (data) {
            const userID = data?.uid;
            try
            {
           await push(child(transactions, userID), {
                transactionName: values.transaction,
                transactionType: values.trtype,
                amount: values.amount
            })
            setIsSucess(true);
            setTimeout(()=>{
                setIsSucess(false);
            },2000);
            reset();
        }
        catch(err)
        {

            console.log("failed !")
        }
        }

    }

    return (
        <form className="space-y-2 md:space-y-4" onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="transaction"
                    id="transaction"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="add transaction "
                    onChange={handleChange}
                    maxLength={10}
                    value={values.transaction}
                />
                {errors.transaction && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.transaction}</p>
                }
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-2 group">
                    <select
                        id="trtype"
                        onChange={handleChange}
                        name="trtype"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={values.trtype}
                    >
                        <option value=""> Transaction Type</option>
                        <option value="expense">Expense</option>
                        <option value="deposit">Deposit</option>
                    </select>
                    {errors.trtype && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.trtype}</p>
                    }
                </div>
                <div className="relative z-0 w-full mb-2 group">
                    <input
                        type="number"
                        name="amount"
                        id="amount"
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Amount "
                        min={1}
                        step="any"
                        value={values.amount}
                    />
                    {errors.amount && <p className="mt-2 text-sm text-red-600 dark:text-red-500"> {errors.amount}</p>
                    }
                </div>
            </div>
            {
                isSuccess&& <p className="mt-2 text-sm text-green-600 dark:text-green-500"> Added Successfully</p>
            }
            <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                + Add Transaction
            </button>
        </form>
    )
}

export default DashBoardForm;