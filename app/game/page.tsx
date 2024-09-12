"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState(0);

  type ArtData = {
    name: string;
    imageUrl: string;
    price: number;
    guess?: number;
  };

  const initialArtData: ArtData[] = [
    {
      name: "Starry Night",
      imageUrl: "https://www.moma.org/media/W1siZiIsIjQwNzQzNiJdLFsicCIsImNvbnZlcnQiLCItcmVzaXplIDYwMHg2MDBcdTAwM2QiXV0.jpg",
      price: 100000000 // $100 million (approx valuation)
    },
    {
      name: "Mona Lisa",
      imageUrl: "https://uploads8.wikiart.org/images/leonardo-da-vinci/mona-lisa.jpg",
      price: 860000000 // $860 million (approx valuation)
    },
    {
      name: "The Scream",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/a/a3/The_Scream.jpg",
      price: 120000000 // $120 million (auction price)
    },
    {
      name: "Les Demoiselles d'Avignon",
      imageUrl: "https://www.moma.org/media/W1siZiIsIjMyNzYyMyJdLFsicCIsImNvbnZlcnQiLCItcmVzaXplIDYwMHg2MDBcdTAwM2QiXV0.jpg",
      price: 200000000 // $200 million (approx valuation)
    },
    {
      name: "Nighthawks",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/d/d5/Nighthawks_by_Edward_Hopper_1942.jpg",
      price: 100000000 // $100 million (approx valuation)
    },
    {
      name: "Guernica",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg",
      price: 200000000 // $200 million (approx valuation)
    },
    {
      name: "Girl with a Pearl Earring",
      imageUrl: "https://uploads7.wikiart.org/images/johannes-vermeer/girl-with-a-pearl-earring.jpg",
      price: 80000000 // $80 million (approx valuation)
    },
    {
      name: "The Persistence of Memory",
      imageUrl: "https://uploads5.wikiart.org/images/salvador-dali/the-persistence-of-memory-1931.jpg",
      price: 150000000 // $150 million (approx valuation)
    },
    {
      name: "The Night Watch",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Rembrandt_van_Rijn_-_The_Nightwatch_-_Google_Art_Project.jpg/1200px-Rembrandt_van_Rijn_-_The_Nightwatch_-_Google_Art_Project.jpg",
      price: 500000000 // $500 million (approx valuation)
    },
    {
      name: "The Kiss",
      imageUrl: "https://uploads4.wikiart.org/images/gustav-klimt/the-kiss-1908.jpg",
      price: 240000000 // $240 million (approx valuation)
    },
    {
      name: "American Gothic",
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/9d/Grant_DeVolson_Wood_-_American_Gothic.jpg",
      price: 120000000 // $120 million (approx valuation)
    },
    {
      name: "The Birth of Venus",
      imageUrl: "https://uploads7.wikiart.org/images/sandro-botticelli/the-birth-of-venus-1486.jpg",
      price: 200000000 // $200 million (approx valuation)
    },
    {
      name: "The Last Supper",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Leonardo_da_Vinci_-_Ultima_Cena_-_ca._1490.jpg/1200px-Leonardo_da_Vinci_-_Ultima_Cena_-_ca._1490.jpg",
      price: 450000000 // $450 million (approx valuation)
    },
    {
      name: "Water Lilies",
      imageUrl: "https://uploads7.wikiart.org/images/claude-monet/water-lilies.jpg",
      price: 70000000 // $70 million (approx valuation)
    },
    {
      name: "Bal du moulin de la Galette",
      imageUrl: "https://uploads8.wikiart.org/images/pierre-auguste-renoir/dance-at-le-moulin-de-la-galette-1876.jpg",
      price: 78000000 // $78 million (auction price)
    },
    {
      name: "The Arnolfini Portrait",
      imageUrl: "https://uploads7.wikiart.org/images/jan-van-eyck/arnolfini-portrait.jpg",
      price: 150000000 // $150 million (approx valuation)
    },
    {
      name: "A Sunday Afternoon on the Island of La Grande Jatte",
      imageUrl: "https://uploads1.wikiart.org/images/georges-seurat/a-sunday-afternoon-on-the-island-of-la-grande-jatte-1884.jpg",
      price: 65000000 // $65 million (approx valuation)
    },
    {
      name: "Whistler's Mother",
      imageUrl: "https://uploads1.wikiart.org/images/james-mcneill-whistler/whistlers-mother.jpg",
      price: 50000000 // $50 million (approx valuation)
    },
    {
      name: "The Creation of Adam",
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/80/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg",
      price: 400000000 // $400 million (approx valuation)
    },
    {
      name: "The Hay Wain",
      imageUrl: "https://uploads6.wikiart.org/images/john-constable/the-hay-wain-1821.jpg",
      price: 50000000 // $50 million (approx valuation)
    },
    {
      name: "Sunflowers",
      imageUrl: "https://uploads7.wikiart.org/images/vincent-van-gogh/sunflowers-1889.jpg",
      price: 82000000 // $82 million (auction price)
    },
    {
      name: "The Son of Man",
      imageUrl: "https://uploads7.wikiart.org/images/rene-magritte/the-son-of-man.jpg",
      price: 55000000 // $55 million (approx valuation)
    },
    {
      name: "Luncheon of the Boating Party",
      imageUrl: "https://uploads6.wikiart.org/images/pierre-auguste-renoir/luncheon-of-the-boating-party-1881.jpg",
      price: 78000000 // $78 million (auction price)
    },
    {
      name: "Impression, Sunrise",
      imageUrl: "https://uploads7.wikiart.org/images/claude-monet/impression-sunrise-1872.jpg",
      price: 110000000 // $110 million (approx valuation)
    },
    {
      name: "The Garden of Earthly Delights",
      imageUrl: "https://uploads7.wikiart.org/images/hieronymus-bosch/the-garden-of-earthly-delights-1515.jpg",
      price: 250000000 // $250 million (approx valuation)
    },
    {
      name: "Liberty Leading the People",
      imageUrl: "https://uploads1.wikiart.org/images/eugene-delacroix/liberty-leading-the-people-1830.jpg",
      price: 300000000 // $300 million (approx valuation)
    },
    {
      name: "Wheatfield with Crows",
      imageUrl: "https://uploads5.wikiart.org/images/vincent-van-gogh/wheatfield-with-crows-1890.jpg",
      price: 65000000 // $65 million (approx valuation)
    },
    {
      name: "No. 5, 1948",
      imageUrl: "https://uploads8.wikiart.org/images/jackson-pollock/no-5-1948.jpg",
      price: 140000000 // $140 million (auction price)
    },
    {
      name: "Portrait of Adele Bloch-Bauer I",
      imageUrl: "https://uploads8.wikiart.org/images/gustav-klimt/portrait-of-adele-bloch-bauer-i-1907.jpg",
      price: 135000000 // $135 million (auction price)
    },
    {
      name: "The Card Players",
      imageUrl: "https://uploads5.wikiart.org/images/paul-cezanne/the-card-players-1895.jpg",
      price: 250000000 // $250 million (auction price)
    },
    {
      name: "The Dream",
      imageUrl: "https://uploads8.wikiart.org/images/henri-rousseau/the-dream-1910.jpg",
      price: 45000000 // $45 million (auction price)
    },
    {
      name: "The Sleeping Gypsy",
      imageUrl: "https://uploads8.wikiart.org/images/henri-rousseau/the-sleeping-gypsy-1897.jpg",
      price: 45000000 // $45 million (auction price)
    },
    {
      name: "The Dance",
      imageUrl: "https://uploads8.wikiart.org/images/henri-matisse/the-dance-1910.jpg",
      price: 240000000 // $240 million (auction price)
    },
    {
      name: "The Music Lesson",
      imageUrl: "https://uploads8.wikiart.org/images/johannes-vermeer/the-music-lesson.jpg",
      price: 120000000 // $120 million (auction price)
    },
    {
      name: "Venus of Urbino",
      imageUrl: "https://uploads6.wikiart.org/images/titian/venus-of-urbino-1538.jpg",
      price: 200000000 // $200 million (approx valuation)
    },
    {
      name: "Christina's World",
      imageUrl: "https://uploads6.wikiart.org/images/andrew-wyeth/christina-s-world-1948.jpg",
      price: 80000000 // $80 million (auction price)
    },
    {
      name: "Irises",
      imageUrl: "https://uploads2.wikiart.org/images/vincent-van-gogh/irises-1890.jpg",
      price: 110000000 // $110 million (auction price)
    },
    {
      name: "The Blue Boy",
      imageUrl: "https://uploads6.wikiart.org/images/thomas-gainsborough/the-blue-boy-1770.jpg",
      price: 100000000 // $100 million (approx valuation)
    },
    {
      name: "Luncheon on the Grass",
      imageUrl: "https://uploads7.wikiart.org/images/edouard-manet/luncheon-on-the-grass.jpg",
      price: 220000000 // $220 million (approx valuation)
    },
    {
      name: "Wanderer above the Sea of Fog",
      imageUrl: "https://uploads1.wikiart.org/images/caspar-david-friedrich/wanderer-above-the-sea-of-fog.jpg",
      price: 60000000 // $60 million (approx valuation)
    },
    {
      name: "The Milkmaid",
      imageUrl: "https://uploads8.wikiart.org/images/johannes-vermeer/the-milkmaid.jpg",
      price: 150000000 // $150 million (approx valuation)
    },
    {
      name: "Olympia",
      imageUrl: "https://uploads7.wikiart.org/images/edouard-manet/olympia.jpg",
      price: 160000000 // $160 million (approx valuation)
    },
    {
      name: "Composition with Red, Blue and Yellow",
      imageUrl: "https://uploads8.wikiart.org/images/piet-mondrian/composition-with-red-blue-and-yellow-1930.jpg",
      price: 70000000 // $70 million (auction price)
    },
    {
      name: "The Lovers",
      imageUrl: "https://uploads5.wikiart.org/images/rene-magritte/the-lovers-1928.jpg",
      price: 40000000 // $40 million (auction price)
    },
    {
      name: "The Fighting Temeraire",
      imageUrl: "https://uploads1.wikiart.org/images/william-turner/the-fighting-temeraire.jpg",
      price: 50000000 // $50 million (approx valuation)
    },
    {
      name: "Man with a Blue Scarf",
      imageUrl: "https://uploads8.wikiart.org/images/lucian-freud/man-with-a-blue-scarf.jpg",
      price: 43000000 // $43 million (auction price)
    },
    {
      name: "Woman with a Parasol",
      imageUrl: "https://uploads8.wikiart.org/images/claude-monet/woman-with-a-parasol-madame-monet-and-her-son-1875.jpg",
      price: 78000000 // $78 million (auction price)
    },
    // Add 50 more artworks here in the same manner
  ];
  

  const searchParams = useSearchParams();
  const totalRounds = Math.min(parseInt(searchParams.get("rounds") || "5", 10), initialArtData.length);

  const shuffleArray = (array: ArtData[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const [artData, setArtData] = useState<ArtData[]>([]);

  useEffect(() => {
    setArtData(shuffleArray([...initialArtData]));
  }, []);

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
    currentRound <= totalRounds ? (
      <div className="flex flex-col gap-4 items-center justify-center h-screen m-4">
        <h1 className="text-3xl">ArtValue Challenge</h1>
        <p className="text-xl">Round {currentRound}</p>
        <img
          className="max-h-[50vh] max-w-[50vw] rounded-md"
          src={currentArt.imageUrl}
          alt="Artwork"
        />
        <p className="text-lg font-semibold">{currentArt.name}</p>
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
      </div>
        ) : (
      <div className="flex flex-col gap-4 items-center justify-center h-screen m-4">
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
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Price (€)</th>
          <th className="px-4 py-2">Your Guess (€)</th>
          <th className="px-4 py-2">Accuracy (%)</th>
        </tr>
          </thead>
          <tbody>
        {artData.slice(0, totalRounds).map((art, index) => (
          <tr key={index}>
            <td className="border px-4 py-2">
          <img
            className="max-h-[10vh] max-w-[10vw] rounded-md"
            src={art.imageUrl}
            alt={`Artwork ${index + 1}`}
          />
            </td>
            <td className="border px-4 py-2">{art.name}</td>
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
        <Link href="/" className="btn btn-secondary mt-4">
          Play Again
        </Link>
      </div>
    )
  );
};

export default Page;