import React from 'react';
import { Link } from 'react-router-dom';
import { Video, Users, FileText, Bell, Clock, BarChart, Github, Twitter, Linkedin, Brain, Shield, Zap, Globe, MessageSquare } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-indigo-600" />,
      title: 'Smart Summaries',
      description: 'Get instant AI-powered meeting summaries and action items'
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-600" />,
      title: 'Attendance Tracking',
      description: 'Track attendance and participation in real-time'
    },
    {
      icon: <Bell className="h-8 w-8 text-indigo-600" />,
      title: 'Smart Notifications',
      description: 'Automated reminders and follow-ups for all participants'
    },
    {
      icon: <Clock className="h-8 w-8 text-indigo-600" />,
      title: 'Time Management',
      description: 'Schedule and manage meetings efficiently'
    },
    {
      icon: <Brain className="h-8 w-8 text-indigo-600" />,
      title: 'AI Assistant',
      description: 'Get insights and answers about past meetings'
    },
    {
      icon: <Shield className="h-8 w-8 text-indigo-600" />,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption for all your meetings'
    },
    {
      icon: <Zap className="h-8 w-8 text-indigo-600" />,
      title: 'Quick Setup',
      description: 'Start your first meeting in under 2 minutes'
    },
    {
      icon: <Globe className="h-8 w-8 text-indigo-600" />,
      title: 'Global Access',
      description: 'Connect with team members worldwide'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '0',
      features: [
        { text: '3 meetings per month', available: true },
        { text: 'Basic recording', available: true },
        { text: 'Email notifications', available: true },
        { text: 'Up to 10 participants', available: true },
        { text: '24-hour recording storage', available: true },
        { text: 'Standard support', available: true },
        { text: 'Basic analytics', available: true },
        { text: 'Community access', available: true },
        { text: 'HD recording', available: false },
        { text: 'Custom branding', available: false },
        { text: 'API access', available: false },
        { text: 'Advanced analytics', available: false },
        { text: 'Priority support', available: false },
        { text: 'Custom integrations', available: false }
      ],
      cta: 'Start Free'
    },
    {
      name: 'Silver',
      price: '29',
      features: [
        { text: '20 meetings per month', available: true },
        { text: 'HD recording', available: true },
        { text: 'Custom notifications', available: true },
        { text: 'Up to 50 participants', available: true },
        { text: '7-day recording storage', available: true },
        { text: 'Basic analytics', available: true },
        { text: 'Email support', available: true },
        { text: 'Team collaboration', available: true },
        { text: '4K recording', available: false },
        { text: 'Custom branding', available: false },
        { text: 'API access', available: false },
        { text: 'Advanced analytics', available: false },
        { text: 'Priority support', available: false },
        { text: 'Custom integrations', available: false }
      ],
      cta: 'Get Started',
      popular: true
    },
    {
      name: 'Gold',
      price: '79',
      features: [
        { text: '50 meetings per month', available: true },
        { text: '4K recording', available: true },
        { text: 'Advanced notifications', available: true },
        { text: 'Up to 200 participants', available: true },
        { text: '30-day recording storage', available: true },
        { text: 'Advanced analytics', available: true },
        { text: 'Priority support', available: true },
        { text: 'Custom integrations', available: true },
        { text: 'Unlimited meetings', available: false },
        { text: 'Custom branding', available: false },
        { text: 'API access', available: false },
        { text: 'Unlimited storage', available: false },
        { text: '24/7 dedicated support', available: false },
        { text: 'Enterprise analytics', available: false }
      ],
      cta: 'Get Started'
    },
    {
      name: 'Diamond',
      price: '199',
      features: [
        { text: 'Unlimited meetings', available: true },
        { text: '4K recording', available: true },
        { text: 'Custom branding', available: true },
        { text: 'Unlimited participants', available: true },
        { text: 'Unlimited storage', available: true },
        { text: 'Enterprise analytics', available: true },
        { text: '24/7 dedicated support', available: true },
        { text: 'API access', available: true },
        { text: 'Custom integrations', available: true },
        { text: 'White-label solution', available: true },
        { text: 'Enterprise SSO', available: true },
        { text: 'Custom SLA', available: true },
        { text: 'Dedicated account manager', available: true },
        { text: 'On-premise deployment', available: true }
      ],
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Transform Your Meetings with Smart Management
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Get instant summaries, track attendance, and manage your meetings efficiently.
              Make every meeting count with our comprehensive solution.
            </p>
            <Link
              to="/login"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">10k+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">50k+</div>
              <div className="text-gray-600">Meetings Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Video Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            See MeetManager in Action
          </h2>
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl">
            <div className="aspect-w-16 aspect-h-9">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="https://static.videezy.com/system/resources/previews/000/050/708/original/Marketing_Team_Meeting.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Everything You Need for Efficient Meetings
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Powerful features to make your meetings more productive and meaningful
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Assistant Section */}
      <div className="py-16 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Meet Your AI Meeting Assistant</h2>
              <p className="text-xl mb-6">Get instant insights, summaries, and answers about your past meetings</p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-6 w-6 mt-1" />
                  <div>
                    <h3 className="font-semibold">Natural Conversations</h3>
                    <p className="text-indigo-100">Ask questions about past meetings in natural language</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Brain className="h-6 w-6 mt-1" />
                  <div>
                    <h3 className="font-semibold">Smart Analysis</h3>
                    <p className="text-indigo-100">Get AI-powered insights and recommendations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="h-6 w-6 mt-1" />
                  <div>
                    <h3 className="font-semibold">Instant Summaries</h3>
                    <p className="text-indigo-100">Automatically generate meeting summaries and action items</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <div className="flex items-center space-x-3 mb-4">
                  <Brain className="h-8 w-8 text-indigo-600" />
                  <span className="text-gray-900 font-semibold">AI Assistant</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-gray-700">What were the key decisions from last week's product meeting?</p>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <p className="text-gray-800">Based on the meeting recording, here are the key decisions:</p>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      <li>New feature launch scheduled for Q2</li>
                      <li>Budget increase approved for marketing</li>
                      <li>Team to hire 2 new developers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Select the perfect plan for your meeting management needs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col ${
                  plan.popular ? 'ring-2 ring-indigo-600' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-indigo-600 text-white text-center py-1 text-sm">
                    Most Popular
                  </div>
                )}
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <svg
                          className={`h-5 w-5 ${
                            feature.available ? 'text-green-500' : 'text-gray-300'
                          } mr-2`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className={feature.available ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 border-t bg-gray-50">
                  <button
                    className={`w-full py-2 px-4 rounded-md font-medium ${
                      plan.popular
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Meetings?
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Join thousands of teams who have already improved their meeting efficiency
          </p>
          <Link
            to="/login"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Video className="h-8 w-8 text-indigo-400" />
                <span className="text-xl font-bold">MeetManager</span>
              </div>
              <p className="text-gray-400">
                Making meetings more productive, one click at a time.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 mb-4 md:mb-0">
                © 2024 MeetManager. Developed by DebugDivas. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;