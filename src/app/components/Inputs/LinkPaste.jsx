import React from "react";
import { IconLink } from "@tabler/icons-react";

const LinkPaste = ({ handleLinkPaste }) => {
  return (
    <label htmlFor="link-input" className="cursor-pointer">
      <IconLink size={21} />
      <input
        type="text"
        name=""
        id="link-input"
        className="hidden"
        onChange={handleLinkPaste}
      />
    </label>
  );
};

export default LinkPaste;
