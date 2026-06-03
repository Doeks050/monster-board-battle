"use client";

import { useState } from "react";
import { GameBoard } from "@/components/game/GameBoard";
import { GameSidebar } from "@/components/game/GameSidebar";
import { BASE_MAX_HP } from "@/lib/game/constants";
import type { MonsterInstance, PlayerId } from "@/lib/game/types";

const INITIAL_MONSTERS: MonsterInstance[] = [
  {
    instanceId: "p1-wolf-1",
    cardId: "forest-wolf",
    owner: "p1",
    x: 6,
    y: 13,
    currentHp: 8,
  },
  {
    instanceId: "p1-golem-1",
    cardId: "stone-golem",
    owner: "p1",
    x: 8,
    y: 13,
    currentHp: 14,
  },
  {
    instanceId: "p2-drake-1",
    cardId: "fire-drake",
    owner: "p2",
    x: 6,
    y: 1,
    currentHp: 12,
  },
  {
    instanceId: "p2-eagle-1",
    cardId: "storm-eagle",
    owner: "p2",
    x: 8,
    y: 1,
    currentHp: 6,
  },
];

export function GameClient() {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerId>("p1");
  const [turnNumber, setTurnNumber] = useState(1);
  const [monsters] = useState<MonsterInstance[]>(INITIAL_MONSTERS);
  const [selectedMonster, setSelectedMonster] =
    useState<MonsterInstance | null>(null);

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
          Module 3 — monster pawns and card inspection
        </p>
      </div>

      <section className="flex flex-col gap-6 xl:flex-row">
        <GameBoard
          monsters={monsters}
          onSelectMonster={setSelectedMonster}
        />

        <GameSidebar
          currentPlayer={currentPlayer}
          turnNumber={turnNumber}
          p1BaseHp={p1BaseHp}
          p2BaseHp={p2BaseHp}
          selectedMonster={selectedMonster}
          onEndTurn={endTurn}
        />
      </section>
    </main>
  );
}
