export async function askAI(prompt){
  const key = process.env.REACT_APP_OPENAI_KEY;
  const endpoint = process.env.REACT_APP_OPENAI_ENDPOINT || 'https://api.openai.com/v1/chat/completions';
  const model = process.env.REACT_APP_OPENAI_MODEL || 'gpt-4o-mini';
  if(!key){
    // Fallback mock
    return `Tip: Validate with early customers, and iterate an MVP.\n\nYou asked: "${prompt}"`;
  }
  try{
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify({ model, messages: [{ role:'user', content: prompt }] })
    });
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content || 'No response';
    return content;
  }catch(err){
    console.error('AI error', err);
    return 'AI request failed; using offline tips. Focus on differentiation and customer validation.';
  }
}
