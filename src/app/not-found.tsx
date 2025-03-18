"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {Home} from "lucide-react";

export default function NotFound() {
  const [portalClass, setPortalClass] = useState("scale-0 opacity-0");

  useEffect(() => {
    // Animated portal entrance
    setTimeout(() => setPortalClass("scale-100 opacity-100"), 100);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div
        className={`w-64 h-64 md:w-80 md:h-80 rounded-full border-8 border-RM-cyan-300 shadow-glow-cyan mb-8 flex items-center justify-center transform transition-all duration-1000 ${portalClass}`}
      >
        <div className="text-9xl font-bold tracking-tighter text-RM-cyan-300">
          404
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-RM-green-300 mb-4">
        You&apos;ve traveled to a dimension that doesn&apos;t exist
      </h1>

      <p className="text-xl text-gray-300 max-w-lg mb-8">
        Even Rick couldn&apos;t find this page in any of the infinite universes.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-transparent border-2 border-RM-green-300 hover:bg-RM-green-300/20 text-white rounded-md flex items-center justify-center gap-2 transition-colors"
        >
          <Home size={18} />
          Go Home
        </Link>
      </div>

      {/* Buena frase esta, no? */}
      <div className="mt-12 text-gray-500">
        <p>
          &quot;The universe is basically an animal. It grazes on the ordinary.
          It creates infinite idiots just to eat them.&quot;
        </p>
        <p className="mt-1">- Rick Sanchez</p>
      </div>
    </div>
  );
}
