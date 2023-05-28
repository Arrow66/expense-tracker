"use client"

import useForm from "@/Lib/hooks/useForm";
import { useUser } from "reactfire";
import { DatabaseReference, push, child } from 'firebase/database';
import { useState } from "react";


const DashBoardForm: React.FunctionComponent<{ transactions: DatabaseReference }> = ({ transactions }) => {

    const { data } = useUser();
    const [isSuccess, setIsSucess] = useState(false);
    const [loading, setLoading] = useState(false);

    const { handleChange, handleSubmit, errors, values, reset } = useForm(() => {
        addToDB()

    }, {
        transaction: "",
        trtype: "",
        amount: ""

    });

    const addToDB = async () => {
        if (data) {
            const userID = data?.uid;
            try {
                setLoading(true);
                await push(child(transactions, userID), {
                    transactionName: values.transaction,
                    transactionType: values.trtype,
                    amount: values.amount
                })
                setIsSucess(true);
                setTimeout(() => {
                    setIsSucess(false);
                }, 2000);
                reset();
            }
            catch (err) {

                console.log("failed !")
            }
            finally {
                setLoading(false);
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
                isSuccess && <p className="mt-2 text-sm text-green-600 dark:text-green-500"> Added Successfully</p>
            }
            <button
                type="submit"
                disabled={loading}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                + Add Transaction
                {loading && <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>}
            </button>
        </form>
    )
}

export default DashBoardForm;