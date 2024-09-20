import React, { useState } from "react";
import axios from "axios";
import classes from "./CreateCar.module.css";

const CreateCar = () => {
  const [formData, setFormData] = useState({
    number: "",
    release_date: "",
    brand: "",
    color: "",
    state: "",
    owner_surname: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/cars", formData);
      console.log(response.data);
      history.push('/')
    } catch (error) {
      console.error("Error creating car:", error);
    }

    window.location.href = "/";
  };

  return (
    <div className={classes.createCarContainer}>
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label className={classes.label}>Number:</label>
          <input
            type="text"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label}>Release Date:</label>
          <input
            type="text"
            name="release_date"
            value={formData.release_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label}>Brand:</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label}>Color:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label}>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label}>Owner Surname:</label>
          <input
            type="text"
            name="owner_surname"
            value={formData.owner_surname}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label}>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button className={classes.submit} type="submit">Create Car</button>
      </form>
    </div>
  );
};

export default CreateCar;
