const ModalWrapper = ({ children, closeFunc }) => {
    const styles = {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: "1000",
      backdropFilter: "blur(3px)",
    };
  
    return (
      <div style={styles} onClick={closeFunc}>
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    );
  };
  
  export default ModalWrapper;