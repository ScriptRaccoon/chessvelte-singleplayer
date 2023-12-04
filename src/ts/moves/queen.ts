import { directional_moves } from "./directions"

export const queen_moves = directional_moves([
	[+1, 0],
	[-1, 0],
	[0, +1],
	[0, -1],
	[+1, +1],
	[+1, -1],
	[-1, +1],
	[-1, -1],
])
