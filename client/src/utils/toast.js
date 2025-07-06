import toast from "react-hot-toast";

const glassStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  color: "#fff",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
  borderRadius: "12px",
};

export const showSuccess = (message) => {
  toast.success(message, {
    duration: 3000,
    style: {
      ...glassStyle,
      borderLeft: "4px solid #4ade80", // Green left border
    },
  });
};

export const showError = (message) => {
  toast.error(message, {
    duration: 3000,
    style: {
      ...glassStyle,
      borderLeft: "4px solid #f87171", // Red left border
    },
  });
};

export const showInfo = (message) => {
  toast(message, {
    duration: 3000,
    style: {
      ...glassStyle,
      borderLeft: "4px solid #60a5fa", // Blue left border
    },
  });
};
