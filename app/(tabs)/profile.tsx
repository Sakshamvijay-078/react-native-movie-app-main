// import React from "react";
// import { Bell, Settings, Bookmark, LogOut, LogIn } from "lucide-react";

// const profiles = [
//   { id: "1", name: "User 1", avatar: "https://via.placeholder.com/100" },
//   { id: "2", name: "User 2", avatar: "https://via.placeholder.com/100" },
//   { id: "3", name: "User 3", avatar: "https://via.placeholder.com/100" },
//   { id: "4", name: "Kids", avatar: "https://via.placeholder.com/100" },
// ];

// const ProfilePage: React.FC = () => {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-primary text-white">
      
//       {/* Header Icons */}
//       <div className="w-full max-w-3xl flex justify-center items-center p-4">

//         <h1 className="text-2xl font-bold">Who's Watching?</h1>
        
//       </div>
//       {/* Profile Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
//         {profiles.map((profile) => (
//           <div key={profile.id} className="flex flex-col items-center">
//             <img
//               src={profile.avatar}
//               alt={profile.name}
//               className="w-24 h-24 rounded-lg border-2 border-gray-500 hover:border-white transition-all duration-300"
//             />
//             <p className="mt-2 text-lg">{profile.name}</p>
//           </div>
//         ))}
//       </div>

//       {/* Options Section */}
//       <div className="mt-8 flex gap-6">
//         <button className="flex items-center gap-2 text-gray-400 hover:text-white">
//         <LogIn className="text-gray-400 hover:text-white cursor-pointer" size={24} /> Login
//         </button>
//         <button className="flex items-center gap-2 text-gray-400 hover:text-white">
//           <Bell size={20} /> Notificaion
//         </button>
//         <button className="flex items-center gap-2 text-gray-400 hover:text-white">
//           <Bookmark size={20} /> Saved
//         </button>
//         <button className="flex items-center gap-2 text-gray-400 hover:text-white">
//           <Settings size={20} /> Settings
//         </button>
//         <button className="flex items-center gap-2 text-red-500 hover:text-red-700">
//           <LogOut size={20} /> Logout
//         </button>
//       </div>

//     </div>
//   );
// };

// export default ProfilePage;
