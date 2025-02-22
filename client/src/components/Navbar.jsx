import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Video, Calendar, LogIn } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {

  const {openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  // const location = useLocation();
  // const isLandingPage = location.pathname === '/';
  // const isLoggedIn = location.pathname !== '/' && location.pathname !== '/login';

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Video className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">MeetManager</span>
          </Link>

          {
            isSignedIn 
            ? <div>
              <UserButton />
            </div>
            :<div className="flex items-center space-x-4">
            <button onClick={() => openSignIn({})}
              className="flex items-center space-x-1 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Get Started
            </button>
        </div>
          }
          
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;