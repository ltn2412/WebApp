'use client'
import { useState } from "react";
import { PlusCircle } from "lucide-react";

function AvatarUploader() {
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please choose image");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-md bg-background flex justify-center items-center">
      <div className="relative w-24 h-24 border-2 border-gray-300 rounded-full flex items-center justify-center cursor-pointer overflow-hidden">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {avatarPreview ? (
          <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover rounded-full" />
        ) : (
          <PlusCircle className="w-10 h-10 text-gray-400" />
        )}
      </div>
    </div>
  );
}

export default AvatarUploader;
