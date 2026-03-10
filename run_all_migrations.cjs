const pg = require('pg');
const fs = require('fs');
const path = require('path');

const client = new pg.Client({
  host: 'db.cweogtaoetfbttzrmfsk.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: process.env.SUPABASE_DB_PASSWORD,
  ssl: { rejectUnauthorized: false },
});

const DIR = path.join('/home/henriquesantos/Documentos/projetos/axionos/supabase/migrations');

async function run() {
  await client.connect();
  console.log('Connected OK');

  const files = fs.readdirSync(DIR).filter(f => f.endsWith('.sql')).sort();
  console.log('Total migrations:', files.length);

  let ok = 0, skip = 0, err = 0;
  for (const file of files) {
    const sql = fs.readFileSync(path.join(DIR, file), 'utf-8').trim();
    if (!sql) { skip++; continue; }
    try {
      await client.query(sql);
      ok++;
      if (ok % 10 === 0) console.log('  OK ' + ok + '/' + files.length);
    } catch(e) {
      const msg = e.message || '';
      if (msg.includes('already exists') || msg.includes('duplicate')) {
        ok++;
      } else {
        err++;
        console.error('ERR ' + file.substring(0,25) + ': ' + msg.substring(0,150));
      }
    }
  }

  console.log('\nRESULT: ' + ok + ' ok, ' + skip + ' skip, ' + err + ' errors / ' + files.length + ' total');
  await client.end();
}

run().catch(e => { console.error('FATAL:', e.message); process.exit(1); });
