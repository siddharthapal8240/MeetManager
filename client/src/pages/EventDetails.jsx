import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, Users, Video, Link as LinkIcon, FileText, Edit, Share2, Brain, X } from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiChat, setAiChat] = useState([
    { role: 'assistant', content: 'Hi! I can help you with information about this meeting. What would you like to know?' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  // Mock event data (replace with actual data fetching)
  const event = {
    title: 'Team Weekly Sync',
    description: 'Weekly team sync to discuss project progress and upcoming tasks.',
    date: '2024-03-20',
    time: '10:00 AM',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    banner: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
    registrationLink: 'https://meetmanager.com/register/abc123',
    isPast: true, // Add this to determine if it's a past meeting
    attendees: [
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'confirmed' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'pending' },
    ],
    recordings: [
      { id: 1, date: '2024-03-13', duration: '45 minutes', transcript: true },
    ],
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setAiChat([...aiChat, { role: 'user', content: newMessage }]);
    // Simulate AI response
    setTimeout(() => {
      setAiChat(prev => [...prev, {
        role: 'assistant',
        content: 'Based on the meeting recording and transcript, here are the key points discussed:\n\n1. Project timeline updates\n2. Resource allocation\n3. Next sprint planning\n\nWould you like more details about any of these topics?'
      }]);
    }, 1000);
    setNewMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {event.banner && (
          <div className="w-full h-48 md:h-64 relative">
            <img
              src={event.banner}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">{event.title}</h1>
            {!event.isPast && (
              <div className="flex flex-wrap gap-2">
                <button
                  className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Event
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(event.registrationLink);
                    toast.success('Registration link copied!');
                  }}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
              </div>
            )}
          </div>

          <p className="text-gray-600 mb-6">{event.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="h-5 w-5 text-gray-400" />
              <span>{event.time}</span>
            </div>
            {!event.isPast && (
              <>
                <div className="flex items-center space-x-3">
                  <Video className="h-5 w-5 text-gray-400" />
                  <a href={event.meetLink} className="text-indigo-600 hover:text-indigo-700">
                    Join Meeting
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(event.meetLink);
                      toast.success('Meeting link copied!');
                    }}
                    className="text-indigo-600 hover:text-indigo-700"
                  >
                    Copy Meeting Link
                  </button>
                </div>
              </>
            )}
          </div>

          {event.isPast ? (
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Meeting Resources</h2>
                <button
                  onClick={() => setShowAIModal(true)}
                  className="flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  AI Assistant
                </button>
              </div>
              <div className="space-y-4">
                {event.recordings.map((recording) => (
                  <div
                    key={recording.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">Meeting Recording</p>
                        <p className="text-sm text-gray-500">
                          {recording.date} • {recording.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                        Download
                      </button>
                      {recording.transcript && (
                        <button className="px-3 py-1 text-sm text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50">
                          View Summary
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Registered Attendees</h2>
              <div className="space-y-4">
                {event.attendees.map((attendee) => (
                  <div
                    key={attendee.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{attendee.name}</p>
                      <p className="text-sm text-gray-500">{attendee.email}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        attendee.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {attendee.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Assistant Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Brain className="h-6 w-6 text-indigo-600" />
                <h3 className="text-xl font-semibold">AI Meeting Assistant</h3>
              </div>
              <button
                onClick={() => setShowAIModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {aiChat.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask about the meeting..."
                  className="flex-1 px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;