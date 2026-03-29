const categoryColors = {
  Food: "bg-orange-50 text-orange-600",
  Transport: "bg-blue-50 text-blue-600",
  Shopping: "bg-pink-50 text-pink-600",
  Entertainment: "bg-purple-50 text-purple-600",
  Health: "bg-green-50 text-green-600",
  Education: "bg-yellow-50 text-yellow-600",
  Other: "bg-gray-100 text-gray-600",
};


// Component to display list of expenses
const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        <div className="text-4xl mb-3">💸</div>
        <p className="text-gray-700 font-medium">No expenses yet</p>
        <p className="text-gray-400 text-sm mt-1">
          Add your first expense right above
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Your Expenses</h2>
        <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
          {expenses.length} total
        </span>
      </div>

      {/* Table (hidden on mobile devices) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-gray-400 uppercase tracking-wide bg-gray-50">
              <th className="px-6 py-3 font-medium">Expense</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Date</th>
              <th className="px-6 py-3 font-medium">Amount</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {expenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-800">{expense.title}</p>
                  {expense.description && (
                    <p className="text-gray-400 text-xs mt-0.5">
                      {expense.description}
                    </p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[expense.category] || "bg-gray-100 text-gray-600"}`}
                  >
                   
                    {expense.category || "Uncategorized"}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 text-xs">
                  {expense.expenseDate}
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-gray-800">
                    Rs. {parseFloat(expense.amount).toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onEdit(expense)}
                      className="text-xs text-blue-500 hover:text-blue-700 font-medium transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(expense.id)}
                      className="text-xs text-red-400 hover:text-red-600 font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards (shown on mobile devices) */}
      <div className="md:hidden divide-y divide-gray-50">
        {expenses.map((expense) => (
          <div key={expense.id} className="px-4 py-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">
                  {expense.title}
                </p>
                {expense.description && (
                  <p className="text-gray-400 text-xs mt-0.5">
                    {expense.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[expense.category] || "bg-gray-100 text-gray-600"}`}
                  >
                    {expense.category || "Other"}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {expense.expenseDate}
                  </span>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="font-bold text-gray-800 text-sm">
                  Rs. {parseFloat(expense.amount).toFixed(2)}
                </p>
                <div className="flex items-center gap-2 mt-2 justify-end">
                  <button
                    onClick={() => onEdit(expense)}
                    className="text-xs text-blue-500 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="text-xs text-red-400 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
