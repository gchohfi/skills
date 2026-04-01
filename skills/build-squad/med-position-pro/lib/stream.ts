export function createStreamResponse(stream: any): Response {
  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
            controller.enqueue(encoder.encode(`data: ${event.delta.text}\n\n`));
          }
        }
      } catch (error) { controller.error(error); }
      finally { controller.close(); }
    },
  });
  return new Response(readable, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' },
  });
}
