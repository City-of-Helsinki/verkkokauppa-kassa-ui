export function requiredEnv(env: string) {
  throw new TypeError(`The ${env} environment variable is strictly required.`);
}