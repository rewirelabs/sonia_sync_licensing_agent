const { createClient } = require('@libsql/client');

async function test() {
  try {
    const client = createClient({ url: 'file:./dev.db' });
    const res = await client.execute('SELECT 1');
    console.log("Success:", res);
  } catch (err) {
    console.error("Libsql error:", err);
  }
}

test();
