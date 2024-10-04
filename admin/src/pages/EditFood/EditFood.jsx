import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditFood = ({ url }) => {
  const { id } = useParams(); // Get food item ID from the URL
  const navigate = useNavigate();

  const [foodData, setFoodData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  // Fetch food item data to pre-fill the form
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`${url}/food/${id}`); // Get existing food data by ID
        setFoodData(response.data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };
    fetchFood();
  }, [id, url]);

  // Handle form input changes
  const handleChange = (e) => {
    setFoodData({ ...foodData, [e.target.name]: e.target.value });
  };

  // Handle form submission for editing the food item
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${url}/food/edit`, {
        id,  // Send the food ID along with the updated fields
        name: foodData.name,
        description: foodData.description,
        price: foodData.price,
        category: foodData.category
      });
      
      if (response.data.success) {
        toast.success('Food item updated successfully!');
        navigate('/list'); // Redirect to the list page after successful update
      } else {
        toast.error('Error updating food item.');
      }
    } catch (error) {
      console.error('Error updating food:', error);
      toast.error('Error updating food item.');
    }
  };

  return (
    <div className="edit-food">
      <h2>Edit Food Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={foodData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={foodData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={foodData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={foodData.category}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Food</button>
      </form>
    </div>
  );
};

export default EditFood;
