import { useState, useEffect } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch expenses on component mount once user is authenticated
  useEffect(() => {
    fetchExpenses();
  }, []);

  // Fetch expenses from API
  const fetchExpenses = async () => {
    try {
      // Call API to get expenses
      const response = await api.get("/api/expenses");
      setExpenses(response.data.data);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for add and edit
  const handleFormSubmit = async (data) => {
    try {
      //For edit-mode: call update API, else call create API
      if (editingExpense) {
        //Call API to update expense
        await api.put(`/api/expenses/${editingExpense.id}`, data);
      } else {
        //Call API to create new expense
        await api.post("/api/expenses", data);
      }
      fetchExpenses();
      setEditingExpense(null);
    } catch (err) {
      console.error("Failed to save expense", err);
    }
  };

  // Handle edit button click
  const handleEdit = (expense) => setEditingExpense(expense);
  //Handle cancel button click in form
  const handleCancel = () => setEditingExpense(null);
  //Handle delete button click
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;
    try {
      //Call API to delete expense
      await api.delete(`/api/expenses/${id}`);
      fetchExpenses();
    } catch (err) {
      console.error("Failed to delete expense", err);
    }
  };

  // Calculate stats
  const totalSpent = expenses
    .reduce((sum, e) => sum + parseFloat(e.amount), 0)
    .toFixed(2);

  // Calculate highest expense and this month's total
  const highestExpense =
    expenses.length > 0
      ? Math.max(...expenses.map((e) => parseFloat(e.amount))).toFixed(2)
      : "0.00";

  // Calculate total spent in the current month
  const thisMonth = expenses
    .filter((e) => {
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      const d = new Date(e.expenseDate);
      return d.getMonth() === month && d.getFullYear() === year;
    })
    .reduce((sum, e) => sum + parseFloat(e.amount), 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {/* Total */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              Total Spent
            </p>
            <p className="text-2xl font-bold text-blue-600">Rs. {totalSpent}</p>
            <p className="text-xs text-gray-400 mt-1">
              {expenses.length} expenses
            </p>
          </div>

          {/* This month */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              This Month
            </p>
            <p className="text-2xl font-bold text-emerald-500">
              Rs. {thisMonth}
            </p>
            <p className="text-xs text-gray-400 mt-1">Current month</p>
          </div>

          {/* Highest */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              Highest Expense
            </p>
            <p className="text-2xl font-bold text-orange-500">
              Rs. {highestExpense}
            </p>
            <p className="text-xs text-gray-400 mt-1">Single transaction</p>
          </div>
        </div>

        {/* Form and Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ExpenseForm
            onSubmit={handleFormSubmit}
            editingExpense={editingExpense}
            onCancel={handleCancel}
          />
          <ExpenseChart expenses={expenses} />
        </div>

        {/* List */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <p className="text-gray-400 text-sm">Loading your expenses...</p>
          </div>
        ) : (
          <ExpenseList
            expenses={expenses}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
