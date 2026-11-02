"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";
import { PageHeader } from "@/components/ui/PageHeader";
import { EventForm, EventFormValues, emptyEventForm } from "@/components/events/EventForm";

function CreateEventContent() {
  const router = useRouter();
  const { token, user } = useAuth();
  const [serverErrors, setServerErrors] = useState<Record<string, string>>();

  const handleCreate = async (values: EventFormValues) => {
    try {
      await api("/events", {
        method: "POST",
        token,
        body: {
          ...values,
          // datetime-local has no timezone, convert it before it leaves the browser
          eventDate: new Date(values.eventDate).toISOString(),
        },
      });
      toast.success("Event published. It is now live on the events page.");
      router.push("/events");
    } catch (err) {
      if (err instanceof ApiError) {
        setServerErrors(err.errors);
        toast.error(err.message);
      } else {
        toast.error("Could not create the event.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <Link
        href="/events"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-[#00796B] dark:text-slate-400 dark:hover:text-emerald-400 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to events
      </Link>

      <PageHeader
        eyebrow="Create event"
        title="Host a community event"
        description="Fill in the details below. Your event appears on the upcoming events page as soon as you publish it."
      />

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070d1e] p-6 sm:p-8 shadow-sm">
        <EventForm
          initial={{
            ...emptyEventForm,
            organizerName: user?.name ?? "",
            contactEmail: user?.email ?? "",
          }}
          submitLabel="Publish event"
          busyLabel="Publishing..."
          onSubmit={handleCreate}
          serverErrors={serverErrors}
        />
      </div>
    </div>
  );
}

export default function CreateEventPage() {
  return (
    <ProtectedRoute>
      <CreateEventContent />
    </ProtectedRoute>
  );
}
