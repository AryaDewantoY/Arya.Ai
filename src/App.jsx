import { useState } from 'react';
import './App.css';
import './index.css';
import { requestToGroq } from './utils/groq';
import { Light as SyntaxHighlight } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function App() {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true);
    const ai = await requestToGroq(document.getElementById('content').value);
    setData(ai);
    setLoading(false);
  };

  const handleCopyContent = () => {
    navigator.clipboard.writeText(data);
  };

  return (
    <main className="flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto">
      <h1 className="text-6xl text-white">Arya.AI</h1>
      <div className="w-full">
        <form className="flex flex-col gap-4 py-4 w-full" onSubmit={handleSubmit}>
          <div className="max-w-xl w-full">
            <input
              className="py-2 px-4 text-lg rounded-md w-full"
              placeholder="Search in Here..."
              id="content"
              type="text"
            />
            <button className="bg-blue-500 py-2 px-4 font-bold text-white rounded-md mt-4" type="submit">
              Search
            </button>
          </div>
        </form>
        {loading ? (
          <div className="text-white text-3xl">Loading...</div>
        ) : (
          data && (
            <div className="w-full relative">
              <SyntaxHighlight language="swift" style={darcula} wrapLongLines={true}>
                {data}
              </SyntaxHighlight>
              <button
                className="bg-blue-500 py-2 px-4 font-bold text-white rounded-md absolute right-0 mb-4 mr-4 bottom-4"
                onClick={handleCopyContent}
                style={{ position: 'sticky' }}
              >
                Copy Content
              </button>
            </div>
          )
        )}
      </div>
    </main>
  );
}

export default App;
