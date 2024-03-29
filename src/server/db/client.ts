import { SupabaseClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";
import { env } from "../../env/server.mjs";
import { env as clientEnv } from "../../env/client.mjs";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
  // eslint-disable-next-line no-var
  var supabase: SupabaseClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export const supabase = new SupabaseClient(
  clientEnv.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_KEY,
  {
    auth: {
      persistSession: false,
    }
  }
);
