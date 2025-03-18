import React from "react";

import {StatusFiltersProps} from "./types";

export default function StatusFilters({
  statusFilter,
  onChange,
}: StatusFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-6 pb-2">
      {/* Filtro Alive */}
      <label className="flex items-center gap-2 cursor-pointer">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={statusFilter.alive}
            onChange={() => onChange("alive")}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 ${
              statusFilter.alive ? "border-green-500" : "border-gray-600"
            } bg-transparent flex items-center justify-center`}
          >
            {statusFilter.alive && (
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            )}
          </div>
        </div>
        <span className="flex items-center gap-1">
          <span className="font-semibold">Alive</span>
        </span>
      </label>

      {/* Filtro Dead */}
      <label className="flex items-center gap-2 cursor-pointer">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={statusFilter.dead}
            onChange={() => onChange("dead")}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 ${
              statusFilter.dead ? "border-red-500" : "border-gray-600"
            } bg-transparent flex items-center justify-center`}
          >
            {statusFilter.dead && (
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            )}
          </div>
        </div>
        <span className="flex items-center gap-1">
          <span className="font-semibold">Dead</span>
        </span>
      </label>

      {/* Filtro Unknown */}
      <label className="flex items-center gap-2 cursor-pointer">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={statusFilter.unknown}
            onChange={() => onChange("unknown")}
            className="sr-only"
          />
          <div
            className={`w-5 h-5 rounded-full border-2 ${
              statusFilter.unknown ? "border-gray-500" : "border-gray-600"
            } bg-transparent flex items-center justify-center`}
          >
            {statusFilter.unknown && (
              <div className="w-2.5 h-2.5 rounded-full bg-gray-500"></div>
            )}
          </div>
        </div>
        <span className="flex items-center gap-1">
          <span className="font-semibold">Unknown</span>
        </span>
      </label>
    </div>
  );
}
