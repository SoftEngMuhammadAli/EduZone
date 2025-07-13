import React from "react";

const UserProfileView = ({ user }) => {
  if (!user)
    return (
      <p className="text-center mt-10 text-gray-500">
        User data not available.
      </p>
    );

  return (
    <>
      <div className="bg-white rounded-xl p-6 shadow-md max-w-3xl mx-auto mt-6">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={
              user.profile_picture_url ||
              "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-500 capitalize">{user.user_type}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-400 mt-1">
              Registered on:{" "}
              {new Date(user.registration_date).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm text-gray-800">
          {user.bio && (
            <div>
              <h3 className="font-semibold text-gray-700 mb-1">Bio</h3>
              <p className="bg-gray-50 p-3 rounded-md">{user.bio}</p>
            </div>
          )}
        </div>
        <button
          onClick={() => alert("This feature is not implemented yet!")}
          className="bg-blue-600 text-white mt-5 px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit Profile
        </button>
      </div>
    </>
  );
};

export default UserProfileView;

// import React, { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../../utils/constants";

// const UserProfileView = ({ user }) => {
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user?.name || "",
//     bio: user?.bio || "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleUpdate = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.put(
//         `${BASE_URL}/api/users/${user._id}`,
//         formData
//       );
//       setMessage("Profile updated successfully.");
//       setEditMode(false);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       setMessage(error.response?.data?.message || "Update failed.");
//     }
//   };

//   if (!user) {
//     return (
//       <p className="text-center mt-10 text-gray-500">
//         User data not available.
//       </p>
//     );
//   }

//   return (
//     <div className="bg-white rounded-xl p-6 shadow-md max-w-3xl mx-auto mt-6">
//       <div className="flex flex-col sm:flex-row items-center gap-6">
//         <img
//           src={
//             user.profile_picture_url ||
//             "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
//           }
//           alt="Profile"
//           className="w-28 h-28 rounded-full border"
//         />
//         <div className="text-center sm:text-left">
//           {editMode ? (
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="text-xl font-semibold border rounded px-2 py-1"
//             />
//           ) : (
//             <h2 className="text-2xl font-semibold">{user.name}</h2>
//           )}
//           <p className="text-gray-500 capitalize">{user.user_type}</p>
//           <p className="text-sm text-gray-600">{user.email}</p>
//           <p className="text-sm text-gray-400 mt-1">
//             Registered on:{" "}
//             {new Date(user.registration_date).toLocaleDateString()}
//           </p>
//         </div>
//       </div>

//       <div className="mt-6 space-y-4 text-sm text-gray-800">
//         <div>
//           <h3 className="font-semibold text-gray-700 mb-1">Bio</h3>
//           {editMode ? (
//             <textarea
//               name="bio"
//               value={formData.bio}
//               onChange={handleChange}
//               className="w-full border rounded-md p-2"
//               rows={4}
//             />
//           ) : (
//             <p className="bg-gray-50 p-3 rounded-md">{user.bio}</p>
//           )}
//         </div>
//       </div>

//       <div className="mt-4 flex gap-4">
//         {editMode ? (
//           <>
//             <button
//               onClick={handleUpdate}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save"}
//             </button>
//             <button
//               onClick={() => setEditMode(false)}
//               className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//           </>
//         ) : (
//           <button
//             onClick={() => setEditMode(true)}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Edit Profile
//           </button>
//         )}
//       </div>

//       {message && <p className="mt-4 text-sm text-green-600">{message}</p>}
//     </div>
//   );
// };

// export default UserProfileView;
