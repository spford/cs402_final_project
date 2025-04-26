const BASE_URL =
  "https://mec402.boisestate.edu/csclasses/cs402/codesnips"; // change if needed

export async function loadItems(user) {
  const r = await fetch(`${BASE_URL}/loadjson.php?user=${user}`);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  return await r.json();
}

export async function saveItems(user, items) {
  await fetch(`${BASE_URL}/savejson.php?user=${user}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(items),
  });
}
