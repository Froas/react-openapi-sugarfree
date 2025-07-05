// components/RequestPanel.tsx
import React from 'react';
import { Send } from 'lucide-react';
import type { HttpMethod, RequestState } from '../types';
import { apiConfig } from '../config/api';

interface RequestPanelProps {
  requestState: RequestState;
  isLoading: boolean;
  onStateChange: (updates: Partial<RequestState>) => void;
  onSendRequest: () => void;
}

const RequestPanel: React.FC<RequestPanelProps> = ({
  requestState,
  isLoading,
  onStateChange,
  onSendRequest,
}) => {
  const { url, method, headers, body } = requestState;

  const handleMethodChange = (newMethod: HttpMethod) => {
    const updates: Partial<RequestState> = { method: newMethod };
    
    // Update URL based on method
    if (newMethod === 'DELETE' && !url.includes('/delete/')) {
      updates.url = `${apiConfig.baseUrl}/delete/{id}`;
    } else if (newMethod !== 'DELETE' && url.includes('/delete/')) {
      updates.url = apiConfig.baseUrl + '/';
    }
    
    onStateChange(updates);
  };

  const availableEndpoints = [
    { endpoint: `${apiConfig.baseUrl}/`, description: 'Get all products' },
    { endpoint: `${apiConfig.baseUrl}/random`, description: 'Get random product' },
    // { endpoint: `${apiConfig.baseUrl}/delete/{id}`, description: 'Delete product by ID' },
  ];

  // This function handles changes to the editable part of the URL.
  const handleUrlPathChange = (path: string) => {
    // We reconstruct the full URL by combining the static base URL with the new path.
    onStateChange({ url: `${apiConfig.baseUrl}${path}` });
  };

  // We extract the editable path from the full URL string for the input field.
  const urlPath = url.substring(apiConfig.baseUrl.length);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 flex items-center">
        <Send className="w-6 h-6 mr-2 text-green-600" />
        Make a Request
      </h2>
      
      <div className="space-y-4">
        {/* HTTP Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            HTTP Method
          </label>
          <select
            value={method}
            onChange={(e) => handleMethodChange(e.target.value as HttpMethod)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
            <option value="PATCH">PATCH</option>
          </select>
        </div>

        {/* URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL
          </label>
          {/* We create a composite input field using a flex container. */}
          <div className="flex items-center w-full border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent overflow-hidden transition-all duration-200">
            {/* This span displays the non-editable base URL. Added whitespace-nowrap to prevent line breaks. */}
            <span className="px-3 py-2 bg-gray-100 text-gray-500 border-r border-gray-300 whitespace-nowrap">
              {apiConfig.baseUrl}
            </span>
            {/* This input is for the editable part of the URL (the path). */}
            <input
              type="text"
              value={urlPath}
              onChange={(e) => handleUrlPathChange(e.target.value)}
              className="w-full px-3 py-2 border-none focus:outline-none focus:ring-0"
              placeholder="/"
            />
          </div>
          
          {/* Available Endpoints */}
          <div className="mt-2 text-sm text-gray-500">
            <p className="font-medium">Available endpoints:</p>
            <ul className="list-disc list-inside space-y-1 mt-1">
              {availableEndpoints.map(({ endpoint, description }) => (
                <li key={endpoint}>
                  <code className="bg-gray-100 px-1 rounded text-xs">{endpoint}</code>
                  <span className="ml-2">- {description}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Headers */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Headers
          </label>
          <textarea
            value={headers}
            onChange={(e) => onStateChange({ headers: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            placeholder="Enter headers as JSON"
          />
        </div>

        {/* Request Body (only for non-GET methods) */}
        {method !== 'GET' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Request Body
            </label>
            <textarea
              value={body}
              onChange={(e) => onStateChange({ body: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder="Enter request body as JSON"
            />
          </div>
        )}

        {/* Send Button */}
        <button
          onClick={onSendRequest}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Send Request</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RequestPanel;