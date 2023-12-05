import { directional_moves } from "./directional_moves"

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
