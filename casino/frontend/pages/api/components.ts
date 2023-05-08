import { NextApiRequest, NextApiResponse } from "next"
import { ImageResponse } from "next/server";

export const runtime = "edge";
export const alt = "Precedent - Building blocks for your Next.js project";
export const contentType = "image/png";
import { OpenGraphImage } from "@/components/opengraph"
import style from "styled-jsx/style";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    return new ImageResponse(
    element: ReactElement,
    options: {
      width?: number = 1200
      height?: number = 630
      emoji?: 'twemoji' | 'blobmoji' | 'noto' | 'openmoji' = 'twemoji',
      fonts?: {
        name: string,
        data: ArrayBuffer,
        weight: number,
        style: 'normal' | 'italic'
      }[]
      debug?: boolean = false

      // Options that will be passed to the HTTP response
      status?: number = 200
      statusText?: string
      headers?: Record<string, string>
    },
  );
}
