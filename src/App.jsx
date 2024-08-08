import React, { useState, useRef } from 'react';
import Editor from './components/Editor';
import { html, css, js } from './constants/defaultCode';

const MonacoEditorWrapper = () => {
  const [htmlCode, setHtmlCode] = useState(html);
  const [cssCode, setCssCode] = useState(css);
  const [jsCode, setJsCode] = useState(js);

  const [selectedFileType, setSelectedFileType] = useState('html');
  const iframeRef = useRef(null);

  const handleEditorChange = (value) => {
    if (selectedFileType === 'html') {
      setHtmlCode(value);
    } else if (selectedFileType === 'css') {
      setCssCode(value);
    } else if (selectedFileType === 'javascript') {
      setJsCode(value);
    }
  };

  const handleFileTypeChange = (fileType) => {
    setSelectedFileType(fileType);
  };

  const runCode = () => {
    const iframe = iframeRef.current;
    const document = iframe.contentDocument || iframe.contentWindow.document;
    document.open();
    document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}<\/script>
        </body>
      </html>
    `);
    document.close();
  };

  return (
    <div>
      {/* navbar */}
      <nav className='flex gap-2 justify-between pr-4 h-12 bg-gray-100'>
        <div>
          <button
            onClick={() => handleFileTypeChange('html')}
            className={`px-4 py-2 ${selectedFileType === 'html' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-700'} transition`}
          >
            index.html
          </button>
          <button
            onClick={() => handleFileTypeChange('css')}
            className={`px-4 py-2 ${selectedFileType === 'css' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-700'} transition`}
          >
            style.css
          </button>
          <button
            onClick={() => handleFileTypeChange('javascript')}
            className={`px-4 py-2 ${selectedFileType === 'javascript' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-700'} transition`}
          >
            script.js
          </button>
        </div>
        <div className='p-2'>
          {/* Run button */}
          <button
            onClick={runCode}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
          >
            Run Code
          </button>
        </div>
      </nav>
      <div className='flex gap-4 w-full p-4'>
        <div className='w-[70%]'>
          {/* File type selection buttons */}

          {/* Conditional rendering of editors */}
          <div>
            {selectedFileType === 'html' && (
              <Editor
                theme='vs-light'
                language='html'
                value={htmlCode}
                handleEditorChange={handleEditorChange}
              />
            )}
            {selectedFileType === 'css' && (
              <Editor
                theme='vs-light'
                language='css'
                value={cssCode}
                handleEditorChange={handleEditorChange}
              />
            )}
            {selectedFileType === 'javascript' && (
              <Editor
                theme='vs-light'
                language='javascript'
                value={jsCode}
                handleEditorChange={handleEditorChange}
              />
            )}
          </div>
        </div>

        <div className='w-[30%] '>
          {/* Output iframe */}
          <div className='h-full'>
            <iframe
              ref={iframeRef}
              title='output'
              className='w-full h-full border rounded shadow-md'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonacoEditorWrapper;
