// components/ResponsePanel.tsx
import React, { useState } from 'react';
import { Code, Copy, Check, AlertCircle } from 'lucide-react';
import type { ResponseState } from '../types';

interface ResponsePanelProps {
  responseState: ResponseState;
}

const ResponsePanel: React.FC<ResponsePanelProps> = ({ responseState }) => {
  const [copied, setCopied] = useState(false);
  const { data, isLoading, error } = responseState;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const hasContent = data || error;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold flex items-center">
          <Code className="w-6 h-6 mr-2 text-green-600" />
          Response
        </h2>
        
        {hasContent && (
          <button
            onClick={() => copyToClipboard(data || error || '')}
            className="flex items-center space-x-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span className={copied ? 'text-green-600' : ''}>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        )}
      </div>
      
      <div className="bg-gray-50 rounded-md p-4 min-h-[300px] relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Sending request...</p>
            </div>
          </div>
        ) : error ? (
        <div className="flex items-center justify-center h-full p-4">
          <div className="text-center text-red-600 w-full max-w-md">
            <AlertCircle className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4" />
            <p className="font-medium mb-4 text-sm sm:text-base">Request Failed</p>
            
            <div className="space-y-3">
              <pre className="text-xs sm:text-sm bg-red-50 p-3 rounded border border-red-200 text-left overflow-x-auto whitespace-pre-wrap break-words">
                {error}
              </pre>
              
              <div className="text-xs sm:text-sm bg-yellow-50 p-3 rounded border border-yellow-200 text-left text-yellow-800">
                <p>Please try sending the request again. Sometimes it takes about 50 seconds for the server to wake up from sleep mode.</p>
              </div>
            </div>
          </div>
        </div>
      ) : data ? (
          <div className="h-full">
            <pre className="text-sm overflow-auto whitespace-pre-wrap font-mono text-gray-800 h-full">
              {data}
            </pre>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Send a request to see the response here</p>
              <p className="text-sm mt-2 opacity-75">
                The response will appear in JSON format
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsePanel;