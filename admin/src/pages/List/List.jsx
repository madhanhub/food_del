import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const List = ({ url }) => {
  const [foodItems, setFoodItems] = useState([]);

  // Fetch all food items
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(`${url}/food`); // Assuming you have a GET route for fetching food items
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };
    fetchFoodItems();
  }, [url]);

  return (
    <div className="food-list">
      <h2>Food Items</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((food) => (
            <tr key={food._id}>
              <td>{food.name}</td>
              <td>{food.description}</td>
              <td>{food.price}</td>
              <td>{food.category}</td>
              <td>
                {/* Add an edit button that links to the edit form */}
                <Link to={`/edit/${food._id}`}>
                  <button>Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
