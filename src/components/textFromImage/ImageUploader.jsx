import React, { useState } from 'react';
import RecognizeText from './RecognizeText';

const ImageUploader = () => {
  const [chosenImage, setChosenImage] = useState(null);
  const [recognisedText, setRecognisedText] = useState('');

  function uploadImage(e) {
    const image = e.target.files[0];
    setChosenImage(URL.createObjectURL(image));
    setRecognisedText('Scanning image...');
  }

  return (
    <section className='bg-[#505E61] px-1 sm:'>
      <div className='w-full mx-auto pb-6'>
        <div className='mx-auto w-fit'>
          <h1 className='text-white text-2xl sm:text-3xl py-1 mb-4 text-center'>
            Get words from image
          </h1>
          <input
            className='file:bg-[#171A21] file:text-white file:border-none file:p-2 file:rounded-md file:hover:cursor-pointer text-white bg-[#455154] w-56 mb-8 rounded-r-md mx-auto block'
            type='file'
            accept='image/*'
            onChange={uploadImage}
          />
        </div>
        <div className='grid grid-cols-1 justify-center sm:grid-cols-2'>
          <div className='bg-[#171A21] h-full flex px-2'>
            {chosenImage && (
              <img
                className='m-auto max-h-[500px]'
                src={chosenImage}
                alt='selected image'
              />
            )}
          </div>
          <RecognizeText
            recognisedText={recognisedText}
            setRecognisedText={setRecognisedText}
            chosenImage={chosenImage}
            selectImages={setChosenImage}
          />
        </div>
      </div>
    </section>
  );
};
export default ImageUploader;
