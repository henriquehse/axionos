import { createClient } from "@supabase/supabase-js";

async function run() {
  const supabaseUrl = "https://cweogtaoetfbttzrmfsk.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3ZW9ndGFvZXRmYnR0enJtZnNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2OTQ1NTksImV4cCI6MjA4NzI3MDU1OX0.cBqXQTnr4oDj4q5g5K0A5I-zl8nnqxDOfBJTp60_tKw";
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log("Logging in...");
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "henriquehse2015@gmail.com",
    password: "AxionOS2026!",
  });

  if (error) {
    console.error("Login failed:", error.message);
    return;
  }

  const token = data.session.access_token;
  console.log("Logged in. Calling edge function...");

  try {
    const res = await fetch(`${supabaseUrl}/functions/v1/generate-initiative-blueprint`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idea: "Landing Page de Marketing Digital" }),
    });

    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response:", text);
  } catch (e) {
    console.error("Fetch failed:", e);
  }
}

run();
