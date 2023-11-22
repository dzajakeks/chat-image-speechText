import React from 'react';
import useClipboard from 'react-use-clipboard';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

const SpeechToText = () => {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const [isCopied, setCopied] = useClipboard(finalTranscript, {
    successDuration: 1000,
  });

  if (!browserSupportsSpeechRecognition) {
    return (
      // <span className='text-white text-center border-2 border-red-600 mx-auto'>
      //   Browser doesn't support speech recognition. Please make sure to use at
      //   least the latest version of Google Chrome.
      // </span>
      <section className='bg-[#505E61]'>
        <div className='w-11/12 mx-auto pb-6'>
          <div className='mx-auto w-fit text-center'>
            <h1 className='text-white py-1 text-2xl sm:text-3xl'>
              Speech to Text Converter
            </h1>
            <p className='mb-2 text-lg'>
              Browser doesn't support speech recognition. Please make sure to
              use at least the latest version of Google Chrome.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='bg-[#505E61]'>
      <div className='w-11/12 mx-auto pb-6'>
        <div className='mx-auto w-fit text-center'>
          <h1 className='text-white py-1 text-2xl sm:text-3xl'>
            Speech to Text Converter
          </h1>
          <p className='mb-2 text-lg'>Microphone: {listening ? 'on' : 'off'}</p>
        </div>
        <div className='bg-white max-w-2xl pb-32 mb-4 mx-auto'>
          <p className='p-2'>{transcript}</p>
        </div>
        <div className='flex max-w-2xl mx-auto'>
          <div className='flex flex-col'>
            <button
              className='lang-btn'
              onClick={() =>
                SpeechRecognition.startListening({
                  continuous: true,
                  language: 'en-US',
                })
              }
            >
              Start English
            </button>
            <button
              className='lang-btn'
              onClick={() =>
                SpeechRecognition.startListening({
                  continuous: true,
                  language: 'zh-CN',
                })
              }
            >
              Start Mandarin
            </button>
            <button
              className='lang-btn'
              onClick={() =>
                SpeechRecognition.startListening({
                  continuous: true,
                  language: 'es-ES',
                })
              }
            >
              Start Spanish
            </button>
            <button
              className='lang-btn'
              onClick={() =>
                SpeechRecognition.startListening({
                  continuous: true,
                  language: 'sr-SP',
                })
              }
            >
              Start Serbian
            </button>
          </div>
          <div className='flex justify-between w-full items-start flex-wrap'>
            <button
              className='lang-btn bg-red-500'
              onClick={() => SpeechRecognition.stopListening()}
            >
              Stop Listening
            </button>
            <button
              className='lang-btn bg-[#171A21]'
              onClick={() => resetTranscript()}
            >
              Clear Text
            </button>
            <button className='lang-btn bg-[#171A21]' onClick={setCopied}>
              {isCopied ? 'Copied' : 'Copy Text'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeechToText;
