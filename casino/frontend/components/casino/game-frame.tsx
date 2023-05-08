"use client";

import Head from "next/head"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/auth"
import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { AuthDialog } from "@/components/casino/auth-dialog";

export function Gameiframe() {
    const { user } = useAuth({middleware: 'guest'})
    const [slugId, setSlugId] = useState(null);
    const [loadStatus, setLoadStatus] = useState("Loading..")
    const [initLoad, setInitLoad] = useState(false);
    const [gameDataLoaded, setGameDataLoaded] = useState(false);
    const [gameEntryUrl, setGameEntryUrl] = useState(null)
    const [iframeLoad, setIframeLoad] = useState(false);
    const [loadAuthButtons, setLoadAuthButtons] = useState(false);



    useEffect(() => {
        const params = new URLSearchParams(window.location.search) // id=123
        if(params.get('slug')) {
          setSlugId(params.get('slug')) // 123 
        } else {
          setLoadStatus("Game not specified.");
        }
      }, [])
      
    useEffect(() => {
        if(slugId) {
            if(!initLoad) {
                setInitLoad(true);
                Axios.get('/northplay/casino/auth/start-game?currency=USD&debit_currency=BTC&slug=' + slugId)
                .then(function(response){
                    setGameEntryUrl(response.data.session_url);
                    setIframeLoad(true);
                    setLoadStatus("Loaded");
                })
                .catch(function(error){
                    if(error.response) {
                      if(error.response.statusText) {
                          setLoadStatus(error.response.statusText);
                          if(error.response.status === 401) {
                            if(!user) {
                              setLoadAuthButtons(true);
                              setLoadStatus(null);
                            }
                          }
                      } else {
                        console.log(error);
                        setLoadStatus("An unknown error occured..");
                      }
                    } else {
                      console.log(error);
                      setLoadStatus("An unknown error occured..");
                    }
                });
            }
        }
    }, slugId)

  return (
    <>
      <Head>
        <title>Northplay</title>
        <meta
          name="description"
          content="Northplay Casino, come and play!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section key="game-page-container" className="container grid px-2 py-4 md:py-10 md:px-6">
          <div>
             <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Play Game 
                </h2>
              </div>
            <Separator className="my-4" />
            <div className="flex h-[70vh] max-h-[550px] shrink-0 items-center justify-center rounded-md border border-dashed border-slate-200 dark:border-slate-700">
                
                {iframeLoad ? 
                <iframe className="h-full w-full rounded-md" src={gameEntryUrl}></iframe>
                : 
                <p>{loadStatus}</p>
                }
                {loadAuthButtons ?
                  <AuthDialog />
                :
                <div></div>
                }
            </div>
          </div>
      </section>
    </>
  )
}
