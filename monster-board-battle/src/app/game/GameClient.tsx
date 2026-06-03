"use client";

import { useState } from "react";
import { AttackPreviewModal } from "@/components/game/AttackPreviewModal";
import { GameBoard } from "@/components/game/GameBoard";
import { GameSidebar } from "@/components/game/GameSidebar";
import { PlayerHand } from "@/components/game/PlayerHand";
import { BASE_MAX_HP, P1_BASE, P2_BASE } from "@/lib/game/constants";
import { createStarterDeck, drawCards } from "@/lib/game/cards";
import { calculateDamage, isAdjacent } from "@/lib/game/combat";
import { getMonsterAt, getMonsterCard } from "@/lib/game/monsters";
import { getMovementDistance } from "@/lib/game/movement";
import { getEffectiveMonsterStats, getPlayerMovementBonus } from "@/lib/game/stats";
import type {
  GameCard,
  MonsterInstance,
  PlayerId,
  PlayerState,
} from "@/lib/game/types";

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

type PendingAttack = {
  attackerId: string;
  defenderId: string;
};

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

function removeCardFromHand(hand: GameCard[], index: number) {
  return hand.filter((_, cardIndex) => cardIndex !== index);
}

function rollD6() {
  return Math.floor(Math.random() * 6) + 1;
}

export function GameClient() {
  const [currentPlayer, setCurrentPlayer] = useState<PlayerId>("p1");
  const [turnNumber, setTurnNumber] = useState(1);
  const [monsters, setMonsters] =
    useState<MonsterInstance[]>(INITIAL_MONSTERS);
  const [selectedMonster, setSelectedMonster] =
    useState<MonsterInstance | null>(null);
  const [selectedHandIndex, setSelectedHandIndex] = useState<number | null>(
    null
  );

  const [diceRoll, setDiceRoll] = useState<number | null>(null);
  const [movementPointsLeft, setMovementPointsLeft] = useState<number | null>(
    null
  );
  const [pendingAttack, setPendingAttack] = useState<PendingAttack | null>(
    null
  );
  const [attackedMonsterIds, setAttackedMonsterIds] = useState<string[]>([]);

  const [p1State, setP1State] = useState<PlayerState>(() =>
    createInitialPlayerState("p1")
  );
  const [p2State, setP2State] = useState<PlayerState>(() =>
    createInitialPlayerState("p2")
  );

  const [p1BaseHp] = useState(BASE_MAX_HP);
  const [p2BaseHp] = useState(BASE_MAX_HP);

  const activePlayerState = currentPlayer === "p1" ? p1State : p2State;
  const selectedCard =
    selectedHandIndex === null ? null : activePlayerState.hand[selectedHandIndex];

  const hasSelectedMonsterCard = selectedCard?.type === "monster";

  const pendingAttacker =
    pendingAttack === null
      ? null
      : monsters.find((monster) => monster.instanceId === pendingAttack.attackerId) ??
        null;

  const pendingDefender =
    pendingAttack === null
      ? null
      : monsters.find((monster) => monster.instanceId === pendingAttack.defenderId) ??
        null;

  function setActivePlayerState(nextState: PlayerState) {
    if (currentPlayer === "p1") {
      setP1State(nextState);
    } else {
      setP2State(nextState);
    }
  }

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
    setSelectedHandIndex(null);
    setSelectedMonster(null);
    setDiceRoll(null);
    setMovementPointsLeft(null);
    setPendingAttack(null);
    setAttackedMonsterIds([]);

    if (currentPlayer === "p1") {
      setCurrentPlayer("p2");
      setP2State((player) => drawForPlayer(player));
    } else {
      setCurrentPlayer("p1");
      setP1State((player) => drawForPlayer(player));
    }

    setTurnNumber((turn) => turn + 1);
  }

  function selectHandCard(index: number) {
    setSelectedHandIndex((currentIndex) =>
      currentIndex === index ? null : index
    );
    setSelectedMonster(null);
    setPendingAttack(null);
  }

  function selectMonster(monster: MonsterInstance) {
    setSelectedMonster(monster);
    setSelectedHandIndex(null);
    setPendingAttack(null);
  }

  function rollDice() {
    if (diceRoll !== null) {
      return;
    }

    const roll = rollD6();
    const movementBonus = getPlayerMovementBonus(currentPlayer, monsters);
    const totalMovement = roll + movementBonus;

    setDiceRoll(roll);
    setMovementPointsLeft(totalMovement);
  }

  function openAttackPreview(x: number, y: number) {
    if (!selectedMonster) {
      return false;
    }

    if (selectedMonster.owner !== currentPlayer) {
      return false;
    }

    if (attackedMonsterIds.includes(selectedMonster.instanceId)) {
      return false;
    }

    const target = getMonsterAt(monsters, x, y);

    if (!target || target.owner === currentPlayer) {
      return false;
    }

    if (!isAdjacent(selectedMonster.x, selectedMonster.y, x, y)) {
      return false;
    }

    setPendingAttack({
      attackerId: selectedMonster.instanceId,
      defenderId: target.instanceId,
    });

    return true;
  }

  function confirmAttack() {
    if (!pendingAttacker || !pendingDefender) {
      setPendingAttack(null);
      return;
    }

    if (attackedMonsterIds.includes(pendingAttacker.instanceId)) {
      setPendingAttack(null);
      return;
    }

    const attackerStats = getEffectiveMonsterStats(pendingAttacker, monsters);
    const defenderStats = getEffectiveMonsterStats(pendingDefender, monsters);
    const damage = calculateDamage(attackerStats.atk, defenderStats.def);
    const nextHp = pendingDefender.currentHp - damage;

    if (nextHp <= 0) {
      const movedAttacker: MonsterInstance = {
        ...pendingAttacker,
        x: pendingDefender.x,
        y: pendingDefender.y,
      };

      setMonsters((currentMonsters) =>
        currentMonsters
          .filter((monster) => monster.instanceId !== pendingDefender.instanceId)
          .map((monster) =>
            monster.instanceId === pendingAttacker.instanceId
              ? movedAttacker
              : monster
          )
      );

      setSelectedMonster(movedAttacker);
    } else {
      const damagedDefender: MonsterInstance = {
        ...pendingDefender,
        currentHp: nextHp,
      };

      setMonsters((currentMonsters) =>
        currentMonsters.map((monster) =>
          monster.instanceId === pendingDefender.instanceId
            ? damagedDefender
            : monster
        )
      );

      setSelectedMonster(pendingAttacker);
    }

    setAttackedMonsterIds((ids) => [...ids, pendingAttacker.instanceId]);
    setPendingAttack(null);
  }

  function moveSelectedMonster(x: number, y: number) {
    if (!selectedMonster || diceRoll === null || movementPointsLeft === null) {
      return false;
    }

    if (movementPointsLeft <= 0) {
      return false;
    }

    if (selectedMonster.owner !== currentPlayer) {
      return false;
    }

    const occupied = getMonsterAt(monsters, x, y);

    if (occupied) {
      return false;
    }

    const distance = getMovementDistance(
      selectedMonster.x,
      selectedMonster.y,
      x,
      y
    );

    if (distance <= 0 || distance > movementPointsLeft) {
      return false;
    }

    const movedMonster: MonsterInstance = {
      ...selectedMonster,
      x,
      y,
    };

    setMonsters((currentMonsters) =>
      currentMonsters.map((monster) =>
        monster.instanceId === selectedMonster.instanceId
          ? movedMonster
          : monster
      )
    );

    setSelectedMonster(movedMonster);
    setMovementPointsLeft((points) =>
      points === null ? null : Math.max(0, points - distance)
    );

    return true;
  }

  function handleTileClick(x: number, y: number) {
    const openedAttackPreview = openAttackPreview(x, y);

    if (openedAttackPreview) {
      return;
    }

    const moved = moveSelectedMonster(x, y);

    if (moved) {
      return;
    }

    if (!selectedCard || selectedHandIndex === null) {
      return;
    }

    if (selectedCard.type !== "monster") {
      return;
    }

    const base = currentPlayer === "p1" ? P1_BASE : P2_BASE;
    const isOwnBase = base.x === x && base.y === y;
    const occupied = getMonsterAt(monsters, x, y);

    if (!isOwnBase || occupied) {
      return;
    }

    const card = getMonsterCard(selectedCard.cardId);

    const newMonster: MonsterInstance = {
      instanceId: `${currentPlayer}-${selectedCard.cardId}-${Date.now()}`,
      cardId: selectedCard.cardId,
      owner: currentPlayer,
      x,
      y,
      currentHp: card.hp,
    };

    setMonsters((currentMonsters) => [...currentMonsters, newMonster]);

    setActivePlayerState({
      ...activePlayerState,
      hand: removeCardFromHand(activePlayerState.hand, selectedHandIndex),
    });

    setSelectedHandIndex(null);
    setSelectedMonster(newMonster);
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Monster Board Battle</h1>
        <p className="text-slate-400">
          Module 8 — attack preview modal and one attack per monster
        </p>
      </div>

      <section className="flex flex-col gap-6 xl:flex-row">
        <GameBoard
          currentPlayer={currentPlayer}
          monsters={monsters}
          selectedMonster={selectedMonster}
          diceRoll={diceRoll}
          movementPointsLeft={movementPointsLeft}
          hasSelectedMonsterCard={hasSelectedMonsterCard}
          onSelectMonster={selectMonster}
          onTileClick={handleTileClick}
        />

        <GameSidebar
          currentPlayer={currentPlayer}
          turnNumber={turnNumber}
          p1BaseHp={p1BaseHp}
          p2BaseHp={p2BaseHp}
          selectedMonster={selectedMonster}
          monsters={monsters}
          p1DeckCount={p1State.deck.length}
          p2DeckCount={p2State.deck.length}
          diceRoll={diceRoll}
          movementPointsLeft={movementPointsLeft}
          onRollDice={rollDice}
          onEndTurn={endTurn}
        />
      </section>

      <PlayerHand
        currentPlayer={currentPlayer}
        hand={activePlayerState.hand}
        deckCount={activePlayerState.deck.length}
        discardCount={activePlayerState.discard.length}
        handLimit={HAND_LIMIT}
        selectedHandIndex={selectedHandIndex}
        onSelectCard={selectHandCard}
      />

      {pendingAttacker && pendingDefender && (
        <AttackPreviewModal
          attacker={pendingAttacker}
          defender={pendingDefender}
          monsters={monsters}
          onConfirm={confirmAttack}
          onCancel={() => setPendingAttack(null)}
        />
      )}
    </main>
  );
}
