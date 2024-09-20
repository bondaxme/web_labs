import classes from './CarItem.module.css';

const CarItem = ({ car, onDelete, onEdit }) => {
  return (
    <div className={classes.carItem}>
      <div className={classes.carItemHeader}>
        <p>{car.number}</p>
      </div>
      <div className={classes.carItemDetails}>
        <p>{car.release_date}</p>
        <p>{car.brand}</p>
        <p>{car.color}</p>
        <p>{car.state}</p>
        <p>{car.owner_surname}</p>
        <p>{car.address}</p>
      </div>
      <div className={classes.carItemActions}>
        <button onClick={() => onEdit(car)}>Edit</button>
        <button onClick={() => onDelete(car._id)}>Delete</button>
      </div>
    </div>
  );
};

export default CarItem;
