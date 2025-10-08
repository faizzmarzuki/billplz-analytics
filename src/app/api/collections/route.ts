export async function GET() {
  const apiUrl = process.env.NEXT_MOCK_API_URL;
  const response = await fetch(`${apiUrl}/collections`);
  const data = await response.json();
  return new Response(JSON.stringify(data));
}