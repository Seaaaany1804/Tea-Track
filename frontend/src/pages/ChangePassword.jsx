import BgCircle from "../components/bg-circle";

const ChangePassword = () => {
    return (
    <div className="h-screen bg-[#14463A] ">
        <div className="absolute inset-0 overflow-hidden">
          <BgCircle/>
        </div>
        
        {/* Centered Login Card */}
        <div className="h-screen bg-opacity-10 backdrop-filter backdrop-blur-[80px] flex items-center justify-center">
        <div className=" p-8 rounded-lg shadow-md w-full max-w-md bg-[#0D2F26]">
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center">
            Password successfully changed!
          </div>
          
          <h2 className="text-2xl font-bold mb-6 text-center text-white ">Change Password</h2>
  
          {/* Email Form */}
          <div className="space-y-4">
            <div className="mb-4">
              <label className="block text-white  text-md font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border rounded"
              />
            </div>
  
            <button
              className="w-full bg-[#E39E05] text-[#0D2F26]  p-3 rounded transition duration-200 font-semibold"
            >
              Verify Email
            </button>
          </div>
  
          {/* Password Form (can be shown conditionally) */}
          <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
            <div className="mb-4">
              <label className="block text-white text-md font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full p-3 border rounded-lg focus:outline-none"
              />
            </div>
  
            <div className="mb-4">
              <label className="block text-white text-md font-medium mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full p-3 border rounded-lg"
              />
            </div>
  
            <div className="flex gap-3">
              <button
                className="w-1/2 bg-gray-500 text-white p-3 rounded transition duration-200 font-semibold"
              >
                Back
              </button>
              <button
                className="w-1/2 bg-[#E39E05] text-[#0D2F26] p-3 rounded transition duration-200 font-semibold"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  };
  
  export default ChangePassword;