"use client";

import React, { useState } from "react";
import Link from "next/link";

const Page = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState(0);

  type ArtData = {
    imageUrl: string;
    price: number;
    guess?: number;
  };

  const [artData, setArtData] = useState<ArtData[]>([
    {
      imageUrl: "https://picsum.photos/1000",
      price: 1000,
    },
    {
      imageUrl: "https://picsum.photos/2000",
      price: 2000,
    },
    {
      imageUrl: "https://picsum.photos/500",
      price: 3000,
    },
  ]);

  const currentArt = artData[currentRound - 1] || {};
  const previousArt = artData[currentRound - 2] || {};

  const handleGuess = () => {
    const difference = Math.abs(guess - currentArt.price);
    const accuracy = 1 - difference / currentArt.price;
    setArtData((prevArtData) => {
      const newArtData = [...prevArtData];
      newArtData[currentRound - 1] = {
        ...currentArt,
        guess,
      };
      return newArtData;
    });
    setScore(Math.max(score + accuracy, 0));
    setCurrentRound(currentRound + 1);
  };

  return (
    Object.keys(currentArt).length > 0 ?
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-3xl">ArtValue Challenge</h1>
      <p className="text-xl">Round {currentRound}</p>
      <img
      className="max-h-[50vh] max-w-[50vw] rounded-md"
      src={currentArt.imageUrl}
      alt="Artwork"
      />
      <p>Guess the price of the artwork</p>
      <label className="input input-primary flex items-center gap-2">
      <input
        type="text"
        placeholder="Enter the price in euros"
        value={guess ? guess.toLocaleString() : ""}
        onChange={(e) => {
        const value = e.target.value.replace(/[^\d]/g, "");
        setGuess(value ? parseInt(value, 10) : 0);
        }}
      />
      <span>€</span>
      </label>
      <button className="btn btn-primary" onClick={handleGuess}>
      Guess
      </button>
      {previousArt.guess !== undefined && (
      <p>
        Previous Round Accuracy:{" "}
        {Math.max(
        Math.round(
          (1 - Math.abs(previousArt.guess - previousArt.price) / previousArt.price) * 100
        ),
        0
        )}
        %
      </p>
      )}
      {score > 0 && (
      <p>Overall Accuracy: {Math.max(Math.round((score / (currentRound - 1)) * 100), 0)}%</p>
      )}
    </div>:
    <div className="flex flex-col gap-4 items-center justify-center h-screen">
      <h1 className="text-3xl">ArtValue Challenge</h1>
      <p className="text-xl">Summary</p>
      <div className="text-center">
        <p>Total Rounds: {artData.length}</p>
        <p>Overall Accuracy: {Math.max(Math.round((score / (currentRound - 1)) * 100), 0)}%</p>
      </div>
      <table className="table-auto">
      <thead>
        <tr>
        <th className="px-4 py-2">Artwork</th>
        <th className="px-4 py-2">Price (€)</th>
        <th className="px-4 py-2">Your Guess (€)</th>
        <th className="px-4 py-2">Accuracy (%)</th>
        </tr>
      </thead>
      <tbody>
        {artData.map((art, index) => (
        <tr key={index}>
          <td className="border px-4 py-2">
          <img
            className="max-h-[10vh] max-w-[10vw] rounded-md"
            src={art.imageUrl}
            alt={`Artwork ${index + 1}`}
          />
          </td>
          <td className="border px-4 py-2">{art.price.toLocaleString()}</td>
          <td className="border px-4 py-2">{art.guess?.toLocaleString() || "N/A"}</td>
            <td className="border px-4 py-2">
            {art.guess !== undefined
            ? `${Math.max(Math.round((1 - Math.abs(art.guess - art.price) / art.price) * 100), 0)}%`
            : "N/A"}
            </td>
        </tr>
        ))}
      </tbody>
      </table>
      {/* play again link that redirects to "/"*/}
      <Link href="/" className="btn btn-secondary mt-4">
        Play Again
      </Link>
    </div>
  );
};

export default Page;
