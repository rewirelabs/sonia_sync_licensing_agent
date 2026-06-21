import Anthropic from '@anthropic-ai/sdk';

let anthropicClient: Anthropic | null = null;

export function getAnthropicClient() {
  if (!anthropicClient) {
    anthropicClient = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY || 'fake-key-for-fixture-mode',
    });
  }
  return anthropicClient;
}

// Fallback logic if we are in fixture mode and Anthropic isn't available
export function isFableLive() {
  return !!process.env.ANTHROPIC_API_KEY;
}
