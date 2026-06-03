import { BOOST_CARDS } from "@/data/boosts";
import { MONSTER_CARDS } from "@/data/monsters";
import type { BoostCard, GameCard, MonsterCard } from "./types";

export function getBoostCard(cardId: string): BoostCard {
  const card = BOOST_CARDS.find((boost) => boost.id === cardId);

  if (!card) {
    throw new Error(`Boost card not found: ${cardId}`);
  }

  return card;
}

export function getCardDisplay(card: GameCard): {
  name: string;
  icon: string;
  subtitle: string;
  description: string;
  monster?: MonsterCard;
  boost?: BoostCard;
} {
  if (card.type === "monster") {
    const monster = MONSTER_CARDS.find((item) => item.id === card.cardId);

    if (!monster) {
      throw new Error(`Monster card not found: ${card.cardId}`);
    }

    return {
      name: monster.name,
      icon: monster.icon,
      subtitle: monster.rarity,
      description: `❤ ${monster.hp}  ⚔ ${monster.atk}  🛡 ${monster.def}  👣 +${monster.mov}`,
      monster,
    };
  }

  const boost = getBoostCard(card.cardId);

  return {
    name: boost.name,
    icon: boost.icon,
    subtitle: "Boost",
    description: boost.description,
    boost,
  };
}

export function createStarterDeck(): GameCard[] {
  const deck: GameCard[] = [];

  const monsterIds = [
    "forest-wolf",
    "stone-golem",
    "storm-eagle",
    "fire-drake",
    "ancient-treant",
    "crystal-serpent",
  ];

  const boostIds = ["sprint", "rage", "shield", "heal"];

  for (let i = 0; i < 24; i++) {
    deck.push({
      type: "monster",
      cardId: monsterIds[i % monsterIds.length],
    });
  }

  for (let i = 0; i < 16; i++) {
    deck.push({
      type: "boost",
      cardId: boostIds[i % boostIds.length],
    });
  }

  return shuffleDeck(deck);
}

export function drawCards(deck: GameCard[], hand: GameCard[], amount: number) {
  const nextDeck = [...deck];
  const nextHand = [...hand];

  for (let i = 0; i < amount; i++) {
    const drawnCard = nextDeck.shift();

    if (!drawnCard) {
      break;
    }

    nextHand.push(drawnCard);
  }

  return {
    deck: nextDeck,
    hand: nextHand,
  };
}

function shuffleDeck(deck: GameCard[]) {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[randomIndex];
    shuffled[randomIndex] = temp;
  }

  return shuffled;
}
