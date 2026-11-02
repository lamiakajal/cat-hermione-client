"use client";

import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";
import { Field } from "@/components/ui/Field";
import { EVENT_TYPES, toLocalInput } from "@/lib/events";

export interface EventFormValues {
  title: string;
  category: string;
  eventDate: string; // value of a datetime-local input
  location: string;
  bannerImage: string;
  organizerName: string;
  contactEmail: string;
  description: string;
}

type Errors = Partial<Record<keyof EventFormValues, string>>;

export const emptyEventForm: EventFormValues = {
  title: "",
  category: "Cleanup",
  eventDate: "",
  location: "",
  bannerImage: "",
  organizerName: "",
  contactEmail: "",
  description: "",
};

// Uploaded thumbnails are shrunk to 16:9 so they stay light to store and load
const fileToThumbnail = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const w = 800;
      const h = 450;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("no canvas"));
        return;
      }
      // Crop the centre to a 16:9 box
      const scale = Math.max(w / img.width, h / img.height);
      const sw = w / scale;
      const sh = h / scale;
      ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.75));
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

// Mirrors the server rules so people get feedback before the request is sent.
// `originalDate` lets an unchanged (possibly past) date pass when editing.
export const validateEvent = (v: EventFormValues, originalDate?: string): Errors => {
  const e: Errors = {};
  if (v.title.trim().length < 3) e.title = "Title must be at least 3 characters.";
  else if (v.title.trim().length > 120) e.title = "Title can be at most 120 characters.";

  if (!v.eventDate) {
    e.eventDate = "Please pick a date and time.";
  } else if (v.eventDate !== originalDate && new Date(v.eventDate).getTime() <= Date.now()) {
    e.eventDate = "Event date must be in the future.";
  }

  if (v.location.trim().length < 3) e.location = "Please enter where the event takes place.";
  if (!isUrl(v.bannerImage.trim())) e.bannerImage = "Enter a valid image URL starting with https://";
  if (v.organizerName.trim().length < 2) e.organizerName = "Enter the organizer or organization name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.contactEmail.trim())) e.contactEmail = "Enter a valid contact email address.";
  if (v.description.trim().length < 20) e.description = "Description needs at least 20 characters.";
  else if (v.description.trim().length > 2000) e.description = "Description can be at most 2000 characters.";
  return e;
};

interface EventFormProps {
  initial?: EventFormValues;
  submitLabel: string;
  busyLabel: string;
  onSubmit: (values: EventFormValues) => Promise<void>;
  onCancel?: () => void;
  // Field errors reported by the server get merged in here
  serverErrors?: Errors;
}

export const EventForm: React.FC<EventFormProps> = ({
  initial = emptyEventForm,
  submitLabel,
  busyLabel,
  onSubmit,
  onCancel,
  serverErrors,
}) => {
  const [values, setValues] = useState<EventFormValues>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("That image is too large. Choose one under 10 MB.");
      return;
    }
    try {
      const data = await fileToThumbnail(file);
      setValues((prev) => ({ ...prev, bannerImage: data }));
      setErrors((prev) => ({ ...prev, bannerImage: undefined }));
    } catch {
      toast.error("Could not read that image. Try another one.");
    }
  };
  const originalDate = initial.eventDate;
  const shown = { ...serverErrors, ...errors };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof EventFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateEvent(values, originalDate);
    setErrors(found);
    if (Object.keys(found).length) return;

    setBusy(true);
    try {
      await onSubmit(values);
    } finally {
      setBusy(false);
    }
  };

  const typeOptions: string[] = [...EVENT_TYPES];
  // Older events may carry a type that is no longer in the list
  if (!typeOptions.includes(values.category)) typeOptions.push(values.category);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Event title" htmlFor="title" error={shown.title}>
          <input
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Winter clothes distribution, Mirpur 10"
            aria-invalid={!!shown.title}
            className="field-input"
          />
        </Field>

        <Field label="Event type" htmlFor="category" error={shown.category}>
          <select
            id="category"
            name="category"
            value={values.category}
            onChange={handleChange}
            className="field-input"
          >
            {typeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Date and time" htmlFor="eventDate" error={shown.eventDate} hint="Past dates are not allowed.">
          <input
            id="eventDate"
            name="eventDate"
            type="datetime-local"
            min={toLocalInput(new Date())}
            value={values.eventDate}
            onChange={handleChange}
            aria-invalid={!!shown.eventDate}
            className="field-input"
          />
        </Field>

        <Field label="Location" htmlFor="location" error={shown.location}>
          <input
            id="location"
            name="location"
            value={values.location}
            onChange={handleChange}
            placeholder="Mirpur 10, Dhaka"
            aria-invalid={!!shown.location}
            className="field-input"
          />
        </Field>
      </div>

      <Field label="Thumbnail image" htmlFor="bannerImage" error={shown.bannerImage} hint="Paste an image link, or upload one from your gallery or computer.">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="bannerImage"
            name="bannerImage"
            type="text"
            value={values.bannerImage.startsWith("data:image/") ? "" : values.bannerImage}
            onChange={handleChange}
            placeholder={values.bannerImage.startsWith("data:image/") ? "Uploaded image selected" : "https://images.unsplash.com/..."}
            aria-invalid={!!shown.bannerImage}
            className="field-input"
          />
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          <button type="button" onClick={() => fileRef.current?.click()} className="btn-outline shrink-0">
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>
        {values.bannerImage && isUrl(values.bannerImage.trim()) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={values.bannerImage.trim()} alt="Thumbnail preview" referrerPolicy="no-referrer" className="mt-3 h-36 w-full sm:w-64 rounded-xl object-cover border border-slate-200 dark:border-slate-800" />
        )}
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Organizer name" htmlFor="organizerName" error={shown.organizerName}>
          <input
            id="organizerName"
            name="organizerName"
            value={values.organizerName}
            onChange={handleChange}
            placeholder="Your name or organization"
            aria-invalid={!!shown.organizerName}
            className="field-input"
          />
        </Field>
        <Field label="Organizer contact email" htmlFor="contactEmail" error={shown.contactEmail}>
          <input
            id="contactEmail"
            name="contactEmail"
            type="email"
            value={values.contactEmail}
            onChange={handleChange}
            placeholder="contact@example.org"
            aria-invalid={!!shown.contactEmail}
            className="field-input"
          />
        </Field>
      </div>

      <Field label="Description" htmlFor="description" error={shown.description} hint={`${values.description.trim().length}/2000`}>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={values.description}
          onChange={handleChange}
          placeholder="What will happen, who it helps, and what volunteers should bring."
          aria-invalid={!!shown.description}
          className="field-input resize-y"
        />
      </Field>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-outline">
            Cancel
          </button>
        )}
        <button type="submit" disabled={busy} className="btn-primary">
          {busy ? busyLabel : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
