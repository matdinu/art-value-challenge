"use client";

import React, { useState } from "react";

const Page = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState(0);

  const artData = [
    {
      imageUrl: "https://picsum.photos/1000",
      price: 1000,
    },
    {
      imageUrl: "https://picsum.photos/1000",
      price: 2000,
    },
    {
      imageUrl: "https://picsum.photos/1000",
      price: 3000,
    },
  ];

  const currentArt = artData[currentRound - 1] || {};

  const handleGuess = () => {
    const difference = Math.abs(guess - currentArt.price);
    console.log(difference);
    const accuracy = 1 - difference / currentArt.price;
    setScore(score + accuracy);
    setCurrentRound(currentRound + 1);
  };

  return (
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
          value={guess.toLocaleString() || ""}
          onChange={(e) =>
            setGuess(parseInt(e.target.value.replace(/,/g, ""), 10))
          }
        />
        <span>€</span>
      </label>
      <button className="btn btn-primary" onClick={handleGuess}>
        Guess
      </button>
      <p>Accuracy: {Math.round((score / currentRound) * 100)}%</p>
    </div>
  );
};

export default Page;
