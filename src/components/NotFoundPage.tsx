import { Link, useNavigate } from 'react-router-dom';
import { 
    Home, 
    FileQuestion, 
    ArrowLeft, 
    Book, 
    ExternalLink,
    Zap,
    Heart
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
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-400 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-400 rounded-full blur-3xl"></div>
            </div>

            <div className="text-center max-w-4xl mx-auto relative z-10">
                {/* Original Animated 404 Icon */}
                <div className="mb-8 relative">
                    <div className="absolute inset-0 animate-ping">
                        <FileQuestion className="w-32 h-32 text-emerald-200 mx-auto opacity-75" />
                    </div>
                    <FileQuestion className="w-32 h-32 text-emerald-400 mx-auto relative z-10 animate-bounce" />
                </div>

                {/* Original 404 Text with Updated Colors */}
                <div className="mb-6">
                    <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent mb-4 animate-pulse">
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

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Link
                        to="/home"
                        className="group inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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

                {/* Feature Cards Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <Link
                        to="/home"
                        className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-emerald-100 hover:border-emerald-300 transform hover:-translate-y-3 hover:rotate-1"
                    >
                        <div className="mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Zap className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                                API Testing
                            </h3>
                        </div>
                        <p className="text-gray-600 text-left mb-4">
                            Try out the Sugarless API endpoints and explore our interactive testing interface.
                        </p>
                        <div className="flex items-center text-emerald-600 font-semibold">
                            <span>Explore API</span>
                            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>

                    <Link
                        to="/docs"
                        className="group bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-teal-100 hover:border-teal-300 transform hover:-translate-y-3 hover:-rotate-1"
                    >
                        <div className="mb-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Book className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors">
                                Documentation
                            </h3>
                        </div>
                        <p className="text-gray-600 text-left mb-4">
                            Complete API reference, guides, and examples to get you started quickly.
                        </p>
                        <div className="flex items-center text-teal-600 font-semibold">
                            <span>Read Docs</span>
                            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                    <Link
                        to="https://nado.health"
                        className="group bg-emerald/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-emerald-200 hover:border-teal-300 transform hover:-translate-y-3 hover:-rotate-1"
                    >      
                        <div className="">
                            <div className="mb-4">
                                <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center mb-4">
                                    <Heart className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    Health First
                                </h3>
                            </div>
                            <p className="text-gray-600 text-left mb-7">
                                Built for everyone who values clean, healthy choices.
                            </p>
                            <div className="flex items-center text-teal-600 font-semibold">
                                <span>Explore journey</span>
                                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>

                 {/* Fun Fact Card */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-3xl p-8 mb-8 transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                            <span className="text-2xl">🍯</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-amber-800 mb-3">
                        Sweet Fact! 🌱
                    </h3>
                    <p className="text-amber-700 leading-relaxed">
                        The average person consumes 17 teaspoons of sugar daily. 
                        Our API? Zero teaspoons, infinite possibilities!
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
                            className="text-emerald-600 hover:text-emerald-800 underline hover:no-underline transition-all"
                        >
                            GitHub Repository
                        </a>
                        <span className="text-gray-300">•</span>
                        <Link 
                            to="/docs" 
                            className="text-emerald-600 hover:text-emerald-800 underline hover:no-underline transition-all"
                        >
                            API Documentation
                        </Link>
                        <span className="text-gray-300">•</span>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="text-emerald-600 hover:text-emerald-800 underline hover:no-underline transition-all"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>

                {/* Floating Animation Elements */}
                <div className="absolute top-20 left-10 w-4 h-4 bg-emerald-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
                <div className="absolute top-40 right-20 w-3 h-3 bg-teal-300 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-40 left-20 w-2 h-2 bg-emerald-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-20 right-10 w-5 h-5 bg-teal-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>
            </div>
        </div>
    );
};

export default NotFoundPage;