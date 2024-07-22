"use client";
import "regenerator-runtime/runtime";
import Image from "next/image";
import TextArea from "@/app/components/Inputs/TextArea.jsx";
import { ChangeEvent, useState } from "react";
import SpeechRecognitonComponent from "@/app/components/SpeechRecogniton/SpeechRecogniton.jsx";
import {
  IconCopy,
  IconFileUpload,
  IconStar,
  IconThumbDown,
  IconThumbUp,
  IconVolume,
} from "@tabler/icons-react";
import FileUpload from "@/app/components/Inputs/FileUpload.jsx";
import { rtfToText } from "@/app/utils/rtfToText";
import LinkPaste from "@/app/components/Inputs/LinkPaste";
import Link from "next/link";
import useTranslate from "@/app/hooks/useTranslate";
import LanguageSelector from "@/app/components/Inputs/LanguageSelector";
import { space } from "postcss/lib/list";
import { Span } from "next/dist/trace";

export default function Home() {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [languages] = useState([
    "English",
    "French",
    "Spanish",
    "German",
    "Hindi",
    "Chinese",
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Spanish");
  const targetText = useTranslate(sourceText, selectedLanguage);
  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
    }
  };

  const handleLinkPaste = (text: string) => {};

  const handleCopyToClipboard = () => {
    window.navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <div>
      <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="relative overflow-hidden h-screen">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10 sm:py-24 ">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-neutral-200">
                Lang<span className="text-orange-500">Connect</span>
              </h1>
              <p className="mt-3 text-neutral-400 ">
                LangConnect: Bridging Voices, Connecting Worlds
              </p>

              <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative ">
                <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div className="relative z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                    {" "}
                    {/* From textarea  */}
                    <TextArea
                      placeholder={"Enter text to convert"}
                      id={"source-language"}
                      value={sourceText}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        setSourceText(e.target.value);
                      }}
                    />
                    {/* icons and attachments */}
                    <div className="flex flex-row justify-between w-full ">
                      <span className="curosor-pointer flex space-x-2 flex-row ">
                        <SpeechRecognitonComponent
                          setSourceText={setSourceText}
                        />
                        <IconVolume
                          size={22}
                          onClick={() => {
                            handleAudioPlayback(sourceText);
                          }}
                        />
                        <FileUpload handleFileUpload={handleFileUpload} />
                        {/* file upload comp */}
                        <LinkPaste handleLinkPaste={handleLinkPaste} />
                        <span className="text-sm pr-4">
                          {sourceText.length}/1000
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* second part */}
                  <div className="relative z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                    {" "}
                    {/* From textarea  */}
                    <TextArea
                      placeholder={"Target Language"}
                      id={"target-language"}
                      value={targetText}
                      onChange={() => {}}
                    />
                    {/* icons and attachments */}
                    <div className="flex flex-row justify-between w-full">
                      <span className="cursor-pointer flex space-x-2 flex-row items-center ">
                        <LanguageSelector
                          selectedLanguage={selectedLanguage}
                          setSelectedLanguage={setSelectedLanguage}
                          languages={languages}
                        />
                        <IconVolume
                          size={22}
                          onClick={() => {
                            handleAudioPlayback(targetText);
                          }}
                        />
                      </span>
                      <div className="flex flex-row items-center space-x-2 pr-4">
                        <IconCopy size={22} onClick={handleCopyToClipboard} />
                        {copied && (
                          <span className="text-xs text-green-500">
                            Copied!
                          </span>
                        )}
                        <IconThumbUp size={22} />
                        <IconThumbDown size={22} />
                        <IconStar
                          size={22}
                          onClick={() => {}}
                          className={`${favorite ? "text-yellow-400" : ""}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
