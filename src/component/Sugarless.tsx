import { useState } from 'react';
import { Send, Book, Github, Code, Play, Copy, Check } from 'lucide-react';

const SugarlessFrontend = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [requestUrl, setRequestUrl] = useState('https://api.example.com/users');
  const [requestMethod, setRequestMethod] = useState('GET');
  const [requestHeaders, setRequestHeaders] = useState('{\n  "Content-Type": "application/json",\n  "Authorization": "Bearer your-token"\n}');
  const [requestBody, setRequestBody] = useState('{\n  "name": "John Doe",\n  "email": "john@example.com"\n}');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSendRequest = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const simulatedResponse = {
        status: 200,
        data: {
          id: 12345,
          name: "John Doe",
          email: "john@example.com",
          created_at: new Date().toISOString(),
          message: "Request processed successfully"
        },
        headers: {
          "content-type": "application/json",
          "x-request-id": "req_" + Math.random().toString(36).substr(2, 9)
        }
      };
      
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
          A clean, powerful REST API without the unnecessary complexity. 
          Try it out right here with our interactive playground.
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
                onChange={(e) => setRequestMethod(e.target.value)}
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
                placeholder="https://api.example.com/endpoint"
              />
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
            Welcome to the Sugarless API documentation. This API provides a clean, RESTful interface 
            for managing your data without unnecessary complexity.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Base URL</h3>
          <div className="bg-gray-100 rounded-md p-3 mb-6">
            <code className="text-sm font-mono">https://api.sugarless.com/v1</code>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Authentication</h3>
          <p className="text-gray-600 mb-4">
            All API requests require authentication using a Bearer token in the Authorization header:
          </p>
          <div className="bg-gray-100 rounded-md p-3 mb-6">
            <code className="text-sm font-mono">Authorization: Bearer your-api-token</code>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Endpoints</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-lg font-semibold text-gray-800">GET /users</h4>
              <p className="text-gray-600 mb-2">Retrieve a list of users</p>
              <div className="bg-gray-100 rounded-md p-3 text-sm">
                <strong>Response:</strong> 200 OK<br/>
                <code className="font-mono">
                  {`{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1,
  "page": 1
}`}
                </code>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-lg font-semibold text-gray-800">POST /users</h4>
              <p className="text-gray-600 mb-2">Create a new user</p>
              <div className="bg-gray-100 rounded-md p-3 text-sm mb-2">
                <strong>Request Body:</strong><br/>
                <code className="font-mono">
                  {`{
  "name": "Jane Doe",
  "email": "jane@example.com"
}`}
                </code>
              </div>
              <div className="bg-gray-100 rounded-md p-3 text-sm">
                <strong>Response:</strong> 201 Created<br/>
                <code className="font-mono">
                  {`{
  "id": 2,
  "name": "Jane Doe",
  "email": "jane@example.com",
  "created_at": "2024-01-01T00:00:00Z"
}`}
                </code>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="text-lg font-semibold text-gray-800">PUT /users/:id</h4>
              <p className="text-gray-600 mb-2">Update an existing user</p>
              <div className="bg-gray-100 rounded-md p-3 text-sm">
                <strong>Response:</strong> 200 OK
              </div>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="text-lg font-semibold text-gray-800">DELETE /users/:id</h4>
              <p className="text-gray-600 mb-2">Delete a user</p>
              <div className="bg-gray-100 rounded-md p-3 text-sm">
                <strong>Response:</strong> 204 No Content
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">Error Handling</h2>
          <p className="text-gray-600 mb-4">
            The API uses conventional HTTP response codes to indicate success or failure:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>200</strong> - Success</li>
            <li><strong>201</strong> - Created</li>
            <li><strong>400</strong> - Bad Request</li>
            <li><strong>401</strong> - Unauthorized</li>
            <li><strong>404</strong> - Not Found</li>
            <li><strong>500</strong> - Internal Server Error</li>
          </ul>
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