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
import { Gameiframe } from "@/components/casino/game-frame"
import { gameRows } from "@/config/site"

import GameRowsWrapper from "@/components/casino/game-row-page-wrapper"


export default function IndexPage() {
  
  return (
    <div className="container relative pb-10">
    <StyleSwitcher />
    <section className="flex w-full items-center gap-6 pt-6 pb-8 md:py-10">
<Gameiframe />
        
      </section>
     </div>
  )
}



