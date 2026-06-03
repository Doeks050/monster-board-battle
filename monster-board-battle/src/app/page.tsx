import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
        <h1 className="mb-2 text-4xl font-bold">Monster Board Battle</h1>

        <p className="mb-8 text-slate-400">
          Turn-based monster board battle card game
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/game"
            className="rounded-xl bg-emerald-500 px-4 py-3 font-bold text-slate-950 hover:bg-emerald-400"
          >
            Start Game
          </Link>

          <button className="rounded-xl border border-slate-700 px-4 py-3 text-slate-400">
            Collection
          </button>

          <button className="rounded-xl border border-slate-700 px-4 py-3 text-slate-400">
            Deck Builder
          </button>
        </div>
      </div>
    </main>
  );
}
