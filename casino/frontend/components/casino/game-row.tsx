"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { Separator } from "@/components/ui/separator"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useGamedata } from '@/hooks/gamedata'
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  PlusCircle,
  PlayCircle,
  PinIcon,
} from "lucide-react"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
interface Game {
  id: any
  slug: string
  title: string
  provider: string
}
interface GameCategory {
  popular: object
  new: object
  table_games: object
}
interface GameData {
  id: any
  slug: string
  title: string
  provider: string
}
const playlists = [
  "Supabet Room",
  "Bonus Hunt",
  "Malone Brothers",
  "Thistle Coughs",
  "Nose Repository",
  ]
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"

export function GameRow({gamesKey, headerTitle, subHeader}) {
  const router = useRouter()
  const [gamesFromStorage, setGamesFromStorage] = useState([]);
  const [gamesDataRewardFront, setGamesDataRewardFront] = useState<GameData[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadType, setLoadType] = useState(null);
  const [loadTries, setLoadTries] = useState(1);
  const storageRefreshTimerSeconds = 180;
  const [gamesData, setGamesData] = useState([]);
  const { rowGameData } = useGamedata();
  const [errors, setErrors] = useState(null);
  const { toast } = useToast()

  const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

  
  const localStorageKey = gamesKey+"_row";
  const localStorageKeyTest = localStorageKey+"_storage_test";

  useEffect(() => {
    try {
      localStorage.setItem(localStorageKeyTest, "passed");
      var testOutcome = localStorage.getItem(localStorageKeyTest);
      if(testOutcome === "passed") {
        var gamesRetrieve = localStorage.getItem(localStorageKey);
        if(!gamesRetrieve) {
          setLoadType("set_storage");
          localStorage.removeItem(localStorageKeyTest);
        } else {
            setLoadType("load_storage");
            localStorage.removeItem(localStorageKeyTest);
        }
      }
    } catch(e) {
        console.error("Local storage mode: 'failed_storage'.");
        setLoadType("failed_storage");
    }
    }, []);

    async function fetchData() {
        await rowGameData({
          gamesKey,
          setGamesData,
          setErrors,
      });
    }
    useEffect(() => {
      if(errors) {
        toast({
          title: "Error: Failed to retrieve games",
          description: "Seems the backend API is unavailable. Will retry to load '"+gamesKey+"'.",
        })
        setTimeout(fetchData(), 2000);

      }
  }, [errors]);
    

    useEffect(() => {
          if(gamesData.success) {
            if(loadType === "set_storage") {
              localStorage.setItem(localStorageKey, JSON.stringify(gamesData));
              localStorage.setItem(localStorageKey+"_stored_at", Math.floor(Date.now() / 1000));
            }
            setGamesFromStorage(gamesData);
            setLoaded(true);
          }
      }, [gamesData]);
        
    useEffect(() => {
        if(!loaded) {
          var time_now = Math.floor(Date.now() / 1000);
          if(loadType === "set_storage") {
            fetchData();
          }
          if(loadType === "load_storage") {
            var value = localStorage.getItem(localStorageKey);
            if(!value) {
              console.log("Games not found, local storage mode: 'set_storage'.");
              setLoadType("set_storage");
            } else {
              var stored_at = localStorage.getItem(localStorageKey+"_stored_at");
              if(!stored_at) {
                console.log("Stored at missing.");
                setLoadType("set_storage");
              } else {
                var storage_difference = time_now - stored_at;
                if(storage_difference > storageRefreshTimerSeconds) {
                  localStorage.removeItem(localStorageKey);
                  localStorage.removeItem(localStorageKey+"_stored_at");
                  setLoadType("set_storage");
                  console.log("Refreshing games list local storage because it was set > "+storageRefreshTimerSeconds+" seconds ago.");
                } else {
                var games = !!value ? JSON.parse(value) : [];
                console.log("Games loaded from local storage, valid for another "+(storageRefreshTimerSeconds - storage_difference)+" seconds.");
                setGamesFromStorage(games);
                setLoaded(true);
                }
              }
            }
          }

          if(loadType === "failed_storage") {
                fetchData();
          }
          if(!loaded) {
            //setLoadTries((loadTries+1));
          }
        }
      }, [loadType, loadTries]);

    useEffect(() => {
        if(gamesFromStorage.data) {
          setGamesDataRewardFront(gamesFromStorage.data);
        }
    }, [gamesFromStorage])

  return (
    <div className="col-span-2 overflow-hidden">
            <div className="mt-12 space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                {headerTitle ?? "Games"}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {subHeader ?? ""}
              </p>
            </div>
            <Separator className="my-4" />
            <div className="relative">
              <ScrollArea>
                <div className="relative flex space-x-4 mb-5">
                  {gamesFromStorage?.data ? 
                        gamesDataRewardFront.map((game) => (
                            <div 
                              key={game.slug + gamesKey}
                              className="cursor-pointer" 
                              onClick={event => event.preventDefault() & router.push("/game/play?slug="+game.slug+"&name="+ game.title)}
                            > 
                              <SingleGame
                                key={game.slug + gamesKey}
                              game={game}
                                imageAlt={game.id + "-row-2"}
                                className="w-[150px]"
                                aspectRatio={1 / 1}
                              />
                            </div>
                          ))
                      :
                      <>
                          <SkeletonGame aspectRatio={1/1} />
                          <SkeletonGame aspectRatio={1/1} />
                          <SkeletonGame aspectRatio={1/1} />
                          <SkeletonGame aspectRatio={1/1} />
                          <SkeletonGame aspectRatio={1/1} />
                          <SkeletonGame aspectRatio={1/1} />
                          <SkeletonGame aspectRatio={1/1} />

                      </>
                  }
                </div>
                <ScrollBar className="h-2 max-w-[80vw]" orientation="horizontal" />
              </ScrollArea>
            </div>
        </div>
  )
}

interface SkeletonGameProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: number
  className?: string
}
function SkeletonGame({
  aspectRatio = 1 / 1,
  className,
  ...props
}: SkeletonGameProps) {
  return (
    <div className="space-y-3 w-[150px]">
      <span data-state="closed">
        <AspectRatio ratio={aspectRatio} className="relative bg-primary opacity-[0.8] rounded-md w-full pb-[100%]" />
      </span>
      <div className="space-y-1 text-sm">
          <Skeleton className="h-3 bg-primary opacity-[0.9] w-[130px]" />
          <Skeleton className="h-2 bg-primary opacity-[0.95] w-[100px]" />
      </div>
    </div>
  )
}


interface SingleGameProps extends React.HTMLAttributes<HTMLDivElement> {
  key: string
  game: Game
  imageAlt: string
  aspectRatio?: number
  className?: string
}


function SingleGame({
  game,
  imageAlt,
  aspectRatio = 3 / 4,
  className,
  ...props
}: SingleGameProps) {

  const [thumbnail, setThumbnail] = useState("/thumb/s3/" + game.slug + ".png");
  const defaultError = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsBAMAAACLU5NGAAAAA3NCSVQICAjb4U/gAAAAAXNSR0IArs4c6QAAACdQTFRFAAAAFRUVKioqQEBAVVVVampqgICAlZWVqqqqv7+/1dXV6urq////97xb/AAAAA10Uk5TDAwMDAwMDAwMDAwMDEAYGtUAAALPSURBVBgZ7cG/b1tVAAXg8+w4bgqD1YFWlOF1pHgIggqkeojEmsEssHhIJGBAHsKPBSlDQIgBMqS7h1AkFjzQigEkD03iKLbf+aNo+u67z4XEW3XPcL4PZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmavWnbrXgdasgff/cHn/vnpXcjIPhgz+n0TGpq/cFmxCwVvTPgfXyO92xP+z1dIbZ1XKLaQ1tqYV7lAUtkhr/YIKT3kNRYdpNPmtY6QTDbitWZI5j5X6COVu1zhFKmscYU5khlxhS2k0uUKx0hlnZX5Z+/du/XgZy45QzJjln5E6UPWZkimx0vFLipvs9ZBKm1e2kVtyGgLqWRjkt9jyTqjPSTzDvkbXrLPyjGSyT79Fi+7y8ozCGmxcgIlEwZnUHLIYAolQwZTKBkwOIeSHoNzKNlmMIWSbQZTKBkyOIWSQwYnUDJh8CeENFg5gpA2KzsQ0mVlE0JGDAoIabFyASFdVk6hIxuzcgAdbzLKISMbsTKDjvuMnkBGc8KoDxkDRjPIuMPar1DRGDMqOlAxYO0pVNxhrcghojFm7TFUPGRt3oGINS7Zg4oea39BRXPCaJFDxU3WDiBjn9EUMhqMFjlk3GD0CDpeZ2UGIT1W9iBkm8EMSgYMnkDJNoM+lPQYQEqXpTmkvMXSBaS8xtI5pNxk6QxSNlg6gZQ2S88gZZ2lY0hpsXQAKWss7UBKg6UtSMlYyqGFJYj55ItLn8PMzMzMTED2/kc55LRGZPENxLQmvPQDtOzzhWITSjYYTKFkn0GRQ0eT0TF0bDCaQkeX0QI6hqzlkDFirQ8ZE9Z2IINLDiBjwtoeZIxZ24GMEWt9yBiy1oGMLqM5dNxgdAYdDUZHEDJgUHQgpM3gKaQM+MIih5TmiM8VuxDT/JL8+2PoyTowMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM3v1/gWXPOuoOu9EhAAAAABJRU5ErkJggg=="
  
  return (
          <div className={cn("space-y-3", className)} {...props}>
            <ContextMenu>
              <ContextMenuTrigger>
                <AspectRatio
                  ratio={aspectRatio}
                  className="overflow-hidden rounded-md"
                  >
                  <Image
                    src={thumbnail}
                    alt={game.title}
                    fill
                    onError={(event => setThumbnail(defaultError))}
                    sizes="auto"
                    className="object-cover bg-primary dark:bg-accent shadow-xl transition-all rounded-md hover:scale-105"
                  />
                </AspectRatio>
              </ContextMenuTrigger>
              <ContextMenuContent className="w-40">
                
                <ContextMenuItem>
                  <PlayCircle className="mr-1 h-4 w-4" /> 
                      Play
                  </ContextMenuItem>
                <ContextMenuSub>
                  <ContextMenuSubTrigger>
                    {game.provider}
                  </ContextMenuSubTrigger>
                  <ContextMenuSubContent className="w-48">
                    <ContextMenuItem disabled>
                      Northplay Link
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Room
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Spectate Random
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem disabled>
                      Join Rooms
                    </ContextMenuItem>
                    {playlists.map((playlist) => (
                      <ContextMenuItem key={playlist}>
                        <PlayCircle className="mr-2 h-4 w-4" />{" "}
                        {playlist}
                      </ContextMenuItem>
                    ))}
                  </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuItem><PlayCircle className="mr-2 h-4 w-4" /> Add to Queue</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem><PinIcon className="mr-2 h-4 w-4" /> Pin Game</ContextMenuItem>
                <ContextMenuItem>Share</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
            <div className="space-y-1 text-sm">
              <p className="font-medium leading-none">
                {game.title}
              </p>
              <p className="text-xs leading-none text-slate-500 dark:text-slate-400">
                {game.provider}
              </p>
            </div>
          </div>
          )
}

