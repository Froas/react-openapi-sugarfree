// components/HomePage.tsx
import React, { useEffect, useState } from 'react';
import RequestPanel from './RequestPanel';
import ResponsePanel from './ResponsePanel';
import type { RequestState, ResponseState, HttpMethod } from '../types';
import { apiConfig, defaultHeaders } from '../config/api';
import { apiService } from '../services/apiServices';
import { Leaf } from 'lucide-react';


enum StatusEnum {
  Offline = "Offline",
  Online = "Online",
}
const HomePage: React.FC = () => {
  const [status, setStatus] = useState<StatusEnum>(StatusEnum.Offline)
  const [requestState, setRequestState] = useState<RequestState>({
    url: `${apiConfig.baseUrl}/random`,
    method: 'GET' as HttpMethod,
    headers: JSON.stringify(defaultHeaders, null, 2),
    body: JSON.stringify({
      name: "Green Tea",
      sugar: {
        added: 0,
        natural: 0
      },
      type: ["sugarless"],
      calories: 2,
      category: "drink",
      macros: {
        fat: 0,
        protein: 0,
        carbs: 0
      }
    }, null, 2),
  });



  const [responseState, setResponseState] = useState<ResponseState>({
    data: '',
    isLoading: false,
    error: null,
  });

  const updateRequestState = (updates: Partial<RequestState>) => {
    setRequestState(prev => ({ ...prev, ...updates }));
  };

  const updateResponseState = (updates: Partial<ResponseState>) => {
    setResponseState(prev => ({ ...prev, ...updates }));
  };

  const handleSendRequest = async () => {
    updateResponseState({ isLoading: true, error: null, data: '' });

    try {
      // Parse headers
      let parsedHeaders = {};
      try {
        parsedHeaders = JSON.parse(requestState.headers);
      } catch (e) {
        throw new Error('Invalid JSON in headers');
      }

      // Parse body for non-GET requests
      let parsedBody = undefined;
      if (requestState.method !== 'GET' && requestState.body.trim()) {
        try {
          parsedBody = JSON.parse(requestState.body);
        } catch (e) {
          throw new Error('Invalid JSON in request body');
        }
      }

      // Make the API call
      const response = await apiService.customRequest(
        requestState.url,
        requestState.method,
        parsedHeaders,
        parsedBody
      );

      if (response.error) {
        updateResponseState({ 
          isLoading: false, 
          error: response.error,
          data: ''
        });
      } else {
        updateResponseState({ 
          isLoading: false, 
          data: JSON.stringify(response.data, null, 2),
          error: null
        });
      }
    } catch (error) {
      updateResponseState({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        data: ''
      });
    }
  };

  useEffect( () => {
    const fetch = async () => {
      const response = await apiService.getStatus()
      if (response.status == 200) {
        setStatus(StatusEnum.Online)
      } 
    }
    fetch()
  },[handleSendRequest])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-yellow-800">0</span>
            </div>
          </div>
        </div>
        <h1 className="leading-[1.24] text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
          Welcome to Sugarless API
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Track and discover sugar-free products with our clean REST API. 
          Find healthy alternatives by sugar content, calories, and nutritional information. 🌱
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8">
        <RequestPanel
          requestState={requestState}
          isLoading={responseState.isLoading}
          onStateChange={updateRequestState}
          onSendRequest={handleSendRequest}
        />
        
        <ResponsePanel
          responseState={responseState}
        />
      </div>

      {/* Status Bar */}
      <div className="mt-8 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>API Base URL: <code className="bg-gray-100 px-2 py-1 rounded">{apiConfig.baseUrl}</code></span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${status === StatusEnum.Offline ? "bg-red-500" : "bg-green-500"}`}
            ></div>
            <span>{status}</span> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;