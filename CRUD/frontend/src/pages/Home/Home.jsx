import { useState, useEffect } from "react";
import axios from "axios";
import CarItem from "../../components/CarItem/CarItem";
import classes from "./Home.module.css";
import CarForm from "../../components/CarForm/CarForm";
import ModalWrapper from "../../components/ModalWrapper/ModalWrapper";

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editCar, setEditCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cars");
        setCars(response.data.data);
        console.log(cars);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/cars/${id}`);
      setCars(cars.filter((car) => car._id !== id));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleEdit = (car) => {
    setIsEditing(true);
    setEditCar(car);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditCar(null);
  };

  const handleUpdateCar = async (updatedCar) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/cars/${updatedCar._id}`,
        updatedCar
      );
      setCars(
        cars.map((car) =>
          car._id === updatedCar._id ? response.data.data : car
        )
      );
      setIsEditing(false);
      setEditCar(null);
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };


  return (
    <div className={classes.text}>
      <h1 className={classes.mainHeading}>Cars</h1>
      <div className={classes.tableHead}>
        <div className={classes.tableHeadNum}>
          <p>№</p>
        </div>
        <div className={classes.tableHeadDetails}>
          <p>Release date</p>
          <p>Brand</p>
          <p>Color</p>
          <p>State</p>
          <p>Owner surname</p>
          <p>Address</p>
        </div>
        <div className={classes.tableHeadActions}>
          <p>Actions</p>
        </div>
      </div>
      <ul>
        {cars.map((car) => (
          <CarItem key={car._id} car={car} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </ul>
      {isEditing && (
        <ModalWrapper closeFunc={handleCancelEdit}>
          <CarForm car={editCar} onCancelEdit={handleCancelEdit} onUpdateCar={handleUpdateCar} />
        </ModalWrapper>
      )}
    </div>
  );
};

export default HomePage;
