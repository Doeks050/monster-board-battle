"use client";

import { useState } from "react";
import { GameBoard } from "@/components/game/GameBoard";
import { GameSidebar } from "@/components/game/GameSidebar";
import { PlayerHand } from "@/components/game/PlayerHand";
import { BASE_MAX_HP } from "@/lib/game/constants";
import { createStarterDeck, drawCards } from "@/lib/game/cards";
import type { MonsterInstance, PlayerId, PlayerState } from "@/lib/game/types";

const HAND_LIMIT = 8;

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

function createInitialPlayerState(id: PlayerId): PlayerState {
  const deck = createStarterDeck();
  const drawn = drawCards(deck, [], 5);

  return {
    id,
    deck: drawn.deck,
    hand: drawn.hand,
    discard: [],
  };
}

export function GameClient() {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerId>("p1");
  const [turnNumber, setTurnNumber] = useState(1);
  const [monsters] = useState<MonsterInstance[]>(INITIAL_MONSTERS);
  const [selectedMonster, setSelectedMonster] =
    useState<MonsterInstance | null>(null);

  const [p1State, setP1State] = useState<PlayerState>(() =>
    createInitialPlayerState("p1")
  );
  const [p2State, setP2State] = useState<PlayerState>(() =>
    createInitialPlayerState("p2")
  );

  const [p1BaseHp] = useState(BASE_MAX_HP);
  const [p2BaseHp] = useState(BASE_MAX_HP);

  const activePlayerState = currentPlayer === "p1" ? p1State : p2State;

  function drawForPlayer(player: PlayerState): PlayerState {
    if (player.hand.length >= HAND_LIMIT) {
      return player;
    }

    const drawn = drawCards(player.deck, player.hand, 1);

    return {
      ...player,
      deck: drawn.deck,
      hand: drawn.hand,
    };
  }

  function endTurn() {
    if (currentPlayer === "p1") {
      setCurrentPlayer("p2");
      setP2State((player) => drawForPlayer(player));
    } else {
      setCurrentPlayer("p1");
      setP1State((player) => drawForPlayer(player));
    }

    setTurnNumber((turn) => turn + 1);
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Monster Board Battle</h1>
        <p className="text-slate-400">
          Module 4 — decks, hands and automatic draw
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
          p1DeckCount={p1State.deck.length}
          p2DeckCount={p2State.deck.length}
          onEndTurn={endTurn}
        />
      </section>

      <PlayerHand
        currentPlayer={currentPlayer}
        hand={activePlayerState.hand}
        deckCount={activePlayerState.deck.length}
        discardCount={activePlayerState.discard.length}
        handLimit={HAND_LIMIT}
      />
    </main>
  );
}
