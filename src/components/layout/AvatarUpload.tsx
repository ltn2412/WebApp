import { useState, useRef } from "react";
import Cropper from "react-easy-crop";

const AvatarUpload = ({ onSkip, onSend }) => {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.5);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const cropperRef = useRef<any>(null); // Lưu reference của cropper

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const getCroppedImage = async () => {
    if (!image || !cropperRef.current) return;

    const canvas = document.createElement("canvas");
    const imageElement = new Image();
    imageElement.src = image;

    await new Promise((resolve) => (imageElement.onload = resolve));

    const ctx = canvas.getContext("2d");
    const size = 300; // Kích thước đầu ra
    canvas.width = size;
    canvas.height = size;

    if (ctx) {
      ctx.drawImage(
        imageElement,
        crop.x,
        crop.y,
        imageElement.width * zoom,
        imageElement.height * zoom,
        0,
        0,
        size,
        size
      );
    }

    return new Promise<File | null>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(new File([blob], "cropped-avatar.jpg", { type: "image/jpeg" }));
        } else {
          resolve(null);
        }
      }, "image/jpeg");
    });
  };

  const handleSend = async () => {
    const cropped = await getCroppedImage();
    if (!cropped) return;

    const formData = new FormData();
    formData.append("avatar", cropped);
    console.log(formData)
    // try {
    //   const response = await fetch("/api/upload-avatar", {
    //     method: "POST",
    //     body: formData,
    //   });
    //
    //   if (response.ok) {
    //     console.log("Upload thành công!");
    //     onSend?.();
    //   } else {
    //     console.error("Upload thất bại");
    //   }
    // } catch (error) {
    //   console.error("Lỗi khi gửi API", error);
    // }
  };

  return (
    <div className="max-w-md bg-background p-6 rounded-2xl shadow-lg text-center">
      <p className="text-2xl font-semibold mb-4 text-white">Upload Avatar</p>

      <div className="flex justify-center">
        <label className="cursor-pointer">
          {image ? (
            <div className="relative w-32 h-32 rounded-full overflow-hidden">
              <Cropper
                ref={cropperRef}
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                cropShape="round"
                showGrid={false}
                style={{ containerStyle: { backgroundColor: "transparent" } }}
              />
            </div>
          ) : (
            <div className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-500 rounded-full text-gray-400">
              Click to Upload
            </div>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} ref={inputRef} />
        </label>
      </div>

      {image && (
        <div className="mt-3">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button onClick={onSkip} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
          Skip
        </button>
        <button onClick={handleSend} disabled={!image} className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:bg-gray-400">
          Send
        </button>
      </div>
    </div>
  );
};

export default AvatarUpload;

