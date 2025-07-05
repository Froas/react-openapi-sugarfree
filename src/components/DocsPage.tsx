import React from 'react';
import { apiConfig, apiEndpoints } from '../config/api';
// import type { ProductCategory } from '../types';

const DocsPage: React.FC = () => {
  const productCategories: Array<{ category: string; description: string }> = [
    { category: 'daily', description: 'Daily use products and essentials' },
    { category: 'snack', description: 'Snack foods and light bites' },
    { category: 'drink', description: 'Beverages like water, tea, coffee' },
    { category: 'food', description: 'General food items' },
    { category: 'poultry', description: 'Chicken, turkey, and other poultry' },
    { category: 'fish', description: 'Fresh and processed fish products' },
    { category: 'meat', description: 'Beef, pork, lamb, and other meats' },
    { category: 'vegetable', description: 'Fresh and processed vegetables' },
    { category: 'nut', description: 'Nuts, seeds, and nut-based products' },
    { category: 'oil', description: 'Cooking oils and liquid fats' },
    { category: 'vegetarian', description: 'Vegetarian-friendly products' },
    { category: 'seafood', description: 'Shellfish and other seafood' },
    { category: 'condiment', description: 'Sauces, spices, and seasonings' },
    { category: 'fat', description: 'Solid fats and fat-based products' },
  ];

  const productTags: Array<{ tag: string; description: string }> = [
    { tag: 'sugarless', description: 'Contains no added sugar' },
    { tag: 'keto', description: 'Ketogenic diet friendly' },
    { tag: 'gluten-free', description: 'Contains no gluten' },
    { tag: 'vegan', description: 'Contains no animal products' },
    { tag: 'organic', description: 'Organically produced' },
  ];

  const httpStatusCodes = [
    { code: '200', description: 'Success' },
    { code: '201', description: 'Created' },
    { code: '400', description: 'Bad Request' },
    { code: '404', description: 'Not Found' },
    { code: '422', description: 'Validation Error (invalid request data)' },
    { code: '500', description: 'Internal Server Error' },
  ];

  const CodeBlock: React.FC<{ children: string; language?: string; title?: string }> = ({ 
    children, 
    language = 'json',
    title 
  }) => (
    <div className="bg-gray-900 rounded-md overflow-hidden">
      {title && (
        <div className="bg-gray-800 px-4 py-2 text-gray-300 text-sm font-medium border-b border-gray-700">
          {title}
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-gray-100 font-mono whitespace-pre">
          <code className={`language-${language}`}>{children}</code>
        </pre>
      </div>
    </div>
  );

  const EndpointCard: React.FC<{
    method: string;
    path: string;
    description: string;
    requestExample?: string;
    responseExample: string;
    parameters?: Array<{ name: string; type: string; description: string; required?: boolean }>;
  }> = ({ method, path, description, requestExample, responseExample, parameters }) => {
    const methodColors = {
      GET: 'bg-blue-100 text-blue-800 border-blue-500',
      POST: 'bg-green-100 text-green-800 border-green-500',
      PUT: 'bg-yellow-100 text-yellow-800 border-yellow-500',
      DELETE: 'bg-red-100 text-red-800 border-red-500',
    };

    const borderColor = methodColors[method as keyof typeof methodColors]?.split(' ')[2] || 'border-gray-500';

    return (
      <div className={`border-l-4 ${borderColor} pl-6 bg-gray-50 p-6 rounded-r-lg mb-8 shadow-sm`}>
        <div className="mb-4">
          <h4 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
            <span className={`px-3 py-1 rounded-md text-sm font-mono mr-3 ${methodColors[method as keyof typeof methodColors]}`}>
              {method}
            </span>
            <code className="text-gray-700 bg-gray-200 px-2 py-1 rounded">{path}</code>
          </h4>
          <p className="text-gray-600 text-lg">{description}</p>
        </div>
        
        {parameters && parameters.length > 0 && (
          <div className="mb-6">
            <h5 className="font-semibold text-gray-700 mb-3 text-lg">Parameters:</h5>
            <div className="bg-white rounded-lg border p-4">
              <div className="space-y-3">
                {parameters.map((param, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <code className="text-sm font-mono bg-blue-50 text-blue-800 px-2 py-1 rounded border">
                      {param.name}
                    </code>
                    <div className="flex-1">
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">({param.type})</span>
                        {param.required && <span className="text-red-500 ml-1">*</span>}
                        <span className="ml-2">{param.description}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {requestExample && (
          <div className="mb-6">
            <h5 className="font-semibold text-gray-700 mb-3 text-lg">Request Example:</h5>
            <CodeBlock title="Request Body">{requestExample}</CodeBlock>
          </div>
        )}

        <div>
          <h5 className="font-semibold text-green-600 mb-3 text-lg">Response Example:</h5>
          <CodeBlock title="Response">{responseExample}</CodeBlock>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">API Documentation</h1>
          <p className="text-xl text-gray-600">
            Complete guide to the Sugarless API endpoints and usage
          </p>
        </div>
        
        <div className="prose max-w-none">
          {/* Getting Started */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-500 pb-2">
              Getting Started
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <p className="text-gray-700 text-lg leading-relaxed">
                The Sugarless API helps you track and discover products with no added sugar. 
                Search through our database of sugarless foods and beverages, or add your own products.
                All endpoints return JSON data and follow RESTful conventions.
              </p>
            </div>
          </section>

          {/* Base URL */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Base URL</h3>
            <CodeBlock title="API Base URL" language="text">
              {apiConfig.baseUrl}
            </CodeBlock>
          </section>

          {/* Authentication */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Authentication</h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <p className="text-gray-700">
                Currently, this API does not require authentication. All endpoints are publicly accessible.
                Future versions may include API key authentication for enhanced security.
              </p>
            </div>
          </section>

          {/* Data Format */}
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Data Format</h3>
            <p className="text-gray-600 mb-6 text-lg">
              All requests and responses use JSON format. Each product follows this schema:
            </p>
            <CodeBlock title="Product Schema">
{`{
  "id": "string (optional for creation)",
  "name": "string (required)",
  "sugar": {
    "added": "number (grams)",
    "natural": "number (grams)"
  },
  "tags": ["sugarless", "keto", "gluten-free", "vegan", "organic"],
  "calories": "number (per 100g)",
  "category": "daily | snack | drink | food | poultry | fish | meat | vegetable | nut | oil | vegetarian | seafood | condiment | fat",
  "macros": {
    "fat": "number (grams per 100g)",
    "protein": "number (grams per 100g)",
    "carbs": "number (grams per 100g)"
  }
}`}
            </CodeBlock>
          </section>

          {/* Endpoints */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 border-b-2 border-green-500 pb-2">
              API Endpoints
            </h2>
            
            <EndpointCard
              method="GET"
              path={apiEndpoints.getAllProducts}
              description="Retrieve all products from the database. Returns an array of product objects."
              responseExample={`[
  {
    "id": "685e3a45b687e34b6e2f46c8",
    "name": "Water",
    "sugar": { "added": 0, "natural": 0 },
    "tags": ["sugarless"],
    "calories": 0,
    "category": "drink",
    "macros": { "fat": 0, "protein": 0, "carbs": 0 }
  },
  {
    "id": "685e3b1091dbcc6fa6f6aa4b",
    "name": "Grilled Chicken Breast",
    "sugar": { "added": 0, "natural": 0 },
    "tags": ["sugarless", "keto"],
    "calories": 165,
    "category": "poultry",
    "macros": { "fat": 3.6, "protein": 31, "carbs": 0 }
  }
]`}
            />

            <EndpointCard
              method="GET"
              path={apiEndpoints.getRandomProduct}
              description="Get a random product from the database. Perfect for discovering new sugarless products."
              responseExample={`{
  "id": "685e3c4f2a1b3c4d5e6f7890",
  "name": "Avocado Oil",
  "sugar": { "added": 0, "natural": 0 },
  "tags": ["sugarless", "keto", "vegan"],
  "calories": 884,
  "category": "oil",
  "macros": { "fat": 100, "protein": 0, "carbs": 0 }
}`}
            />

            <EndpointCard
              method="POST"
              path={apiEndpoints.createProduct}
              description="Add a new product to the database. The product will be assigned a unique ID automatically."
              requestExample={`{
  "name": "Organic Spinach",
  "sugar": { "added": 0, "natural": 0.4 },
  "tags": ["sugarless", "vegan", "organic"],
  "calories": 23,
  "category": "vegetable",
  "macros": { "fat": 0.4, "protein": 2.9, "carbs": 3.6 }
}`}
              responseExample={`{
  "id": "685e3d1f4b2c5a6e7f8g9012",
  "name": "Organic Spinach",
  "sugar": { "added": 0, "natural": 0.4 },
  "tags": ["sugarless", "vegan", "organic"],
  "calories": 23,
  "category": "vegetable",
  "macros": { "fat": 0.4, "protein": 2.9, "carbs": 3.6 }
}`}
            />

            <EndpointCard
              method="PUT"
              path="/update/{id}"
              description="Update an existing product by its ID. You can update any field of the product."
              parameters={[
                { name: 'id', type: 'string', description: 'Product ID to update', required: true }
              ]}
              requestExample={`{
  "name": "Premium Organic Spinach",
  "calories": 25,
  "tags": ["sugarless", "vegan", "organic", "gluten-free"]
}`}
              responseExample={`{
  "id": "685e3d1f4b2c5a6e7f8g9012",
  "name": "Premium Organic Spinach",
  "sugar": { "added": 0, "natural": 0.4 },
  "tags": ["sugarless", "vegan", "organic", "gluten-free"],
  "calories": 25,
  "category": "vegetable",
  "macros": { "fat": 0.4, "protein": 2.9, "carbs": 3.6 }
}`}
            />

            <EndpointCard
              method="DELETE"
              path="/delete/{id}"
              description="Delete a product from the database by its ID. This action cannot be undone."
              parameters={[
                { name: 'id', type: 'string', description: 'Product ID to delete', required: true }
              ]}
              responseExample={`{
  "message": "Product deleted successfully"
}`}
            />
          </section>

          {/* Product Categories */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-purple-500 pb-2">
              Product Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {productCategories.map(({ category, description }) => (
                <div key={category} className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200 shadow-sm">
                  <div className="flex items-center mb-2">
                    <code className="text-sm font-mono bg-purple-100 text-purple-800 px-2 py-1 rounded-md">
                      {category}
                    </code>
                  </div>
                  <p className="text-gray-700 text-sm">{description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Product Tags */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-emerald-500 pb-2">
              Product Tags
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Tags help categorize products by dietary preferences and special attributes:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {productTags.map(({ tag, description }) => (
                <div key={tag} className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-lg border border-emerald-200 shadow-sm">
                  <div className="flex items-center mb-3">
                    <code className="text-lg font-mono bg-emerald-100 text-emerald-800 px-3 py-2 rounded-md">
                      {tag}
                    </code>
                  </div>
                  <p className="text-gray-700">{description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Error Handling */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-red-500 pb-2">
              Error Handling
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              The API uses conventional HTTP response codes to indicate success or failure:
            </p>
            <div className="bg-gray-50 rounded-lg p-6 border">
              <div className="grid gap-4">
                {httpStatusCodes.map(({ code, description }) => (
                  <div key={code} className="flex items-center p-3 bg-white rounded border">
                    <code className={`text-sm font-mono px-3 py-2 rounded mr-4 min-w-[4rem] text-center ${
                      code.startsWith('2') ? 'bg-green-100 text-green-800' :
                      code.startsWith('4') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {code}
                    </code>
                    <span className="text-gray-700 font-medium">{description}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Rate Limiting */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-orange-500 pb-2">
              Rate Limiting & Timeouts
            </h2>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>Request Timeout:</strong> {apiConfig.timeout / 1000} seconds
                </p>
                <p className="text-gray-700">
                  <strong>Retry Attempts:</strong> {apiConfig.retries} automatic retries on failure
                </p>
                <p className="text-gray-700">
                  <strong>Rate Limiting:</strong> Currently no rate limits are imposed, but please use the API responsibly.
                </p>
              </div>
            </div>
          </section>

          {/* Environment Setup */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-indigo-500 pb-2">
              Environment Setup
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              To connect to your backend, create a <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file 
              in your project root:
            </p>
            <CodeBlock title=".env" language="bash">
{`# API Configuration
REACT_APP_API_BASE_URL=http://127.0.0.1:8000

# Optional: Set different URLs for different environments
# REACT_APP_API_BASE_URL=https://api.sugarless.com  # Production
# REACT_APP_API_BASE_URL=http://localhost:3001      # Development`}
            </CodeBlock>
          </section>

          {/* SDK Usage Examples */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-teal-500 pb-2">
              SDK Usage Examples
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Here are some examples of how to use the API service in your application:
            </p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Fetch All Products</h4>
                <CodeBlock title="TypeScript" language="typescript">
{`import { apiService } from './services/apiService';

const fetchProducts = async () => {
  const response = await apiService.getAllProducts();
  if (response.error) {
    console.error('Error:', response.error);
  } else {
    console.log('Products:', response.data);
  }
};`}
                </CodeBlock>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Create a New Product</h4>
                <CodeBlock title="TypeScript" language="typescript">
{`const createProduct = async () => {
  const newProduct = {
    name: "Wild Salmon",
    sugar: { added: 0, natural: 0 },
    tags: ["sugarless", "keto"],
    calories: 208,
    category: "fish",
    macros: { fat: 12.4, protein: 25.4, carbs: 0 }
  };

  const response = await apiService.createProduct(newProduct);
  if (response.error) {
    console.error('Error:', response.error);
  } else {
    console.log('Created product:', response.data);
  }
};`}
                </CodeBlock>
              </div>
            </div>
          </section>

          {/* Important Notes */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-blue-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Notes</h3>
                <ul className="text-blue-700 space-y-2">
                  <li>• Make sure your backend server is running before testing the endpoints</li>
                  <li>• All timestamps are in ISO 8601 format</li>
                  <li>• Product IDs are automatically generated and cannot be modified</li>
                  <li>• Sugar values should be in grams per 100g of product</li>
                  <li>• Macro values (fat, protein, carbs) should also be per 100g</li>
                  <li>• Tags can be combined (e.g., a product can be both "sugarless" and "keto")</li>
                  <li>• Categories are mutually exclusive - each product has exactly one category</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;