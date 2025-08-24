export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {currentYear} Epic Pizza Pasta. All Rights Reserved.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a href="#" className="hover:text-red-500 transition-colors">Facebook</a>
          <a href="#" className="hover:text-red-500 transition-colors">Instagram</a>
          <a href="#" className="hover:text-red-500 transition-colors">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
