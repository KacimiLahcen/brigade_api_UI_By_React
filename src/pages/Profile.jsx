import React from 'react';

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center space-x-6">
          <img
            src="https://ui-avatars.com/api/?name=John+Doe&background=random"
            alt="Profile Avatar"
            className="w-24 h-24 rounded-full border-4 border-gray-200"
          />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">John Doe</h1>
            <p className="text-gray-500 text-lg">johndoe@example.com</p>
            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              Premium Member
            </span>
          </div>
        </div>

        <div className="mt-10 border-t pt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Orders</h2>
          
          <div className="space-y-4">
            {/* Sample Order Item */}
            <div className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
              <div>
                <p className="font-semibold text-gray-800">Order #10234</p>
                <p className="text-sm text-gray-500">2x Classic Burger, 1x Fries</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-600">.50</p>
                <p className="text-xs text-green-600 font-semibold">Delivered</p>
              </div>
            </div>

            {/* Sample Order Item */}
            <div className="flex justify-between items-center p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition">
              <div>
                <p className="font-semibold text-gray-800">Order #10233</p>
                <p className="text-sm text-gray-500">1x Margherita Pizza</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-blue-600">.00</p>
                <p className="text-xs text-green-600 font-semibold">Delivered</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            Edit Profile
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
