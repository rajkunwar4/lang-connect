import { useEffect, useState } from "react";
//openAI
import { OpenAI } from "openai";
//geminiAI
import { GoogleGenerativeAI } from "@google/generative-ai";

const openai = new OpenAI({
  apiKey: "my api key",
  dangerouslyAllowBrowser: true,
});

const API_KEY = "AIzaSyCHETe5VmgLahSNFjxMCa6w7z5a7_tI07Q";

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/* 
  Made using OpenAI api
const handleTranslate1 = async (sourceText) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: `You will be provided with a sentence. This sentence: ${sourceText}.
          Your tasks are to:
          - detect which language the sentence is written in
          - translate the sentence into the ${selectedLanguage}
          donot return anything other than the translated sentence
           `,
        },
      ],
    });
    const data = response.choices[0].message.content;
    setTargetText(data);
  } catch (error) {
    console.log("Error translating text", error);
  }
}; */

const useTranslate = (sourceText, selectedLanguage) => {
  const [targetText, setTargetText] = useState("");
  useEffect(() => {
    const handleTranslate = async (sourceText) => {
      try {
        const prompt = `You will be provided with a sentence. This sentence: ${sourceText}.
          Your tasks are to:
          - detect which language the sentence is written in
          - translate the sentence into the ${selectedLanguage}
          donot return anything other than the translated sentence
           `;
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        console.log(text);
        setTargetText(text);
      } catch (error) {
        console.log("AI error", error);
      }
    };

    //for debouncing
    if (sourceText.trim()) {
      const timeout = setTimeout(() => {
        handleTranslate(sourceText);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [sourceText, selectedLanguage]);
  return targetText;
};

export default useTranslate;
