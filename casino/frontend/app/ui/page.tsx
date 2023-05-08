import Image from "next/image"
import Link from "next/link"
import * as React from 'react';

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { PromoVideo } from "@/components/promo-video"
import { StyleSwitcher } from "@/components/style-switcher"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


export default function UIPage() {
  
  
  const examples = [
    {
      name: "> Quick Sink",
      href: "/sink",
    },
    {
      name: "> Dashboard / Backoffice UI",
      href: "/dashboard",
    },
  ];
  
  return (
    <div>
    <div className="container relative pb-10">
      <StyleSwitcher />
      <div>
      <h4 className="scroll-m-20 mt-20 text-sm font-medium tracking-widest lg:text-xl">
        UI reference (Development):
      </h4>
      <ScrollArea>
        <div className="mb-4 flex items-center">
          {examples.map((example) => (
            <Link
              href={example.href}
              key={example.href}
              className={cn(
                "flex px-4 font-medium",
                   "text-primary text-underline"
              )}
            >
              {example.name}
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
      </div>
      <small>(so at a later stage with 100s of components can auto generate casino tailwind components with AI like below:)</small>

      <PageHeader>
        <PageHeaderHeading>Play Tocsam Games</PageHeaderHeading>
        <PageHeaderDescription>
         It's always sunny in philidelphia! Let's play some games.
        </PageHeaderDescription>
      </PageHeader>
      <section className="pb-8 md:pb-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex space-x-4">
            <Link href="/docs" className={cn(buttonVariants({ size: "lg" }))}>
              Authenticate
            </Link>
          </div>
        </div>
      </section>
      <section className="hidden md:block">
        <div className="overflow-hidden rounded-lg border bg-background shadow-xl">
              <PromoVideo/>
        </div>
      </section>
      
    </div>
    </div>
  )
}



