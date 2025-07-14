import React from 'react';

const Services = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 py-16 px-4">
      <div className="max-w-2xl w-full bg-white/80 rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-4">Our Services</h1>
        <p className="text-lg text-blue-700 mb-2">MedicoPlus Medical Appointment System</p>
        <p className="text-gray-700">
          MedicoPlus offers a seamless and secure platform for booking medical appointments with trusted doctors. Easily browse available specialists, view doctor profiles, and schedule appointments at your convenience. Our system ensures hassle-free appointment management, reminders, and access to your health records—all in one place. Experience smarter healthcare access, personalized for you.
        </p>
      </div>
    </div>
  );
};

export default Services;
