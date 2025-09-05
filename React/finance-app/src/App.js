import React, { useState, useEffect } from 'react'; // we are importing useState and useEffect hooks from react library. useState is used to manage state in a functional component and useEffect is used to perform side effects in a functional component.
import api from './api';

const App = () => {
  const [transactions, setTransactions] = useState([]); //here transactions is the state variable and setTransactions is the function that updates the state variable. useState is a hook that allows us to manage state in a functional component. We are initializing the state with an empty array. transactions is used to store the list of transactions fetched from the backend and setTransactions is used to update the state when we fetch new transactions from the backend. is it done on its own? No, it is done when we call the setTransactions function.
  const [formData, setFormData] = useState({ // formData is the state variable and setFormData is the function that updates the state variable. It is working by formdata is initialized with an object that has the same structure as our transaction model and setFormData is used to update the state when the user types in the form fields.
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  }); // what is happening here? useState is a hook that allows us to manage state in a functional component. We are initializing the state with an object that has the same structure as our transaction model.
// const is used to declare a variable that cannot be reassigned. Here we are declaring a variable called fetchTransactions that is a function that fetches the transactions from the backend and updates the state with the fetched transactions.
  const fetchTransactions = async () => {
    const response = await api.get('/transactions');
    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []); // here we are using the useEffect hook to call the fetchTransactions function when the component mounts. The empty array as the second argument means that this effect will only run once when the component mounts.

  const handleInputChange = (event) => {
    // Using === instead of == for strict equality comparison
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
    });
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/transactions', formData);
    fetchTransactions();
    setFormData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: ''
    });
  };

  return (
    <div>
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          {/* Fixed href attribute to have a valid value */}
          <a className='navbar-brand' href="/">
            Finance Tracker
          </a>
        </div>
      </nav>

      <div className='container'>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-3 mt-3'>
            <label htmlFor='amount' className='form-label'>
              Amount        
            </label>
            <input type='text' className='form-control' id='amount' name='amount' onChange={handleInputChange} value={formData.amount}>
            </input>
          </div>

          <div className='mb-3'>
            <label htmlFor='category' className='form-label'>
               Category        
            </label>
            <input type='text' className='form-control' id='category' name='category' onChange={handleInputChange} value={formData.category}>
            </input>
          </div>

          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Description        
            </label>
            <input type='text' className='form-control' id='description' name='description' onChange={handleInputChange} value={formData.description}>
            </input>
          </div>


           <div className='mb-3'>
            <label htmlFor='is_income' className='form-label'>
               Income?        
            </label>
            <input type='checkbox'  id='is_income' name='is_income' onChange={handleInputChange} checked={formData.is_income}>
            </input>
          </div>


           <div className='mb-3'>
            <label htmlFor='date' className='form-label'>
              Date        
            </label>
            <input type='date' className='form-control' id='date' name='date' onChange={handleInputChange} value={formData.date}>
            </input>
          </div>

          <button type='submit' className='btn btn-primary'>
            Add Transaction
          </button>

        </form>

        <table className='table table-striped table-bordered table-hover'>
          <thead>
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Income?</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction)=>(
              <tr key={transaction.id}>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.is_income ? 'Yes': 'No'}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      </div>
    )
  };




export default App;
 
// why is there no space or newline for the input box? What should I correct in the code? Answer: You need to add the class 'form-control' to your input elements to apply Bootstrap's styling, which includes spacing and proper layout. For example, change <input type='text' className='form-label' ... /> to <input type='text' className='form-control' ... />. This will ensure that the input boxes have appropriate spacing and styling.