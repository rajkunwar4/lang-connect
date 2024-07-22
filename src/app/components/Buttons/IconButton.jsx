import React from "react";
import { Icon} from "@tabler/icons-react";

const IconButton = ({ icon, onClick }) => {
  return (
    <span
      className="curosor-pointer flex items-center space-x-2"
      onClick={onClick}
    >
      <Icon size={22} />
    </span>
  );
};

export default IconButton;
