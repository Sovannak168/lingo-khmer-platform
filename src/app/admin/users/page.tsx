"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, Shield, CheckCircle2, Search, Filter } from "lucide-react";
import { useApp } from "@/lib/i18n/LanguageContext";
import { AuthGuard } from "@/components/common/AuthGuard";

export default function AdminUsersPage() {
  const { t, language } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([
    { id: "usr-1", name: "Vannak Roth", email: "vannak.roth@edu.kh", role: "student", city: "Phnom Penh", status: "active", level: "HSK 2 / IELTS 6.0" },
    { id: "usr-2", name: "Sopheak Chea", email: "sopheak.chea@edu.kh", role: "student", city: "Siem Reap", status: "active", level: "HSK 4" },
    { id: "usr-3", name: "Dr. Sokha Meng", email: "meng.sokha@lingo.edu.kh", role: "teacher", city: "Phnom Penh", status: "active", level: "Senior HSK Instructor" },
    { id: "usr-4", name: "Sarah Jenkins", email: "s.jenkins@lingo.edu.kh", role: "teacher", city: "Phnom Penh", status: "active", level: "IELTS Lead Examiner" },
    { id: "usr-5", name: "Super Admin", email: "admin@lingokhmer.edu.kh", role: "admin", city: "Phnom Penh", status: "active", level: "Super Administrator" },
  ]);

  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AuthGuard allowedRoles={["admin"]} requiredFeatureTitle="User & Role Management" requiredFeatureTitleKm="គ្រប់គ្រងសិស្ស និងគ្រូ">
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Overview</span>
        </Link>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
          User & Role Access Control
        </span>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Manage Platform Users & Roles
            </h2>
            <p className="text-xs text-slate-500 font-khmer mt-0.5">
              គ្រប់គ្រងសិស្ស គ្រូបង្រៀន និងសិទ្ធិអ្នកគ្រប់គ្រងប្រព័ន្ធ (Admin / Teacher / Student)
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search user by name or email..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 font-bold uppercase border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">User Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Location</th>
                <th className="p-3">Proficiency / Title</th>
                <th className="p-3">Assigned Role</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{u.name}</td>
                  <td className="p-3 text-slate-500 font-mono">{u.email}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{u.city}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{u.level}</td>
                  <td className="p-3">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-xs"
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </AuthGuard>
  );
}

