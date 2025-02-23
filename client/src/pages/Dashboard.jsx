import React, { useState, useEffect } from 'react';
import { Calendar, Users, Video, Clock, History, FileText, Download, X, Brain } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showRecordingModal, setShowRecordingModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showAttendeeModal, setShowAttendeeModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [pastMeetings, setPastMeetings] = useState([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiChat, setAIChat] = useState([{ role: 'assistant', content: 'Hello! How can I assist you with this meeting?' }]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false); // For typing animation

  const hardcodedUpcomingMeetings = [
    {
      id: 1,
      title: 'Team Weekly Sync',
      date: '2025-03-20',
      time: '10:00 AM',
      attendees: 12,
      registered: 15,
      confirmed: 12
    },
    {
      id: 2,
      title: 'Project Review',
      date: '2025-03-21',
      time: '2:00 PM',
      attendees: 8,
      registered: 10,
      confirmed: 8
    }
  ];

  useEffect(() => {
    const fetchPastMeetings = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:4000/api/events/past');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch past meetings');
        }

        const formattedMeetings = data.map(event => ({
          id: event._id,
          title: event.eventName,
          date: new Date(event.date).toISOString().split('T')[0],
          duration: event.duration || 'Unknown',
          attendees: event.attendeeDetails?.joined?.length || 0,
          recording: event.meetingRecording,
          summary: event.transcription?.summary || 'No summary available',
          attendeeDetails: event.attendeeDetails || null
        }));

        setPastMeetings(formattedMeetings);
      } catch (error) {
        toast.error('Failed to load past meetings');
        console.error('Error fetching past meetings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (activeTab === 'past') {
      fetchPastMeetings();
    } else {
      setUpcomingMeetings(hardcodedUpcomingMeetings);
    }
  }, [activeTab]);

  const handleRecordingClick = (meeting) => {
    setSelectedMeeting(meeting);
    setShowRecordingModal(true);
  };

  const handleSummaryClick = (meeting) => {
    setSelectedMeeting(meeting);
    setShowSummaryModal(true);
  };

  const handleAttendeeClick = (meeting) => {
    setSelectedMeeting(meeting);
    setShowAttendeeModal(true);
  };

  const handleAIClick = (meeting) => {
    setSelectedMeeting(meeting);
    setAIChat([{ role: 'assistant', content: 'Hello! How can I assist you with this meeting?' }]);
    setShowAIModal(true);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedMeeting) return;

    const userMessage = { role: 'user', content: newMessage };
    setAIChat(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true); // Start typing animation

    try {
      const response = await fetch('http://localhost:4000/api/events/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: selectedMeeting.summary,
          question: newMessage
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to get AI response');
      }

      setIsTyping(false); // Stop typing animation
      const aiMessage = { role: 'assistant', content: data.response };
      setAIChat(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling AI chat endpoint:', error);
      toast.error('Failed to get AI response');
      setIsTyping(false); // Stop typing animation
      setTimeout(() => {
        setAIChat(prev => [...prev, { role: 'assistant', content: 'Sorry, I couldn’t find an answer to that. Please try again!' }]);
      }, 1000); // Delay fallback message to simulate typing
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Meetings</p>
                <p className="text-2xl font-bold">{upcomingMeetings.length + pastMeetings.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Attendees</p>
                <p className="text-2xl font-bold">
                  {pastMeetings.reduce((sum, m) => sum + (m.attendees || 0), 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Hours Recorded</p>
                <p className="text-2xl font-bold">N/A</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b">
            <div className="flex">
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'upcoming'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming Meetings
              </button>
              <button
                className={`px-6 py-3 font-medium ${
                  activeTab === 'past'
                    ? 'border-b-2 border-indigo-600 text-indigo-600'
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('past')}
              >
                Past Meetings
              </button>
            </div>
          </div>

          <div className="p-6">
            {isLoading && activeTab === 'past' ? (
              <div className="text-center py-8 text-gray-500">Loading past meetings...</div>
            ) : activeTab === 'upcoming' ? (
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-8 w-8 text-indigo-600" />
                      <div>
                        <h3 className="font-medium">{meeting.title}</h3>
                        <p className="text-sm text-gray-500">
                          {meeting.date} at {meeting.time}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 mt-4 md:mt-0">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {meeting.registered} registered ({meeting.confirmed} confirmed)
                        </span>
                      </div>
                      <button
                        onClick={() => handleAttendeeClick(meeting)}
                        className="text-indigo-600 hover:text-indigo-700 font-medium"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {pastMeetings.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">No past meetings found.</div>
                ) : (
                  pastMeetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="flex flex-col p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <History className="h-8 w-8 text-gray-600 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">{meeting.title}</h3>
                          <p className="text-sm text-gray-500">
                            {meeting.date} • {meeting.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center space-x-2">
                          <Users className="h-5 w-5 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {meeting.attendees} attended
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {meeting.recording && (
                            <button
                              onClick={() => handleRecordingClick(meeting)}
                              className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                              <Video className="h-4 w-4" />
                              <span>Recording</span>
                            </button>
                          )}
                          {meeting.summary && (
                            <button
                              onClick={() => handleSummaryClick(meeting)}
                              className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                              <FileText className="h-4 w-4" />
                              <span>Report</span>
                            </button>
                          )}
                          <button
                            onClick={() => handleAttendeeClick(meeting)}
                            className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                          >
                            <Users className="h-4 w-4" />
                            <span>Attendees</span>
                          </button>
                          {meeting.summary && (
                            <button
                              onClick={() => handleAIClick(meeting)}
                              className="flex items-center space-x-1 px-3 py-1.5 rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                            >
                              <Brain className="h-4 w-4" />
                              <span>AI Chat</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showRecordingModal && selectedMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900">Meeting Recording: {selectedMeeting.title}</h3>
              <button
                onClick={() => setShowRecordingModal(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-4">
              <video controls className="w-full rounded-lg">
                <source src={selectedMeeting.recording} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="flex justify-end">
              <a
                href={selectedMeeting.recording}
                download
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download Recording</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Updated Report Modal */}
      {showSummaryModal && selectedMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Meeting Report</h3>
              <button
                onClick={() => setShowSummaryModal(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{selectedMeeting.title}</h4>
                <p className="text-gray-600 leading-relaxed">{selectedMeeting.summary}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  const blob = new Blob([selectedMeeting.summary], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${selectedMeeting.title}-report.md`;
                  a.click();
                }}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showAttendeeModal && selectedMeeting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Attendee Details</h3>
              <button
                onClick={() => setShowAttendeeModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {selectedMeeting.attendeeDetails ? (
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-lg mb-2">Joined Participants</h4>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Leave Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedMeeting.attendeeDetails.joined.map((attendee, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{attendee.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{attendee.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{attendee.joinTime || 'N/A'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{attendee.leaveTime || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-2">Registered but Not Joined</h4>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedMeeting.attendeeDetails.notJoined.map((attendee, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{attendee.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{attendee.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-red-600">{attendee.status || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No attendee details available for this meeting.
              </div>
            )}
          </div>
        </div>
      )}

      {showAIModal && selectedMeeting && (
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
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
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

export default Dashboard;