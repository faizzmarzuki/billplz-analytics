const apiUrl = process.env.NEXT_MOCK_UP_URL;

export async function GET() {
  const response = await fetch(`${apiUrl}/transactions`);
  const data = await response.json();
  return new Response(JSON.stringify(data));
}
