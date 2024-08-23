import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-col justify-center items-center content-center h-screen gap-4 frame-background">
        <h1 className="text-5xl">Art Value Challenge!</h1>
        <div className="bg-secondary rounded-full size-24 flex justify-center items-center">
          <Link href="/game">
            <span className="material-symbols-outlined material-icons md-64">
              play_arrow
            </span>
          </Link>
        </div>
        <p className="text-lg">
          Guess the value of different art pieces and test your knowledge.
        </p>
      </div>
    </main>
  );
}
