import Anthropic from '@anthropic-ai/sdk';
export const MODEL = 'claude-sonnet-4-20250514';
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
export default anthropic;
