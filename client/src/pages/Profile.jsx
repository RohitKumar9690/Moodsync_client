import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, logoutUser, updateUser } from '../hooks/userhook';
import { useNavigate } from 'react-router-dom';
import { showSuccess } from '../utils/toast';

const Profile = () => {
  const emojis = {
    1: "😭", 2: "😢", 3: "😔", 4: "😟", 5: "🙂",
    6: "😊", 7: "😄", 8: "😁", 9: "😆", 10: "🤩"
  };

  const user = useSelector((state) => state.user.authUser);
  const moods = useSelector((state) => state.mood.moods);
  const [editName, setEditName] = useState(user?.name || "");

  const dispatch = useDispatch();

  const recentMood = moods?.length ? moods[moods.length - 1] : null;

  const HandleLogout = () => {
    if (user?.id) {
      dispatch(logoutUser());
      localStorage.removeItem("authUser");
      localStorage.removeItem("access_token");
      showSuccess("Logout successful!");
      window.location.href = "/login";
    }
  };


const handleDelete = () => {
  if (window.confirm("Are you sure you want to delete your account?")) {
    dispatch(deleteUser(user.id)).then(() => {
      dispatch(logoutUser());
      localStorage.removeItem("authUser");
      localStorage.removeItem("access_token");
      window.location.href = "/signup";
    });
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500/20 via-purple-600/10 to-pink-500/10 px-4">
      <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-sm p-8 text-white transition-all hover:scale-[1.015] duration-300">
        <div className="flex flex-col items-center">
          <img
            src="https://th.bing.com/th/id/OIP.i8-_WwUfKuCcNLNZZia49wHaHa?w=300"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white/40 shadow-md object-cover mb-4"
          />
          <h2 className="text-2xl font-bold drop-shadow">{user?.name}</h2>
          <p className="text-sm text-white/70 mt-1">
            {recentMood ? (
              <>
                {emojis[recentMood.mood_level]} {recentMood.note || recentMood.mood_type}
              </>
            ) : (
              "No mood tracked yet"
            )}
          </p>
        </div>

        <div className="mt-6 text-left">
          <h3 className="text-lg font-semibold mb-2">🧠 About Me</h3>
          <p className="text-sm text-white/80 leading-relaxed">
            I’m here to track moods, stay mindful, and grow emotionally stronger.
            Let’s vibe high and stress low! ✨
          </p>
        </div>

<div className='mt-6'>
  <button
    onClick={handleDelete}
    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
  >
    Delete Account
  </button>
</div>

        <div className="mt-8">
          <button
            onClick={HandleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-pink-500 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 512 512" fill="currentColor">
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
