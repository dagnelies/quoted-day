type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {
    // Add binding to KV namespace QUOTES
    runtime: {
      env: {
        QUOTES: KVNamespace;
      }  
    }
  }
}