// The Funniest Office Joke, Judged Head to Head.
// Entry program: writes one single-line joke about office life to
// /output/entry.txt. Node 22, standard library only, no network, deterministic.
//
// The joke, written for the published judge brief:
//   - a real one-line joke with a setup and a turn, punchline last;
//   - built on something anyone who has worked in an office recognises
//     (being promised a promotion, year after year);
//   - the turn is a misdirection the reader does not see coming: the word
//     "promotion" flips from a career promotion to an email promotion;
//   - it avoids the brief's own three named examples (the meeting that could
//     have been an email, the reply-all, the jamming printer) so it feels new.
import { mkdirSync, writeFileSync } from "node:fs";

const JOKE =
  "Two years of being promised a promotion, and the only one I got came " +
  'from my spam folder \u2014 addressed to "valued customer".';

// The gate in RULES.txt: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space. Enforce the same bounds here so a bad
// joke fails loudly at build time instead of silently scoring 0.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function writeEntry(text: string): void {
  validateEntry(text);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text, "utf8");
}

function main(): void {
  writeEntry(JOKE.trim());
}

main();
