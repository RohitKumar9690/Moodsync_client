import { motion } from "framer-motion";
import "./habittbutton.css";

const ButtonGroup = ({ onComplete, onSkip }) => {
  return (
    <div className="flex justify-center items-center gap-3">
     <div className="checkbox-wrapper-31 completed glassy-icon-btn">
  <input type="checkbox" onChange={onComplete} />
  <svg viewBox="0 0 35.6 35.6">
    <circle className="background" cx="17.8" cy="17.8" r="17.8" />
    <circle className="stroke" cx="17.8" cy="17.8" r="14.37" />
    <polyline className="check" points="11.78 18.12 15.55 22.23 25.17 12.87" />
  </svg>

</div>

<div className="checkbox-wrapper-31 skipped glassy-icon-btn ">
  <input type="checkbox" onChange={onSkip} />
  <svg viewBox="0 0 35.6 35.6">
    <circle className="background" cx="17.8" cy="17.8" r="17.8" />
    <circle className="stroke" cx="17.8" cy="17.8" r="14.37" />
    <line className="check" x1="12" y1="12" x2="24" y2="24" />
    <line className="check" x1="24" y1="12" x2="12" y2="24" />
  </svg>
</div>

    </div>
  );
};

export default ButtonGroup;
