const API_BASE = "http://localhost:5000";

export async function sendStreamMessage(role, message, onPartial) {
  const response = await fetch(`${API_BASE}/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ role, message }),
  });

  if (!response.body) {
    throw new Error("No response body");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8"); // ✅ Decode as UTF-8
  let partialText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // Decode chunk properly
    const chunk = decoder.decode(value, { stream: true });
    partialText += chunk; // append
    onPartial(partialText); // send updated text to ChatPage
  }
}
