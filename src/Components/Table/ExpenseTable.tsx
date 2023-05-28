import { DatabaseReference, child } from 'firebase/database';
import { useDatabaseListData, useUser } from 'reactfire';
import { User } from 'firebase/auth';
import { useEffect } from 'react';

interface Transaction {
  transactionName: string;
  transactionType: string;
  amount: string;
  NO_ID_FIELD:string;
}

const Table: React.FunctionComponent<{ transactions: DatabaseReference; onUpdateSum: (sum: number) => void }> = ({ transactions, onUpdateSum }) => {
  const { data: user } = useUser<User>();

  const { data: transactionData, status: transactionStatus }: { data: Transaction[] | null; status: string } = useDatabaseListData(child(transactions, user?.uid || ''));
  useEffect(() => {
    if (transactionData) {
      const sum = transactionData.reduce<number>((acc, trs) => {
        return trs.transactionType === 'expense' ? acc - parseFloat(trs.amount) : acc + parseFloat(trs.amount);
      }, 0.0);
      onUpdateSum(sum);
    }
  }, [transactionStatus, transactionData, onUpdateSum]);

  if (transactionStatus === 'loading') {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-left">
              Latest Transactions
            </th>
            <th scope="col" className="px-6 py-3 text-left">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {transactionData?.map(({ transactionName, transactionType, amount,NO_ID_FIELD }) => (
            <tr key={NO_ID_FIELD} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{transactionName}</td>
              <td className={transactionType === 'expense' ? 'px-6 py-4 text-red-700' : 'px-6 py-4 text-green-700'}>
                {transactionType === 'expense' ? '-' : '+'}
                {amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
