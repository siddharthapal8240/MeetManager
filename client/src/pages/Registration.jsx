import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, Users } from 'lucide-react';

const Registration = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    dietary: [],
    attendance: 'in-person',
    notes: ''
  });

  // Mock event data (replace with actual data fetching)
  const event = {
    title: 'Team Weekly Sync',
    description: 'Weekly team sync to discuss project progress and upcoming tasks.',
    date: '2024-03-20',
    time: '10:00 AM',
    attendees: 12,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration submission
  };

  return (
    <div className="max-w-3xl mx-auto my-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-8 text-white">
          <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
          <p className="text-indigo-100 text-lg">{event.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-indigo-200" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-indigo-200" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-indigo-200" />
              <span>{event.attendees} attendees</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Registration Form</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role/Position</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Department</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="hr">Human Resources</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Attendance Type</label>
              <div className="space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="attendance"
                    value="in-person"
                    checked={formData.attendance === 'in-person'}
                    onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">In Person</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="attendance"
                    value="virtual"
                    checked={formData.attendance === 'virtual'}
                    onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Virtual</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Preferences</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {['Vegetarian', 'Vegan', 'Gluten-free', 'Halal', 'Kosher'].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      value={option.toLowerCase()}
                      checked={formData.dietary.includes(option.toLowerCase())}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFormData({
                          ...formData,
                          dietary: e.target.checked
                            ? [...formData.dietary, value]
                            : formData.dietary.filter((item) => item !== value)
                        });
                      }}
                      className="form-checkbox text-indigo-600"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Any special requirements or questions?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
            >
              Register for Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;