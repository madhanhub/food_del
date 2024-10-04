import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './EditFood.css';  // Import the CSS here

const EditFood = ({ url }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodData, setFoodData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`${url}/food/${id}`);
        setFoodData(response.data);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };
    fetchFood();
  }, [id, url]);

  const handleChange = (e) => {
    setFoodData({ ...foodData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${url}/food/edit`, {
        id,
        name: foodData.name,
        description: foodData.description,
        price: foodData.price,
        category: foodData.category
      });

      if (response.data.success) {
        toast.success('Food item updated successfully!');
        navigate('/list');
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
