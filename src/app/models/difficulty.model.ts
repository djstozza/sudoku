export interface Difficulty {
  name: string;
  value: number;
}

export const difficulties: Difficulty[] = [
  { name: 'easy', value: 46 },
  { name: 'moderate', value: 36 },
  { name: 'hard', value: 29 },
  { name: 'expert', value: 23 },
  { name: 'insane', value: 17 }
]
