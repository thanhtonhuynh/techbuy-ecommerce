import { getIp } from "./get-ip";

interface RateLimiter {
  count: number;
  lastReset: number;
}

const trackers: Record<string, RateLimiter> = {};

const PRUNE_INTERVAL = 1000 * 60 * 60; // 1 hour

setInterval(() => {
  const now = Date.now();

  for (const key in trackers) {
    if (trackers[key].lastReset < now) {
      delete trackers[key];
    }
  }
}, PRUNE_INTERVAL);

interface RateLimitOptions {
  key: string;
  limit: number;
  interval: number;
}

export async function rateLimitByIp({
  key,
  limit,
  interval,
}: RateLimitOptions) {
  const ip = await getIp();

  if (!ip) {
    return false;
  }

  return await rateLimitByKey({ key: `${ip}:${key}`, limit, interval });
}

export async function rateLimitByKey({
  key,
  limit,
  interval,
}: RateLimitOptions) {
  const tracker = trackers[key] || { count: 0, lastReset: 0 };

  if (!trackers[key]) {
    trackers[key] = tracker;
  }

  if (tracker.lastReset < Date.now()) {
    tracker.count = 0;
    tracker.lastReset = Date.now() + interval;
  }

  tracker.count++;

  if (tracker.count > limit) {
    return false;
  }

  return true;
}

export async function authenticatedRateLimit(userId: string) {
  return await rateLimitByKey({
    key: `${userId}-global`,
    limit: 10,
    interval: 10000,
  });
}

export async function unauthenticatedRateLimit() {
  return await rateLimitByKey({
    key: "unauthenticated-global",
    limit: 10,
    interval: 10000,
  });
}
