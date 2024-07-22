import React from "react";
import { IconLanguage } from "@tabler/icons-react";

const LanguageSelector = ({
  selectedLanguage,
  setSelectedLanguage,
  languages,
}) => {
  return (
    <span className="cursor-pointer rounded-full space-x-1 pl-1 bg-black flex flex-row items-center">
      <IconLanguage size={20} />
      <select
        className="bg-black text-white rounded-full py-1 flex felx-row outline-none"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
      >
        {languages.map((language) => (
          <option key={language} value={language} >
            {language}
          </option>
        ))}
      </select>
    </span>
  );
};

export default LanguageSelector;
