"use client";

import { useState } from "react";
import Navigation from "@/components/shared/Navigation";
import Footer from "@/components/shared/Footer";
import {
  SUCCESSFUL_APPLICANTS,
  EMPLOYEES_WHATSAPP_LINK,
  AUDIT_CONFIRMATION_EMAILS,
} from "@/lib/data/candidatesData";
import { CheckCircle2, AlertTriangle, Send, Mail, ShieldCheck, FileText, ExternalLink } from "lucide-react";

export default function AdminAppointmentsPage() {
  const [secret, setSecret] = useState("trw-appoint-2026");
  const [testEmail, setTestEmail] = useState("luzzylugard@gmail.com");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (action: "test" | "send") => {
    if (action === "send") {
      const confirmDispatch = window.confirm(
        `Are you sure you want to send appointment emails to all ${SUCCESSFUL_APPLICANTS.length} candidates? Each candidate will receive their personalized appointment letter and handbook.`
      );
      if (!confirmDispatch) return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const url = `/api/admin/send-appointments?secret=${encodeURIComponent(
        secret
      )}&action=${action}${
        action === "test" ? `&testEmail=${encodeURIComponent(testEmail)}` : ""
      }`;

      const res = await fetch(url, { method: "POST" });
      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to process request");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#3a225c] text-white">
      <Navigation />

      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1 rounded-full bg-[#f9f871]/20 text-[#f9f871] text-xs font-bold uppercase tracking-wider mb-3">
            Internal Operations
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Appointment Email <span className="text-[#f9f871]">Dispatch</span>
          </h1>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto text-sm sm:text-base">
            Review and dispatch official appointment letters with attached handbook to shortlisted candidates via Brevo.
          </p>
        </div>

        {/* Security / Secret Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#f9f871] shrink-0" />
              <div>
                <h3 className="font-bold text-white text-base">Authorization Key</h3>
                <p className="text-xs text-white/60">
                  Required secret to execute Brevo email triggers safely.
                </p>
              </div>
            </div>
            <div className="w-full md:w-80">
              <input
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                placeholder="Enter admin secret..."
                className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#f9f871] text-sm"
              />
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="text-xs text-white/60 uppercase font-semibold">Candidates Selected</div>
            <div className="text-3xl font-extrabold text-[#f9f871] mt-1">{SUCCESSFUL_APPLICANTS.length}</div>
            <div className="text-xs text-white/50 mt-1">Shortlisted from recruitment</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="text-xs text-white/60 uppercase font-semibold">Handbook Attachment</div>
            <div className="text-lg font-bold text-[#fc98ac] mt-1 truncate">Handbook (PDF ~2.6MB)</div>
            <div className="text-xs text-white/50 mt-1">Attached to each email</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="text-xs text-white/60 uppercase font-semibold">Audit Report Recipients</div>
            <div className="text-xs font-semibold text-white/90 mt-1 truncate">luzzylugard@gmail.com</div>
            <div className="text-xs text-white/50 mt-1">+ therelevantw@gmail.com</div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-gradient-to-br from-[#2c144c] to-[#431f69] border-2 border-[#fc98ac]/40 rounded-2xl p-6 sm:p-8 mb-10 shadow-2xl">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-[#f9f871]" /> Dispatch Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
            {/* Test Action */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <label className="block text-xs font-semibold text-white/80 mb-2">
                1. Test Email Dispatch (Send sample to test email)
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#f9f871]"
                  placeholder="luzzylugard@gmail.com"
                />
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleAction("test")}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Test"}
                </button>
              </div>
              <p className="text-[11px] text-white/50 mt-2">
                Sends sample appointment letter with handbook attachment for review.
              </p>
            </div>

            {/* Official Dispatch */}
            <div className="bg-[#fc98ac]/10 p-4 rounded-xl border border-[#fc98ac]/30">
              <div className="text-xs font-semibold text-[#fc98ac] mb-2">
                2. Official All-Candidates Dispatch
              </div>
              <button
                type="button"
                disabled={loading}
                onClick={() => handleAction("send")}
                className="w-full py-3 bg-[#f9f871] hover:bg-[#ffbc5c] text-[#3a225c] font-extrabold text-sm rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Processing Dispatch..." : `🚀 Dispatch to All ${SUCCESSFUL_APPLICANTS.length} Candidates`}
              </button>
              <p className="text-[11px] text-white/60 mt-2 text-center">
                Sends individual emails, handbook, and dispatches audit report.
              </p>
            </div>
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong>Dispatch Error:</strong> {error}
              </div>
            </div>
          )}

          {result && (
            <div className="mt-6 p-5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-100 text-sm">
              <div className="flex items-center gap-2 font-bold text-base text-emerald-300 mb-2">
                <CheckCircle2 className="w-5 h-5" />
                {result.mode === "test" ? "Test Email Delivered Successfully!" : "Dispatch Execution Completed!"}
              </div>
              <p className="text-xs text-white/80">
                {result.message ||
                  `Successfully sent ${result.sentCount} of ${result.total} candidate emails. Audit report dispatched to ${AUDIT_CONFIRMATION_EMAILS.join(", ")}.`}
              </p>
            </div>
          )}
        </div>

        {/* Candidates List Preview */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-12">
          <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-bold text-base text-white">Candidates to be Emailed</h3>
            <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/70">
              {SUCCESSFUL_APPLICANTS.length} Total
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-xs text-white/60 uppercase">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Candidate</th>
                  <th className="px-6 py-3">Email Address</th>
                  <th className="px-6 py-3">Role Assigned</th>
                  <th className="px-6 py-3">WhatsApp Group</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {SUCCESSFUL_APPLICANTS.map((c, i) => (
                  <tr key={c.id} className="hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-bold text-[#f9f871]">{i + 1}</td>
                    <td className="px-6 py-4 font-semibold text-white">{c.name}</td>
                    <td className="px-6 py-4 text-white/80 font-mono text-xs">{c.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#fc98ac]/20 text-[#fc98ac]">
                        {c.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-white/60">
                      <a
                        href={EMPLOYEES_WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        Team WhatsApp <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
