import Image from "next/image"
import Link from "next/link"
import * as React from 'react';
import { cn } from "@/lib/utils"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { buttonVariants } from "@/components/ui/button"
import { StyleSwitcher } from "@/components/style-switcher"
import { GameRow } from "@/components/casino/game-row"
import { gameRows } from "@/config/site"

import GameRowsWrapper from "@/components/casino/game-row-page-wrapper"


export default function IndexPage() {
  
  return (
    <div className="container relative pb-10">
    <StyleSwitcher />
    <PageHeader>
      <PageHeaderHeading>Development</PageHeaderHeading>
      <PageHeaderDescription>
         Login and get play balance.
      </PageHeaderDescription>
    </PageHeader>
    <section className="pb-8 md:pb-10">
      <div className="flex w-full items-center justify-between">
        <div className="flex space-x-4">
          <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
        </div>
      </div>
    </section>   
    <section className="flex w-full items-center gap-6 pt-6 pb-8 md:py-10">
<GameRowsWrapper />
        
      </section>
     </div>
  )
}



