import { useState } from 'react';
import classes from './CarForm.module.css';

const CarForm = ({ car, onCancelEdit, onUpdateCar }) => {
  const [formData, setFormData] = useState({
    number: car.number,
    release_date: car.release_date,
    brand: car.brand,
    color: car.color,
    state: car.state,
    owner_surname: car.owner_surname,
    address: car.address,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateCar({ ...formData, _id: car._id });
  };

  return (
    <div className={classes.carForm}>
      <h2>Edit Car</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Number:
          <input type="text" name="number" value={formData.number} onChange={handleChange} />
        </label>
        <label>
          Release Date:
          <input type="text" name="release_date" value={formData.release_date} onChange={handleChange} />
        </label>
        <label>
          Brand:
          <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
        </label>
        <label>
          Color:
          <input type="text" name="color" value={formData.color} onChange={handleChange} />
        </label>
        <label>
          State:
          <input type="text" name="state" value={formData.state} onChange={handleChange} />
        </label>
        <label>
          Owner Surname:
          <input type="text" name="owner_surname" value={formData.owner_surname} onChange={handleChange} />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <div className={classes.buttons}>
          <button type="submit">Save</button>
          <button type="button" onClick={onCancelEdit}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;