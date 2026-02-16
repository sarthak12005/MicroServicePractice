import retry from 'async-retry';

export async function withRetry<T>(
  fn: () => Promise<T>,
  serviceName: string,
): Promise<T> {
  return retry(
    async (bail, attempt) => {
      try {
        console.log(`[${serviceName}] Retry attempt ${attempt}`);
        return await fn();
      } catch (err: any) {
        // ❌ Don't retry 4xx
        if (err?.status < 500) {
          bail(err);
          return;
        }
        throw err;
      }
    },
    {
      retries: 3,
      minTimeout: 100,
      maxTimeout: 1000,
      randomize: true,
    },
  );
}
