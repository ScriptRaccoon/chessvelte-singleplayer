import { directional_moves } from "./directions"

export const bishop_moves = directional_moves([
	[+1, +1],
	[+1, -1],
	[-1, +1],
	[-1, -1],
])
