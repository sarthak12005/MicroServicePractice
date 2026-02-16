import CircuitBreaker from 'opossum';

export function createCircuitBreaker<T>(
  action: () => Promise<T>,
  serviceName: string,
) {
  const breaker = new CircuitBreaker(action, {
    timeout: 3000,
    errorThresholdPercentage: 50,
    resetTimeout: 10000,
  });

  breaker.on('open', () =>
    console.warn(`[${serviceName}] Circuit OPEN`),
  );

  breaker.on('halfOpen', () =>
    console.warn(`[${serviceName}] Circuit HALF-OPEN`),
  );

  breaker.on('close', () =>
    console.log(`[${serviceName}] Circuit CLOSED`),
  );

  return breaker;
}
