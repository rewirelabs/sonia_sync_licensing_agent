import "dotenv/config";
import { getMusixmatchLyricDoc } from "../src/lib/connectors/musixmatch";
import { flags, isMusixmatchLive } from "../src/lib/config/flags";

async function main() {
  console.log("=== Musixmatch Connector Test ===");
  console.log(`Live Mode: ${isMusixmatchLive()}`);
  
  const testIsrc = "DEUM71501234"; // Rammstein - Du Hast
  console.log(`\nTesting fetch for ISRC: ${testIsrc}`);

  const doc = await getMusixmatchLyricDoc(testIsrc);
  
  if (!doc) {
    console.error("Failed to fetch doc.");
    return;
  }

  console.log("\nSuccess! Document retrieved:");
  console.log(`ISRC: ${doc.isrc}`);
  console.log(`Lines Count: ${doc.lines.length}`);
  if (doc.lines.length > 0) {
    console.log(`First Line: ${doc.lines[0].text} (${doc.lines[0].startMs}ms)`);
  }
  
  if (doc.mood) {
    console.log(`Mood (Valence/Energy): ${doc.mood.valence} / ${doc.mood.energy}`);
  }
}

main().catch(console.error);
