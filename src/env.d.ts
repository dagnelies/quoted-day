type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {
    // Add binding to KV namespace QUOTES
    runtime: {
      env: {
        QUOTES: KVNamespace;
      }  
    },
    i18n: Record<string, string>;
    $t: (key: string) => string;
  }
}