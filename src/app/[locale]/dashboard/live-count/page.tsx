"use client"
import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [counts, setCounts] = useState({
    two_wheeler_count: 0,
    four_wheeler_count: 0
  });
  const [editCounts, setEditCounts] = useState({
    two_wheeler_count: 0,
    four_wheeler_count: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoKey, setVideoKey] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [linePosition, setLinePosition] = useState(70);
  const [forceRefresh, setForceRefresh] = useState(0);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    // Fetch initial line position
    fetch('http://localhost:5000/get_line_position')
      .then(response => response.json())
      .then(data => setLinePosition(data.line_position_percent))
      .catch(error => console.error('Error fetching line position:', error));

    return () => clearInterval(timeInterval);
  }, []);

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        fetch('http://localhost:5000/counts')
          .then(response => response.json())
          .then(data => setCounts(data))
          .catch(error => console.error('Error fetching counts:', error));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const handleStart = () => {
    fetch('http://localhost:5000/start')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'started') {
          setIsProcessing(true);
          // Generate a completely new key to force video reload
          setVideoKey(Date.now());
        }
      })
      .catch(error => console.error('Error starting processing:', error));
  };

  const handleStop = () => {
    fetch('http://localhost:5000/stop')
      .then(response => response.json())
      .then(data => {
        if (data.status === 'stopped') {
          setIsProcessing(false);
        }
      })
      .catch(error => console.error('Error stopping processing:', error));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCounts({
      ...editCounts,
      [name]: parseInt(value) || 0
    });
  };

  const handleLinePositionChange = (e) => {
    const newPosition = parseInt(e.target.value);
    setLinePosition(newPosition);
    
    // Update line position without refreshing video
    fetch('http://localhost:5000/set_line_position', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ position_percent: newPosition })
    })
      .catch(error => console.error('Error updating line position:', error));
  };

  const handleEditSubmit = () => {
      fetch('http://localhost:5000/edit_counts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editCounts)
    })
      .then(response => response.json())
      .then(data => {
        setCounts(data);
        setIsEditing(false);
      })
      .catch(error => console.error('Error updating counts:', error));
  };

  const startEditing = () => {
    setEditCounts({
      two_wheeler_count: counts.two_wheeler_count,
      four_wheeler_count: counts.four_wheeler_count
    });
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md py-4 px-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3">
            <rect x="1" y="3" width="15" height="13"></rect>
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
            <circle cx="5.5" cy="18.5" r="2.5"></circle>
            <circle cx="18.5" cy="18.5" r="2.5"></circle>
          </svg>
          Vehicle Parking System
        </h1>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Panel */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M23 7l-7-5-7 5-7-5v14l7 5 7-5 7 5z"></path>
                    <path d="M9 4v16"></path>
                    <path d="M16 16l-1-1"></path>
                    <path d="M16 11l-1 1"></path>
                  </svg>
                  Vehicle Monitoring
                </h2>
                <div className={`flex items-center text-sm ${isProcessing ? 'text-green-600' : 'text-gray-500'}`}>
                  <span className={`inline-block h-2 w-2 rounded-full mr-2 ${isProcessing ? 'bg-green-600 animate-pulse' : 'bg-gray-400'}`}></span>
                  {isProcessing ? 'Monitoring Active' : 'Monitoring Inactive'}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 p-4">
                {/* Exit Feed */}
                <div className="bg-gray-50 rounded-md overflow-hidden border border-gray-200">
                  <div className="bg-gray-100 p-2 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M17 2l4 4-4 4"></path>
                        <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
                        <path d="M7 22l-4-4 4-4"></path>
                        <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
                      </svg>
                      Exit Monitoring
                    </h3>
                  </div>
                  <div className="aspect-video bg-black relative">
                    {isProcessing ? (
                      <img 
                        key={`exit-${videoKey}`}
                        src={`http://localhost:5000/exit_feed?t=${videoKey}`}
                        alt="Exit video feed"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-40">
                          <polygon points="23 7 16 12 23 17 23 7"></polygon>
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                        </svg>
                        <p className="text-sm">Exit feed inactive</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Entry Feed (Disabled) */}
                <div className="bg-gray-50 rounded-md overflow-hidden border border-gray-200">
                  <div className="bg-gray-100 p-2 border-b border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M7 22l-4-4 4-4"></path>
                        <path d="M21 13v1a4 4 0 0 1-4 4H3"></path>
                        <path d="M17 2l4 4-4 4"></path>
                        <path d="M3 11v-1a4 4 0 0 1 4-4h14"></path>
                      </svg>
                      Entry Monitoring (Disabled)
                    </h3>
                  </div>
                  <div className="aspect-video bg-gray-100 flex flex-col items-center justify-center text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                    </svg>
                    <p className="text-sm font-medium">Entry monitoring unavailable</p>
                    <p className="text-xs mt-1">This feed is currently disabled</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  {currentTime}
                </div>
                <div>
                  {!isProcessing ? (
                    <button 
                      onClick={handleStart} 
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                      </svg>
                      Start Detection
                    </button>
                  ) : (
                    <button 
                      onClick={handleStop} 
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <rect x="9" y="9" width="6" height="6"></rect>
                      </svg>
                      Stop Detection
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Panel */}
          <div className="w-full lg:w-2/5 flex flex-col gap-6">
            {/* Vehicle Count Summary */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Vehicle Count Summary
                </h2>
                {!isEditing ? (
                  <button 
                    onClick={startEditing} 
                    className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit Counts
                  </button>
                ) : (
                  <button 
                    onClick={handleEditSubmit} 
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                      <polyline points="17 21 17 13 7 13 7 21"></polyline>
                      <polyline points="7 3 7 8 15 8"></polyline>
                    </svg>
                    Save Counts
                  </button>
                )}
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Two Wheeler Count */}
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3498db" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                      <path d="M4 16.2v.8m0 0l4 1 8-2V8l-8 2-4-1zm0 0l-2-1"></path>
                      <path d="M12 5.5C13 4 14.5 3 16.5 3C19 3 21 5 21 7.5c0 2-1 4-4.5 6.5-1.5 1-3 1.5-4.5 1.5"></path>
                      <path d="M16 8a1 1 0 100-2 1 1 0 000 2z"></path>
                    </svg>
                    <h3 className="text-blue-800 font-medium text-center mb-2">Two Wheeler Inside</h3>
                    {isEditing ? (
                      <input 
                        type="number" 
                        name="two_wheeler_count"
                        value={editCounts.two_wheeler_count}
                        onChange={handleEditChange}
                        className="block w-24 text-center rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                        min="0"
                      />
                    ) : (
                      <p className="text-3xl font-bold text-blue-600">{counts.two_wheeler_count}</p>
                    )}
                  </div>
                  
                  {/* Four Wheeler Count */}
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2ecc71" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-2">
                      <rect x="1" y="3" width="15" height="13"></rect>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                    <h3 className="text-green-800 font-medium text-center mb-2">Four Wheeler Inside</h3>
                    {isEditing ? (
                      <input 
                        type="number" 
                        name="four_wheeler_count"
                        value={editCounts.four_wheeler_count}
                        onChange={handleEditChange}
                        className="block w-24 text-center rounded-md bg-white border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-lg"
                        min="0"
                      />
                    ) : (
                      <p className="text-3xl font-bold text-green-600">{counts.four_wheeler_count}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* System Information */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  System Information
                </h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="flex items-center text-sm text-gray-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg>
                      Using YOLO v8 for vehicle detection
                    </p>
                    <p className="flex items-center text-sm text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      Real-time tracking with ByteTrack
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center text-sm text-gray-600 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                      Only exit monitoring is currently active
                    </p>
                    <p className="flex items-center text-sm text-red-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2z"></path>
                      </svg>
                      Red line: Vehicle exit counting
                    </p>
                  </div>
                </div>
                
                {/* Line Position */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M18 2h4v4"></path>
                      <path d="M3 10v8a4 4 0 0 0 4 4h12"></path>
                      <path d="M18 13v7"></path>
                      <path d="M21 13H8a4 4 0 0 1-4-4V5"></path>
                      <line x1="2" y1="2" x2="22" y2="22"></line>
                    </svg>
                    Exit Line Position
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <input 
                      type="range" 
                      min="10" 
                      max="90" 
                      value={linePosition} 
                      onChange={handleLinePositionChange}
                      className="w-full md:w-2/3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <span className="text-sm text-gray-600 w-24">{linePosition}% from top</span>
                    <button 
                      onClick={() => window.location.reload()} 
                      className="ml-auto inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M21.5 2v6h-6"></path>
                        <path d="M2.5 22v-6h6"></path>
                        <path d="M22 11.5A10 10 0 0 0 3 9"></path>
                        <path d="M2 13a10 10 0 0 0 19 2.5"></path>
                      </svg>
                      Refresh
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;