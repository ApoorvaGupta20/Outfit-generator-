import React from "react";

export default function Footer() {
  return (
    <footer
      className="text-center py-4 mt-5"
      style={{
        background: "linear-gradient(90deg, #f8f9fa, #e9ecef)",
        borderTop: "1px solid #ddd"
      }}
    >
      <p className="mb-0">
        👗 StyleMate &copy; {new Date().getFullYear()} — Your AI Stylist ❤️
      </p>
    </footer>
  );
}
