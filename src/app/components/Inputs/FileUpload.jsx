import React from "react";
import { IconPaperclip } from "@tabler/icons-react";

const FileUpload = ({ handleFileUpload }) => {
  return (
    <label htmlFor="file-upload" className="cursor-pointer">
      <IconPaperclip size={21} />
      <input
        type="file"
        name=""
        id="file-upload"
        className="hidden"
        onChange={handleFileUpload}
      />
    </label>
  );
};

export default FileUpload;
