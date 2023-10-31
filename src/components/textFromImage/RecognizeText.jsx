import React, { useEffect } from 'react';
import useClipboard from 'react-use-clipboard';
import Tesseract from 'tesseract.js';

const RecognizeText = ({ chosenImage, recognisedText, setRecognisedText }) => {
  const [isCopied, setCopied] = useClipboard(recognisedText, {
    successDuration: 1000,
  });
  useEffect(() => {
    async function recogniseText() {
      if (chosenImage) {
        const result = await Tesseract.recognize(chosenImage);
        setRecognisedText(result.data.text);
      } else {
        setRecognisedText("I can't read this!");
      }
    }
    recogniseText();
  }, [chosenImage, recognisedText]);

  return (
    <>
      <div className='bg-white'>
        {chosenImage && (
          <div>
            <p className={recognisedText && 'p-2'}>
              {recognisedText ? recognisedText : "I can't read this!"}
            </p>
            {recognisedText && (
              <button
                onClick={setCopied}
                className='bg-[#171A21] p-2 mb-2 ml-2 text-white rounded-md'
              >
                {isCopied ? 'Copied' : 'Copy Text'}
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default RecognizeText;
