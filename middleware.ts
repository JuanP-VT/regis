/*
Function extracted from official vercel docs example
https://vercel.com/guides/rate-limiting-edge-middleware-vercel-kv#step-3-adding-@upstash/ratelimit
This middleware uses vercel KV (redis database) to limit the number of requests.
 */
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

const ratelimit = new Ratelimit({
  redis: kv,
  // 5 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(5, "10 s"),
});

// Define which routes you want to rate limit
export const config = {
  matcher: "/api/test",
};

export default async function middleware(request: NextRequest) {
  // You could alternatively limit based on user ID or similar
  const ip = request.ip ?? "127.0.0.1";
  const { success, pending, limit, reset, remaining } =
    await ratelimit.limit(ip);
  return success
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/blocked", request.url));
}
