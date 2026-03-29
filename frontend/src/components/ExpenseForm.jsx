import { useEffect } from "react";
import { useForm } from "react-hook-form";

const ExpenseForm = ({ onSubmit, editingExpense, onCancel }) => {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // When editingExpense changes, populate form fields or reset
  useEffect(() => {
    if (editingExpense) {
      setValue("title", editingExpense.title);
      setValue("amount", editingExpense.amount);
      setValue("category", editingExpense.category);
      setValue("description", editingExpense.description);
      setValue("expenseDate", editingExpense.expenseDate);
    } else {
      reset();
    }
  }, [editingExpense]);

  // Form submission handler
  const handleFormSubmit = (data) => {
    if (onSubmit) {
      onSubmit(data);
      reset();
    }
  };

  //Tailwind classes for inputs and labels
  const inputClass =
    "w-full border border-gray-200 bg-gray-50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${editingExpense ? "bg-blue-100" : "bg-blue-100"}`}
        >
          {editingExpense ? "✏️" : "➕"}
        </div>
        <h2 className="text-base font-semibold text-gray-800">
          {editingExpense ? "Edit Expense" : "Add New Expense"}
        </h2>
      </div>

      {/* Form Handling */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Title + Amount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              placeholder="e.g Groceries"
              className={inputClass}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className={labelClass}>Amount (Rs.)</label>
            <input
              type="number"
              step="0.01"
              placeholder="0.00"
              className={inputClass}
              {...register("amount", {
                required: "Amount is required",
                min: { value: 0.01, message: "Must be greater than 0" },
              })}
            />
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.amount.message}
              </p>
            )}
          </div>
        </div>

        {/* Category + Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <select className={inputClass} {...register("category")}>
              <option value="">Select category</option>
              <option value="Food"> Food</option>
              <option value="Transport"> Transport</option>
              <option value="Shopping">Shopping</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Education"> Education</option>
              <option value="Other"> Other</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Date</label>
            <input
              type="date"
              className={inputClass}
              {...register("expenseDate", { required: "Date is required" })}
            />
            {errors.expenseDate && (
              <p className="text-red-500 text-xs mt-1.5">
                {errors.expenseDate.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>
            Description{" "}
            <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            placeholder="Any extra details.."
            className={inputClass}
            {...register("description")}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2.5 rounded-xl transition text-sm"
          >
            {editingExpense ? "Update Expense" : "Add Expense"}
          </button>
          {editingExpense && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl transition text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
