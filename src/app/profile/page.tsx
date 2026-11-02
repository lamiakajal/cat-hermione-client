"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Save, Upload, KeyRound, Eye, EyeOff } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { useAuth, User } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { PageHeader } from "@/components/ui/PageHeader";
import { Field } from "@/components/ui/Field";
import { RemoteImage } from "@/components/ui/RemoteImage";

// Uploaded pictures are shrunk to a small square so they stay light to store
const fileToAvatar = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const size = 256;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("no canvas"));
        return;
      }
      const side = Math.min(img.width, img.height);
      ctx.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("bad image"));
    };
    img.src = url;
  });

const isUrl = (v: string) => {
  if (v.startsWith("data:image/")) return true;
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

function ProfileContent() {
  const { user, token, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL ?? "");
  const [errors, setErrors] = useState<{ name?: string; photoURL?: string }>({});
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSaving, setPwSaving] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("That image is too large. Choose one under 8 MB.");
      return;
    }
    try {
      setPhotoURL(await fileToAvatar(file));
      setErrors((prev) => ({ ...prev, photoURL: undefined }));
      toast.success("Picture ready. Press Save changes to keep it.");
    } catch {
      toast.error("Could not read that image. Try another one.");
    }
  };

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    let problem = "";
    if (!currentPw) problem = "Enter your current password.";
    else if (newPw.length < 6) problem = "New password must be at least 6 characters long.";
    else if (!/[A-Z]/.test(newPw)) problem = "New password needs at least one uppercase letter.";
    else if (!/[a-z]/.test(newPw)) problem = "New password needs at least one lowercase letter.";
    setPwError(problem);
    if (problem) return;

    setPwSaving(true);
    try {
      await api("/auth/password", {
        method: "PUT",
        token,
        body: { currentPassword: currentPw, newPassword: newPw },
      });
      setCurrentPw("");
      setNewPw("");
      toast.success("Password changed.");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not change your password.");
    } finally {
      setPwSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const found: typeof errors = {};
    if (name.trim().length < 2) found.name = "Name must be at least 2 characters.";
    if (photoURL.trim() && !isUrl(photoURL.trim())) found.photoURL = "Photo URL must start with https://";
    setErrors(found);
    if (Object.keys(found).length) return;

    setSaving(true);
    try {
      const res = await api<{ user: User }>("/auth/profile", {
        method: "PUT",
        token,
        body: { name: name.trim(), photoURL: photoURL.trim() },
      });
      updateUser(res.user);
      toast.success("Profile updated.");
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Could not update your profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <PageHeader eyebrow="Profile" title="Your profile" description="Update the name and picture other volunteers see." />

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d1e] p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-5 mb-8">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-[#00796B] ring-4 ring-emerald-100 dark:ring-emerald-950 flex items-center justify-center text-white text-2xl font-black shrink-0">
            {photoURL.trim() && isUrl(photoURL.trim()) ? (
              <RemoteImage src={photoURL.trim()} alt="Profile preview" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              (name || user?.email || "U").charAt(0).toUpperCase()
            )}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-lg text-slate-900 dark:text-white truncate">{name || "Your name"}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <Field label="Display name" htmlFor="profile-name" error={errors.name}>
            <input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} className="field-input" />
          </Field>

          <Field label="Profile picture" htmlFor="profile-photo" error={errors.photoURL} hint="Upload from your device or paste an image link. The preview above updates right away.">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="profile-photo"
                type="text"
                value={photoURL.startsWith("data:image/") ? "" : photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder={photoURL.startsWith("data:image/") ? "Uploaded image selected" : "https://example.com/me.jpg"}
                aria-invalid={!!errors.photoURL}
                className="field-input"
              />
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
              <button type="button" onClick={() => fileRef.current?.click()} className="btn-outline shrink-0">
                <Upload className="w-4 h-4" />
                Upload
              </button>
            </div>
          </Field>

          <Field label="Email" htmlFor="profile-email" hint="Your email can't be changed.">
            <input id="profile-email" value={user?.email ?? ""} disabled className="field-input opacity-60 cursor-not-allowed" />
          </Field>

          <div className="flex justify-end">
            <button type="submit" disabled={saving} className="btn-primary">
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d1e] p-6 sm:p-8 shadow-sm">
        <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-[#00796B] dark:text-emerald-400" />
          Change password
        </h2>
        {user?.provider && user.provider !== "local" ? (
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            You signed in with {user.provider === "google" ? "Google" : "GitHub"}, so there is no password to change here.
          </p>
        ) : (
          <form onSubmit={handlePassword} noValidate className="mt-5 space-y-5">
            <Field label="Current password" htmlFor="current-password">
              <input id="current-password" type={showPw ? "text" : "password"} autoComplete="current-password" value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} className="field-input" />
            </Field>
            <Field label="New password" htmlFor="new-password" error={pwError} hint="At least 6 characters with one uppercase and one lowercase letter.">
              <div className="relative">
                <input id="new-password" type={showPw ? "text" : "password"} autoComplete="new-password" value={newPw} onChange={(e) => setNewPw(e.target.value)} aria-invalid={!!pwError} className="field-input pr-11" />
                <button type="button" onClick={() => setShowPw((v) => !v)} aria-label={showPw ? "Hide passwords" : "Show passwords"} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </Field>
            <div className="flex justify-end">
              <button type="submit" disabled={pwSaving} className="btn-primary">
                {pwSaving ? "Updating..." : "Update password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
