
// Type definitions for Deno APIs
declare namespace Deno {
    export interface Env {
      get(key: string): string | undefined;
      set(key: string, value: string): void;
      toObject(): { [key: string]: string };
    }
    
    export const env: Env;
    
    export interface EdgeRuntime {
      waitUntil(promise: Promise<any>): void;
    }
  }
  
  declare const EdgeRuntime: Deno.EdgeRuntime;