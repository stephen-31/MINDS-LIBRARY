import { useState } from 'react';

export default function AddStudentForm({ onSuccess }) {
  // Updated state to match your new requirements
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    hostelNumber: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          grade: formData.grade.trim(),
          hostelNumber: formData.hostelNumber.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to add student');

      setMessage({ type: 'success', text: 'Student added successfully!' });
      
      // Reset form with new keys
      setFormData({ name: '', grade: '', hostelNumber: '' });
      
      onSuccess?.();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Add Student</h2>
      <p className="section-desc">Register students by their grade and hostel.</p>

      {message && (
        <div className={`alert alert-${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
            required
            placeholder="e.g. John Doe"
          />
        </div>

        {/* Grade Field */}
        <div className="form-group">
          <label htmlFor="grade">Student Grade</label>
          <input
            id="grade"
            type="text"
            value={formData.grade}
            onChange={(e) => setFormData((f) => ({ ...f, grade: e.target.value }))}
            required
            placeholder="e.g. Grade 10"
          />
        </div>

        {/* Hostel Number Field */}
        <div className="form-group">
          <label htmlFor="hostelNumber">Hostel Number</label>
          <input
            id="hostelNumber"
            type="text"
            value={formData.hostelNumber}
            onChange={(e) => setFormData((f) => ({ ...f, hostelNumber: e.target.value }))}
            required
            placeholder="e.g. H-102"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Adding...' : 'Add Student'}
        </button>
      </form>
    </section>
  );
}