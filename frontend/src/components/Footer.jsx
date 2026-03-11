const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">SchemeSeva</h3>
            <p className="text-gray-400">
              Helping Indian citizens discover government welfare schemes they are eligible for.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition">Home</a>
              </li>
              <li>
                <a href="/schemes" className="hover:text-white transition">All Schemes</a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">About</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-400">
              For support and queries, please visit the official government portals.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 SchemeSeva. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
