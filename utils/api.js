const URL =
  "https://mec402.boisestate.edu/csclasses/cs402/codesnips/loadjson.php?user=parkerparrish";
const SAVE =
  "https://mec402.boisestate.edu/csclasses/cs402/codesnips/savejson.php?user=parkerparrish";

export async function loadAll() {
  const r = await fetch(URL);
  if (r.status === 404) return { accounts: [], items: [] };
  const data = await r.json();
  return Array.isArray(data)
    ? { accounts: [], items: data } // old shape fallback
    : data;
}

export async function saveAll(obj) {
  await fetch(SAVE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
}
