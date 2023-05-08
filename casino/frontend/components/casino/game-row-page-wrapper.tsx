"use client"

import React, { useState, useEffect } from 'react';
import { GameRow } from "@/components/casino/game-row"
import { gameRows } from "@/config/site"
import useScroll from '@/hooks/use-scroll';

export default function GameRowsWrapper() {
	const scrolled = useScroll(85);
  	const [extraLoad, setExtraLoad] = useState(false);
	useEffect(() => {
		if(scrolled) {
			setExtraLoad(true);
		}
		}, [scrolled]);

	
	return (
		<div className="container relative pb-10">
		<section className="flex w-full items-center gap-6 pt-6 pb-8 md:py-10">
		<div className="overflow-hidden">
			{extraLoad ? 
				<div>
					<GamesMap />
				</div>
				: 
				<div>
					<GamesMap />
				</div>
			}
				</div>

		</section>
		</div>
  )
}


export function GamesMap() {
return (
	<div className="overflow-hidden">

	{gameRows.map((game) => (
		<div 
		  key={game.gameKey}
		> 
		  <GameRow 
			gamesKey={game.gameKey}
			headerTitle={game.header}
			subHeader={game.subHeader}
		  />
		</div>
		))
	  }
	  </div>
);

}