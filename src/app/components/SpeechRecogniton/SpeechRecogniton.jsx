import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { IconMicrophone } from "@tabler/icons-react";

const SpeechRecognitionComponent = ({ setSourceText }) => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    setSourceText(transcript);
  }, [transcript, setSourceText]);

  const handleVoiceRecording = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      console.log("stopped listeninggg");
    } else {
      SpeechRecognition.startListening();
      console.log(" listeninggg");
    }
  };

  return (
    <div>
      <IconMicrophone
        size={22}
        className="text-gray-400"
        onClick={handleVoiceRecording}
      />
    </div>
  );
};

export default SpeechRecognitionComponent;
