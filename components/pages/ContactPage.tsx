import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      email,
      message,
    };

    try {
      const res = await fetch('https://www.tmshydra.com/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('Chyba pri odoslaní');
      }
    } catch (err) {
      alert('Server error');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      {submitted ? (
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-green-500">
            Správa odoslaná ✅
          </h3>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Napísať znova
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Meno"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border rounded"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded"
          />

          <textarea
            placeholder="Správa"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full p-3 border rounded"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded w-full"
          >
            Odoslať
          </button>

        </form>
      )}
    </div>
  );
}
