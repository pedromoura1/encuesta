import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://xlzpahhmjyxyhaqkvlor.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsenBhaGhtanl4eWhhcWt2bG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MDMxOTAsImV4cCI6MjA2NDQ3OTE5MH0.Q5UMTDqNhjMd3wnbz0jycNMM-st9MHiVfConKYOxduI"
);

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from("counter")
    .select("value")
    .eq("id", 1)
    .single();

  if (error || !data) {
    return res.status(500).json({ error: "Error leyendo contador" });
  }

  const current = data.value;
  const next = current + 1;

  const { error: updateError } = await supabase
    .from("counter")
    .update({ value: next })
    .eq("id", 1);

  if (updateError) {
    return res.status(500).json({ error: "Error actualizando contador" });
  }

  const redirectUrl =
    next % 2 === 0
      ? "https://forms.gle/btPCRvguFrNNcQ9B8"
      : "https://forms.gle/L2a3sZHBHtzVDZuL7";

  return res.redirect(302, redirectUrl);
}
