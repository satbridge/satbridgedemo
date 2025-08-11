import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>SAT Bridge AI Demo</h1>
      <textarea
        rows="4"
        style={{ width: '100%' }}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Savolingizni kiriting..."
      />
      <br />
      <button onClick={askAI} disabled={loading} style={{ marginTop: '10px' }}>
        {loading ? 'Yuklanmoqda...' : 'Yuborish'}
      </button>
      {answer && (
        <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
          <strong>AI Javobi:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}
