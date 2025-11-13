export default function Footer() {
  return (
    <footer className="mt-10 py-6 text-center text-gray-600 dark:text-gray-400 border-t border-gray-300 dark:border-gray-700">
      <p>© {new Date().getFullYear()} CityData Dashboard.</p>
    </footer>
  );
}
