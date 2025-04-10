'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-32 h-32">
            <Image
              src="/images/policeimg.png"
              alt="Police Shield"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Access Denied</h1>
          <div className="w-16 h-1 bg-red-500 rounded"></div>
          <p className="text-gray-600 text-lg text-center">
            You do not have permission to view this page.
          </p>
          <p className="text-gray-500 text-sm text-center">
            Please contact your administrator if you believe this is a mistake.
          </p>
          <p className="text-gray-600 text-base text-center">
            Please login through your account to access this page
          </p>
          <div className="flex flex-col space-y-4 w-full">
            <button 
              onClick={() => router.push('/login')} 
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Login
            </button>
            <button 
              onClick={() => window.history.back()} 
              className="px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
