import "dotenv/config";

async function main() {
  console.log("=== Precompute Cyanite Curves ===");
  console.log("This script would enqueue all fixture tracks to Cyanite and poll for their audio analysis.");
  console.log("It then saves the 15s interval curves to fixtures/curves/.");
  console.log("Currently skipped because FEATURE_CYANITE_SOUND_CURVE is off by default.");
}

main().catch(console.error);
