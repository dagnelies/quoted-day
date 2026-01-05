type Runtime = import("@astrojs/cloudflare").Runtime<MyEnv>;

interface MyEnv extends Cloudflare.Env {
  QUOTES: KVNamespace;
}

declare namespace App {
  interface Locals extends Runtime {
    lang: string;
    $t: (key: string) => string;
  }
}