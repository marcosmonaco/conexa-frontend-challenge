/* eslint-disable @next/next/no-img-element */
import React from "react";

import {CharacterModalProps} from "./types";

export default function CharacterModal({
  open,
  onHide,
  character,
}: CharacterModalProps) {
  if (!open || !character) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center"
      data-testid="character-modal-container"
    >
      <div
        className="fixed inset-0 backdrop-blur-sm bg-black/30 transition-opacity"
        onClick={onHide}
        aria-hidden="true"
        data-testid="character-modal-backdrop"
      />

      {/* Modal */}
      <div
        className="relative overflow-y-auto w-full max-w-lg rounded-lg bg-gray-800 text-left transition-all z-10 m-4 border-4 border-RM-green-300 shadow-glow-green"
        data-testid="character-modal-content"
      >
        <div className="relative bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          {/* Close button */}
          <button
            type="button"
            className="absolute top-2 right-1 text-gray-400 hover:text-white focus:outline-none"
            onClick={onHide}
            data-testid="character-modal-close-btn"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="sm:flex sm:items-start">
            {/* Character image */}
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-48 w-48 rounded-md sm:mx-0 sm:h-64 sm:w-64">
              <img
                src={character.image}
                alt={character.name}
                className="h-full w-full object-cover rounded-md"
                data-testid="character-modal-image"
              />
            </div>

            {/* Character details */}
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-2xl leading-6 font-bold text-RM-cyan-300 mb-4"
                data-testid="character-modal-name"
              >
                {character.name}
              </h3>

              <div className="mt-2 space-y-3">
                <div data-testid="character-modal-status">
                  <span className="text-gray-400">Status: </span>
                  <span className="text-white font-medium">
                    {character.status}
                  </span>
                </div>

                <div data-testid="character-modal-species">
                  <span className="text-gray-400">Species: </span>
                  <span className="text-white font-medium">
                    {character.species}
                  </span>
                </div>

                <div data-testid="character-modal-gender">
                  <span className="text-gray-400">Gender: </span>
                  <span className="text-white font-medium">
                    {character.gender}
                  </span>
                </div>

                <div data-testid="character-modal-origin">
                  <span className="text-gray-400">Origin: </span>
                  <span className="text-white font-medium">
                    {character.origin?.name || "Unknown"}
                  </span>
                </div>

                <div data-testid="character-modal-location">
                  <span className="text-gray-400">Location: </span>
                  <span className="text-white font-medium">
                    {character.location?.name || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t-4 border-RM-green-300">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md border-3 border-gray-600 px-4 py-2 text-base text-white shadow-sm hover:opacity-90 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
            onClick={onHide}
            data-testid="character-modal-footer-close-btn"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
