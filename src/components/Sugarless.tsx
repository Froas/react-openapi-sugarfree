import { useState } from 'react';
import { Send, Book, Github, Code, Play, Copy, Check } from 'lucide-react';

const SugarlessFrontend = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [requestUrl, setRequestUrl] = useState('http://127.0.0.1:8000/');
  const [requestMethod, setRequestMethod] = useState('GET');
  const [requestHeaders, setRequestHeaders] = useState('{\n  "accept": "application/json",\n  "Content-Type": "application/json"\n}');
  const [requestBody, setRequestBody] = useState('{\n  "name": "Green Tea",\n  "sugar": {\n    "added": 0,\n    "natural": 0\n  },\n  "type": [\n    "sugarless"\n  ],\n  "calories": 2,\n  "category": "drink",\n  "macros": {\n    "fat": 0,\n    "protein": 0,\n    "carbs": 0\n  }\n}');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSendRequest = async () => {
    setIsLoading(true);
    
    // Simulate API call based on endpoint
    setTimeout(() => {
      let simulatedResponse;
      
      if (requestUrl.includes('/random')) {
        simulatedResponse = {
          "name": "Sparkling Water",
          "sugar": {
            "added": 0,
            "natural": 0
          },
          "type": [
            "sugarless"
          ],
          "calories": 0,
          "category": "drink",
          "macros": {
            "fat": 0,
            "protein": 0,
            "carbs": 0
          }
        };
      } else if (requestMethod === 'GET' && !requestUrl.includes('/delete/')) {
        simulatedResponse = [
          {
            "id": "685e3a45b687e34b6e2f46c8",
            "name": "Water",
            "sugar": {
              "added": 0,
              "natural": 0
            },
            "type": [
              "sugarless"
            ],
            "calories": 0,
            "category": "drink",
            "macros": {
              "fat": 0,
              "protein": 0,
              "carbs": 0
            }
          },
          {
            "id": "685e3b1091dbcc6fa6f6aa4b",
            "name": "Black Coffee",
            "sugar": {
              "added": 0,
              "natural": 0
            },
            "type": [
              "sugarless"
            ],
            "calories": 2,
            "category": "drink",
            "macros": {
              "fat": 0,
              "protein": 0.3,
              "carbs": 0
            }
          }
        ];
      } else if (requestMethod === 'POST') {
        simulatedResponse = {
          "id": "685e3c" + Math.random().toString(16).substr(2, 18),
          ...JSON.parse(requestBody)
        };
      } else if (requestMethod === 'DELETE') {
        simulatedResponse = {
          "message": "Product deleted successfully"
        };
      } else {
        simulatedResponse = {
          "message": "Request processed successfully"
        };
      }
      
      setResponse(JSON.stringify(simulatedResponse, null, 2));
      setIsLoading(false);
    }, 1500);
  };

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const NavBar = () => (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Code className="w-8 h-8" />
            <span className="text-xl font-bold">Sugarless API</span>
          </div>
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                activeTab === 'home' ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>Try It Out</span>
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                activeTab === 'docs' ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Book className="w-4 h-4" />
              <span>Documentation</span>
            </button>
            <a
              href="https://github.com/Froas/react-openapi-sugarfree"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Sugarless API
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Track and discover sugarless products with our clean REST API. 
          Find products by sugar content, calories, and nutritional information.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Request Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Send className="w-6 h-6 mr-2 text-blue-600" />
            Make a Request
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HTTP Method
              </label>
              <select
                value={requestMethod}
                onChange={(e) => {
                  setRequestMethod(e.target.value);
                  // Update URL based on method
                  if (e.target.value === 'DELETE') {
                    setRequestUrl('http://127.0.0.1:8000/delete/{id}');
                  } else if (e.target.value === 'GET' && requestUrl.includes('/delete/')) {
                    setRequestUrl('http://127.0.0.1:8000/');
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL
              </label>
              <input
                type="text"
                value={requestUrl}
                onChange={(e) => setRequestUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="http://127.0.0.1:8000/"
              />
              <div className="mt-2 text-sm text-gray-500">
                <p><strong>Available endpoints:</strong></p>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  <li><code>http://127.0.0.1:8000/</code> - Get all products</li>
                  <li><code>http://127.0.0.1:8000/random</code> - Get random product</li>
                  <li><code>http://127.0.0.1:8000/delete/{`{id}`}</code> - Delete product by ID</li>
                </ul>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Headers
              </label>
              <textarea
                value={requestHeaders}
                onChange={(e) => setRequestHeaders(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              />
            </div>

            {requestMethod !== 'GET' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Request Body
                </label>
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                />
              </div>
            )}

            <button
              onClick={handleSendRequest}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-md hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Request</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Response Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center">
              <Code className="w-6 h-6 mr-2 text-green-600" />
              Response
            </h2>
            {response && (
              <button
                onClick={() => copyToClipboard(response)}
                className="flex items-center space-x-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            )}
          </div>
          
          <div className="bg-gray-50 rounded-md p-4 min-h-[300px]">
            {response ? (
              <pre className="text-sm overflow-auto whitespace-pre-wrap font-mono text-gray-800">
                {response}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Send a request to see the response here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const DocsPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">API Documentation</h1>
        
        <div className="prose max-w-none">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
          <p className="text-gray-600 mb-6">
            The Sugarless API helps you track and discover products with no added sugar. 
            Search through our database of sugarless foods and beverages, or add your own products.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Base URL</h3>
          <div className="bg-gray-100 rounded-md p-3 mb-6">
            <code className="text-sm font-mono">http://127.0.0.1:8000</code>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Format</h3>
          <p className="text-gray-600 mb-4">
            All requests and responses use JSON format. Each product contains:
          </p>
          <div className="bg-gray-100 rounded-md p-3 mb-6">
            <code className="text-sm font-mono whitespace-pre">
{`{
  "id": "string",
  "name": "string",
  "sugar": {
    "added": 0,
    "natural": 0
  },
  "type": ["sugarless"],
  "calories": 0,
  "category": "drink|food|oil|daily",
  "macros": {
    "fat": 0,
    "protein": 0,
    "carbs": 0
  }
}`}
            </code>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Endpoints</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-lg font-semibold text-gray-800">GET /</h4>
              <p className="text-gray-600 mb-2">Get all products in the database</p>
              <div className="bg-gray-100 rounded-md p-3 text-sm">
                <strong>Response:</strong> 200 OK<br/>
                <code className="font-mono whitespace-pre">
{`[
  {
    "id": "685e3a45b687e34b6e2f46c8",
    "name": "Water",
    "sugar": {
      "added": 0,
      "natural": 0
    },
    "type": ["sugarless"],
    "calories": 0,
    "category": "drink",
    "macros": {
      "fat": 0,
      "protein": 0,
      "carbs": 0
    }
  }
]`}
                </code>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="text-lg font-semibold text-gray-800">GET /random</h4>
              <p className="text-gray-600 mb-2">Get a random product from the database</p>
              <div className="bg-gray-100 rounded-md p-3 text-sm">
                <strong>Response:</strong> 200 OK<br/>
                <code className="font-mono whitespace-pre">
{`{
  "name": "Avocado Oil",
  "sugar": {
    "added": 0,
    "natural": 0
  },
  "type": ["sugarless"],
  "calories": 884,
  "category": "oil",
  "macros": {
    "fat": 100,
    "protein": 0,
    "carbs": 0
  }
}`}
                </code>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-lg font-semibold text-gray-800">POST /</h4>
              <p className="text-gray-600 mb-2">Add a new product to the database</p>
              <div className="bg-gray-100 rounded-md p-3 text-sm mb-2">
                <strong>Request Body:</strong><br/>
                <code className="font-mono whitespace-pre">
{`{
  "name": "Green Tea",
  "sugar": {
    "added": 0,
    "natural": 0
  },
  "type": ["sugarless"],
  "calories": 2,
  "category": "drink",
  "macros": {
    "fat": 0,
    "protein": 0.1,
    "carbs": 0
  }
}`}
                </code>
              </div>
              <div className="bg-gray-100 rounded-md p-3 text-sm">
                <strong>Response:</strong> 200 OK<br/>
                <small className="text-gray-600">Returns the created product with generated ID</small>
              </div>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="text-lg font-semibold text-gray-800">DELETE /delete/{`{id}`}</h4>
              <p className="text-gray-600 mb-2">Delete a product by its ID</p>
              <div className="bg-gray-100 rounded-md p-3 text-sm">
                <strong>Parameters:</strong><br/>
                <code className="font-mono">id (string, path): Product ID</code><br/><br/>
                <strong>Response:</strong> 200 OK
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Product Categories</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>drink</strong> - Beverages like water, tea, coffee</li>
            <li><strong>food</strong> - Solid food items</li>
            <li><strong>oil</strong> - Cooking oils and fats</li>
            <li><strong>daily</strong> - Daily use products</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Error Handling</h2>
          <p className="text-gray-600 mb-4">
            The API uses conventional HTTP response codes:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>200</strong> - Success</li>
            <li><strong>422</strong> - Validation Error (invalid request data)</li>
            <li><strong>404</strong> - Not Found</li>
            <li><strong>500</strong> - Internal Server Error</li>
          </ul>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This API is currently running locally on port 8000. 
              Make sure your backend server is running before testing the endpoints.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      {activeTab === 'home' && <HomePage />}
      {activeTab === 'docs' && <DocsPage />}
    </div>
  );
};

export default SugarlessFrontend;