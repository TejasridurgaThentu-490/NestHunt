import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Image from "../assets/Images/Searchicon.png";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(Image);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
  });

  const handleLogout = () => {
    dispatch(signOut());
    navigate("/signin");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="p-5">
      <div className="p-5 flex items-center gap-4">
        <h1 className="text-2xl font-bold">
          Welcome, {currentUser?.username || "User"}!
        </h1>
      </div>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center">Profile</h1>
        <form className="flex flex-col gap-4 mt-4">
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            className="hidden"
            onChange={handleImageChange}
          />
          <img
            src={profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto cursor-pointer"
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            type="text"
            placeholder="Name"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />
          <input
            type="text"
            placeholder="Email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-90">
            Update
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">Delete account</span>
          <span className="text-red-700 cursor-pointer" onClick={handleLogout}>
            Sign Out
          </span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
