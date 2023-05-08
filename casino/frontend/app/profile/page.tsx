import Image from "next/image"
import Link from "next/link"
import * as React from 'react';

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { buttonVariants } from "@/components/ui/button"
import { StyleSwitcher } from "@/components/style-switcher"
import { AuthProfile } from "@/components/casino/auth-profile"


export default function IndexPage() {
  
  return (
    <div className="container relative pb-10">
    <StyleSwitcher />
    <section className="pb-8 md:pb-10">
      <div className="flex w-full items-center justify-center">
        <div className="flex space-x-4">
          <AuthProfile />
        </div>
      </div>
    </section>   
     </div>
  )
}



