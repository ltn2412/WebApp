"use client";
import AvatarUpload from "@/components/layout/AvatarUpload";
import AvatarUploader from "@/components/layout/AvatarUploader";
import SignIn from "@/components/layout/SignIn";
import SignUpForm from "@/components/layout/SignUp";
import UpdateInfo from "@/components/layout/UpdateInfo";

export default function Home() {
  return <div className="h-screen bg-[url('/test.jpeg')] bg-center bg-cover flex items-center justify-center">
    {/* <SignUpForm /> */}
    {/* <UpdateInfo /> */}
    {/* <SignIn /> */}
    {/* <AvatarUploader /> */}
    <AvatarUpload onSend={() => { }} onSkip={() => { }} />
    {/* <AvatarUploader onFileSelect={() => { }} /> */}
  </div>;
}
