import {revalidateTag} from "next/cache";
import {type NextRequest, NextResponse} from "next/server";
import {parseBody} from "next-sanity/webhook";

/**
 * Called by a Sanity GROQ-powered webhook on create/update/delete of
 * documents. Verifies the webhook signature against SANITY_REVALIDATE_SECRET,
 * then invalidates the cache tag matching the changed document's _type
 * ("episode" or "character"), which regenerates the pages tagged with it.
 */
export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response("Missing SANITY_REVALIDATE_SECRET", {status: 500});
    }

    const {isValidSignature, body} = await parseBody<{_type: string}>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", {status: 401});
    }

    if (!body?._type) {
      return new Response("Bad request: missing _type", {status: 400});
    }

    revalidateTag(body._type);

    return NextResponse.json({revalidated: true, tag: body._type});
  } catch (error) {
    console.error("Error revalidating:", error);
    return new Response("Error revalidating", {status: 500});
  }
}
