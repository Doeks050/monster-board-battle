"use client";

import { useState } from "react";
import { GameBoard } from "@/components/game/GameBoard";
import { GameSidebar } from "@/components/game/GameSidebar";
import { BASE_MAX_HP } from "@/lib/game/constants";
import type { PlayerId } from "@/lib/game/types";

export function GameClient() {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerId>("p1");
  const [turnNumber, setTurnNumber] = useState(1);

  const [p1BaseHp] = useState(BASE_MAX_HP);
  const [p2BaseHp] = useState(BASE_MAX_HP);

  function endTurn() {
    setCurrentPlayer((player) => (player === "p1" ? "p2" : "p1"));
    setTurnNumber((turn) => turn + 1);
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Monster Board Battle</h1>
        <p className="text-slate-400">
          Module 1 — modular 15x15 board, bases and POIs
        </p>
      </div>

      <section className="flex flex-col gap-6 xl:flex-row">
        <GameBoard />

        <GameSidebar
          currentPlayer={currentPlayer}
          turnNumber={turnNumber}
          p1BaseHp={p1BaseHp}
          p2BaseHp={p2BaseHp}
          onEndTurn={endTurn}
        />
      </section>
    </main>
  );
}
