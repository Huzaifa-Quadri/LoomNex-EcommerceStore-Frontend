export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} LoomNex. All rights reserved.
      </div>
    </footer>
  );
}
