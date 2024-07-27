// components/MonacoEditor.js
import React, { useState } from 'react';
import { Editor } from '@monaco-editor/react';
// import { runCode } from './utils/runcode';

const MonacoEditor = () => {
  const [code, setCode] = useState('// Write your code here');

  const handleEditorChange = (value) => {
    setCode(value);
  };

//  runCode(code).then(
//   (result) => {
//     console.log('completed');
//     },
//  )

  return (
    <div>
      <h1>Code Editor</h1>
      <Editor
        theme='vs-light'
        width='900px'
        height='90vh'
        defaultLanguage='javascript'
        value={code}
        onChange={handleEditorChange}
      />
      <button onClick={()=>{}} style={{ marginTop: '10px',marginLeft:"50px" }}>Run Code</button>
    </div>
  );
};

export default MonacoEditor;
