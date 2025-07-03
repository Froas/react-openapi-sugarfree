import { Link, useNavigate } from 'react-router-dom';
import { 
    Home, 
    FileQuestion, 
    ArrowLeft, 
    Search, 
    Book, 
    RefreshCw,
    ExternalLink 
} from 'lucide-react';

type NotFoundPageProps = {}

const NotFoundPage = ({}: NotFoundPageProps) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (window.history.length > 1) {
        navigate(-1);
        } else {
        navigate('/home');
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
            <div className="text-center max-w-2xl mx-auto">
                {/* Animated 404 Icon */}
                <div className="mb-8 relative">
                <div className="absolute inset-0 animate-ping">
                    <FileQuestion className="w-32 h-32 text-blue-200 mx-auto opacity-75" />
                </div>
                <FileQuestion className="w-32 h-32 text-blue-400 mx-auto relative z-10 animate-bounce" />
                </div>

                {/* 404 Text with Gradient */}
                <div className="mb-6">
                <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4 animate-pulse">
                    404
                </h1>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Oops! Page Not Found
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                    The page you're looking for seems to have vanished into the digital void. 
                    Don't worry, even the best APIs have their mysteries! 🚀
                </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                    to="/home"
                    className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                    <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">Go Home</span>
                </Link>

                <button
                    onClick={handleGoBack}
                    className="group inline-flex items-center justify-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 transform hover:-translate-y-1"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold">Go Back</span>
                </button>
                </div>

                {/* Quick Navigation Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                <Link
                    to="/home"
                    className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
                >
                    <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                        <Search className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                        API Testing
                        </h3>
                    </div>
                    </div>
                    <p className="text-gray-600 text-left">
                    Try out the Sugarless API endpoints and explore our interactive testing interface.
                    </p>
                    <div className="mt-4 flex items-center text-blue-600 font-medium">
                    <span>Explore API</span>
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                </Link>

                <Link
                    to="/docs"
                    className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2"
                >
                    <div className="flex items-center mb-4">
                    <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                        <Book className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                        Documentation
                        </h3>
                    </div>
                    </div>
                    <p className="text-gray-600 text-left">
                    Complete API reference, guides, and examples to get you started quickly.
                    </p>
                    <div className="mt-4 flex items-center text-purple-600 font-medium">
                    <span>Read Docs</span>
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                </Link>
                </div>

                {/* Fun Error Messages */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 mb-8">
                <div className="flex items-center justify-center mb-4">
                    <div className="animate-spin">
                    <RefreshCw className="w-6 h-6 text-yellow-600" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                    Did you know? 🤔
                </h3>
                <p className="text-yellow-700">
                    HTTP 404 errors were named after room 404 at CERN, where the original web servers were located. 
                    The room didn't exist, just like this page!
                </p>
                </div>

                {/* Help Section */}
                <div className="text-sm text-gray-500 space-y-2">
                <p>Still lost? Here are some helpful links:</p>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <a 
                    href="https://github.com/Froas/react-openapi-sugarfree" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-all"
                    >
                    GitHub Repository
                    </a>
                    <span className="text-gray-300">•</span>
                    <Link 
                    to="/docs" 
                    className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-all"
                    >
                    API Documentation
                    </Link>
                    <span className="text-gray-300">•</span>
                    <button 
                    onClick={() => window.location.reload()} 
                    className="text-blue-600 hover:text-blue-800 underline hover:no-underline transition-all"
                    >
                    Refresh Page
                    </button>
                </div>
                </div>

                {/* Floating Animation Elements */}
                <div className="absolute top-20 left-10 w-4 h-4 bg-blue-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-40 right-20 w-3 h-3 bg-purple-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-40 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-20 right-10 w-5 h-5 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
            </div>
        </div>
    );
};

export default NotFoundPage;