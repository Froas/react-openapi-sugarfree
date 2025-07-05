type FooterProps = {}

export const Footer = ({}: FooterProps) => (
    <>
        <footer className="bg-white/80 backdrop-blur-sm border-t border-green-200 py-8 mt-16">
                <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-700 mb-4 md:mb-0">
                    <p className="flex items-center space-x-2">
                        <span>&copy; 2025 Sugarless API.</span>
                        <span className="text-green-600">🌱</span>
                        <span>Built with React & TypeScript.</span>
                    </p>
                    </div>
                    <div className="flex space-x-6 text-sm text-gray-600">
                    <a href="https://raw.githubusercontent.com/Froas/react-openapi-sugarfree/refs/heads/main/PRIVACY.md" className="hover:text-green-600 transition-colors">Privacy Policy</a>
                    <a href="https://raw.githubusercontent.com/Froas/react-openapi-sugarfree/refs/heads/main/TERMS.md#" className="hover:text-green-600 transition-colors">Terms of Service</a>
                    <a 
                        href="https://github.com/Froas/react-openapi-sugarfree" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-green-600 transition-colors"
                    >
                        GitHub
                    </a>
                    </div>
                </div>
                </div>
        </footer>
    </>
);