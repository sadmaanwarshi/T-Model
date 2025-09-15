import { useState, useEffect } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setUser);
  }, []);

  const handleUpdate = async e => {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/auth/me', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ industry_type: user.industry_type }),
    });
    const updated = await res.json();
    setUser(updated);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <select
        value={user.industry_type}
        onChange={e => setUser({ ...user, industry_type: e.target.value })}
      >
        <option value="tour">Tour</option>
        <option value="travel">Travel</option>
        <option value="logistics">Logistics</option>
        <option value="others">Others</option>
      </select>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
