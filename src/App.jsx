import ChatbotGPT from './components/chatbot/ChatbotGPT';
import SpeechToText from './components/speechToText/SpeechToText';
import ImageUploader from './components/textFromImage/ImageUploader';

function App() {
  return (
    <main className=''>
      <div className='max-w-[1400px] mx-auto sm:p-3'>
        <ChatbotGPT />
        <br />
        <br />
        <ImageUploader />
        <br />
        <br />
        <SpeechToText />
      </div>
    </main>
  );
}

export default App;
