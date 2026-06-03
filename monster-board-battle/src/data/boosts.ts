import type { BoostCard } from "@/lib/game/types";

export const BOOST_CARDS: BoostCard[] = [
  {
    id: "sprint",
    name: "Sprint",
    icon: "👣",
    description: "+3 movement this turn.",
  },
  {
    id: "rage",
    name: "Rage",
    icon: "⚔️",
    description: "+2 ATK this turn.",
  },
  {
    id: "shield",
    name: "Shield",
    icon: "🛡️",
    description: "+2 DEF this turn.",
  },
  {
    id: "heal",
    name: "Heal",
    icon: "❤",
    description: "Restore 5 HP.",
  },
];
