/**
 * Simple RAG - embed knowledge chunks, retrieve by similarity
 * Uses OpenAI embeddings + cosine similarity (in-memory)
 */

import { KNOWLEDGE_DOCS } from "./knowledge";

export type RagChunk = { id: string; content: string; embedding?: number[] };

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dot = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

export async function embedText(text: string): Promise<number[]> {
  const { default: OpenAI } = await import("openai");
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY not set");
  const openai = new OpenAI({ apiKey: key });
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text.slice(0, 8000),
  });
  return res.data[0].embedding;
}

export async function embedKnowledge(): Promise<RagChunk[]> {
  const chunks: RagChunk[] = [];
  for (const doc of KNOWLEDGE_DOCS) {
    const embedding = await embedText(doc.content);
    chunks.push({ id: doc.id, content: doc.content, embedding });
  }
  return chunks;
}

export async function retrieve(
  query: string,
  chunks: RagChunk[],
  topK = 3
): Promise<{ content: string; score: number }[]> {
  const queryEmbedding = await embedText(query);
  const scored = chunks.map((c) => ({
    content: c.content,
    score: c.embedding
      ? cosineSimilarity(queryEmbedding, c.embedding)
      : 0,
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

// Pre-embedded cache to avoid repeated API calls (server-side)
let cachedChunks: RagChunk[] | null = null;

export async function getEmbeddedChunks(): Promise<RagChunk[]> {
  if (cachedChunks) return cachedChunks;
  cachedChunks = await embedKnowledge();
  return cachedChunks;
}
