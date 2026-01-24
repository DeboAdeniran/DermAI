import React, { useState } from "react";
import { AuthNav } from "../ui/AuthNav";
import { ProfileUpdateModal } from "../dashboard/ProfileUpdateModal";
import {
  User,
  Lock,
  Bell,
  Shield,
  Download,
  Trash2,
  Mail,
  Phone,
  Heart,
  AlertCircle,
  CheckCircle2,
  X,
  Plus,
  Sparkles,
  History,
  Calendar,
  UserCircle,
  Settings as SettingsIcon,
} from "lucide-react";

const ToggleSwitch = ({ enabled, onChange, className = "" }) => (
  <button
    onClick={onChange}
    className={`relative w-14 h-7 rounded-full transition-all shrink-0 shadow-inner ${className} ${
      enabled ? "bg-linear-to-r from-[#8b7355] to-[#6d5a43]" : "bg-[#e8e6e3]"
    }`}
    type="button"
    role="switch"
    aria-checked={enabled}
  >
    <div
      className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${
        enabled ? "translate-x-7" : "translate-x-1"
      }`}
    ></div>
  </button>
);

export function SettingsPage() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Settings states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsReminders, setSmsReminders] = useState(false);
  const [inAppAlerts, setInAppAlerts] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [imageStorage, setImageStorage] = useState(true);

  const mockUser = {
    name: "Ada Okafor",
    email: "ada.okafor@email.com",
    phone: "+234 812 345 6789",
    skinType: "Combination",
    concerns: ["Hyperpigmentation", "Dehydration"],
    memberSince: "January 2025",
    totalAnalyses: 12,
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#e8e6e3] via-[#f0ede8] to-[#f5f3ef]">
      <ProfileUpdateModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
      <AuthNav
        currentPage="settings"
        userName={mockUser.name.split(" ")[0]}
        onUpdateProfile={() => setIsProfileModalOpen(true)}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 pt-24 sm:pt-28">
        {/* Header with Profile Summary */}
        <div className="mb-8">
          <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-4xl shadow-2xl p-6 sm:p-8 border border-[#e8e6e3]/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-linear-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center shadow-lg">
                <UserCircle className="text-white" size={40} />
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#2a2420] font-light">
                    {mockUser.name}
                  </h1>
                  <span className="px-3 py-1 bg-linear-to-r from-[#8b7355]/10 to-[#6d5a43]/10 text-[#8b7355] rounded-full text-xs font-light flex items-center gap-1">
                    <User size={12} />
                    Member
                  </span>
                </div>
                <p className="text-sm sm:text-base text-[#5a5450] mb-3 font-light flex items-center gap-2">
                  <Mail size={16} />
                  {mockUser.email}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs text-[#5a5450] border border-[#e8e6e3] font-light flex items-center gap-1">
                    <Calendar size={12} />
                    Member since {mockUser.memberSince}
                  </span>
                  <span className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs text-[#5a5450] border border-[#e8e6e3] font-light flex items-center gap-1">
                    <History size={12} />
                    {mockUser.totalAnalyses} skin analyses
                  </span>
                  <span className="px-3 py-1 bg-white/60 backdrop-blur-sm rounded-full text-xs text-[#5a5450] border border-[#e8e6e3] font-light flex items-center gap-1">
                    <Heart size={12} />
                    {mockUser.skinType} skin
                  </span>
                </div>
              </div>

              {/* Quick Action */}
              <button
                onClick={() => setIsProfileModalOpen(true)}
                className="px-6 py-3 bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full hover:shadow-xl transition-all shadow-lg flex items-center gap-2 font-light"
              >
                <SettingsIcon size={18} />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-3xl shadow-xl p-3 sticky top-24 border border-[#e8e6e3]/30">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full px-4 py-3.5 rounded-xl transition-all flex items-center gap-3 text-left font-light ${
                    activeTab === "profile"
                      ? "bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white shadow-lg"
                      : "text-[#5a5450] hover:bg-white/80 hover:shadow-md"
                  }`}
                >
                  <User size={18} />
                  <span className="text-sm">Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`w-full px-4 py-3.5 rounded-xl transition-all flex items-center gap-3 text-left font-light ${
                    activeTab === "privacy"
                      ? "bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white shadow-lg"
                      : "text-[#5a5450] hover:bg-white/80 hover:shadow-md"
                  }`}
                >
                  <Shield size={18} />
                  <span className="text-sm">Privacy & Security</span>
                </button>
                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full px-4 py-3.5 rounded-xl transition-all flex items-center gap-3 text-left font-light ${
                    activeTab === "notifications"
                      ? "bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white shadow-lg"
                      : "text-[#5a5450] hover:bg-white/80 hover:shadow-md"
                  }`}
                >
                  <Bell size={18} />
                  <span className="text-sm">Notifications</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-linear-to-br from-[#f8f6f3] via-white to-[#fdf9f0] rounded-4xl shadow-2xl p-6 sm:p-8 border border-[#e8e6e3]/30">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                        <User size={20} className="text-[#8b7355]" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl text-[#2a2420] font-light">
                          Personal Information
                        </h2>
                        <p className="text-sm text-[#5a5450] font-light">
                          Update your account details
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-[#2a2420] mb-2 font-light flex items-center gap-2">
                          <User size={16} className="text-[#8b7355]" />
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={mockUser.name}
                          className="w-full px-4 py-3 bg-white/60 rounded-xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:bg-white focus:border-transparent transition-all font-light"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-[#2a2420] mb-2 font-light flex items-center gap-2">
                          <Mail size={16} className="text-[#8b7355]" />
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue={mockUser.email}
                          className="w-full px-4 py-3 bg-white/60 rounded-xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:bg-white focus:border-transparent transition-all font-light"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-[#2a2420] mb-2 font-light flex items-center gap-2">
                          <Phone size={16} className="text-[#8b7355]" />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue={mockUser.phone}
                          className="w-full px-4 py-3 bg-white/60 rounded-xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:bg-white focus:border-transparent transition-all font-light"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-[#2a2420] mb-2 font-light flex items-center gap-2">
                          <Heart size={16} className="text-[#8b7355]" />
                          Skin Type
                        </label>
                        <select className="w-full px-4 py-3 bg-white/60 rounded-xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:bg-white focus:border-transparent transition-all font-light">
                          <option value="combination">Combination</option>
                          <option value="dry">Dry</option>
                          <option value="oily">Oily</option>
                          <option value="sensitive">Sensitive</option>
                          <option value="normal">Normal</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="block text-sm text-[#2a2420] mb-3 font-light">
                        Main Skin Concerns
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {mockUser.concerns.map((concern, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full text-sm flex items-center gap-2 shadow-md font-light"
                          >
                            <Sparkles size={14} />
                            {concern}
                            <button className="hover:bg-white/20 rounded-full p-0.5 transition-all">
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                        <button className="px-4 py-2 border-2 border-dashed border-[#8b7355] text-[#8b7355] rounded-full text-sm hover:bg-[#8b7355] hover:text-white transition-all font-light flex items-center gap-1">
                          <Plus size={14} />
                          Add Concern
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Change Password Section */}
                  <div className="pt-8 border-t border-[#e8e6e3]">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                        <Lock size={20} className="text-[#8b7355]" />
                      </div>
                      <div>
                        <h3 className="text-xl text-[#2a2420] font-light">
                          Security
                        </h3>
                        <p className="text-sm text-[#5a5450] font-light">
                          Update your password
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 max-w-2xl">
                      <input
                        type="password"
                        placeholder="Current password"
                        className="w-full px-4 py-3 bg-white/60 rounded-xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:bg-white focus:border-transparent transition-all font-light placeholder:text-[#5a5450]/50"
                      />
                      <input
                        type="password"
                        placeholder="New password"
                        className="w-full px-4 py-3 bg-white/60 rounded-xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:bg-white focus:border-transparent transition-all font-light placeholder:text-[#5a5450]/50"
                      />
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3 bg-white/60 rounded-xl border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:bg-white focus:border-transparent transition-all font-light placeholder:text-[#5a5450]/50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-6">
                    <button className="px-8 py-3 bg-linear-to-r from-[#8b7355] to-[#6d5a43] text-white rounded-full hover:shadow-xl transition-all flex items-center justify-center gap-2 font-light">
                      <CheckCircle2 size={18} />
                      Save Changes
                    </button>
                    <button className="px-8 py-3 border-2 border-[#e8e6e3] text-[#5a5450] rounded-full hover:border-[#8b7355] hover:text-[#8b7355] transition-all font-light">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === "privacy" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                      <Shield size={20} className="text-[#8b7355]" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl text-[#2a2420] font-light">
                        Privacy & Security
                      </h2>
                      <p className="text-sm text-[#5a5450] font-light">
                        Control your data and privacy settings
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Data Sharing Toggle */}
                    <div className="bg-white/60 rounded-2xl p-5 border border-[#e8e6e3] hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-base text-[#2a2420] mb-1 font-light flex items-center gap-2">
                            Data Sharing
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-light">
                              Optional
                            </span>
                          </h3>
                          <p className="text-sm text-[#5a5450] font-light">
                            Allow anonymous data sharing to help improve our AI
                            recommendations for all users
                          </p>
                        </div>
                        <ToggleSwitch
                          enabled={dataSharing}
                          onChange={() => setDataSharing(!dataSharing)}
                        />
                      </div>
                    </div>

                    {/* Image Storage Toggle */}
                    <div className="bg-white/60 rounded-2xl p-5 border border-[#e8e6e3] hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-base text-[#2a2420] mb-1 font-light flex items-center gap-2">
                            Image Storage
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-light">
                              Recommended
                            </span>
                          </h3>
                          <p className="text-sm text-[#5a5450] font-light">
                            Store your skin analysis photos securely for
                            progress tracking and comparison
                          </p>
                        </div>
                        <ToggleSwitch
                          enabled={imageStorage}
                          onChange={() => setImageStorage(!imageStorage)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Data Management */}
                  <div className="pt-8 border-t border-[#e8e6e3]">
                    <h3 className="text-xl text-[#2a2420] mb-4 font-light">
                      Data Management
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="px-6 py-3 border-2 border-[#8b7355] text-[#8b7355] rounded-full hover:bg-linear-to-r hover:from-[#8b7355] hover:to-[#6d5a43] hover:text-white transition-all flex items-center justify-center gap-2 font-light">
                        <Download size={18} />
                        Download My Data
                      </button>
                      <button className="px-6 py-3 border-2 border-red-500 text-red-600 rounded-full hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 font-light">
                        <Trash2 size={18} />
                        Delete Account
                      </button>
                    </div>
                  </div>

                  {/* Warning Note */}
                  <div className="p-5 bg-linear-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl flex gap-3">
                    <AlertCircle
                      size={20}
                      className="text-yellow-700 shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-sm text-yellow-800 font-light">
                        <strong className="font-normal">Important:</strong>{" "}
                        Deleting your account will permanently remove all your
                        data, including skin analyses, routines, product
                        recommendations, and preferences. This action cannot be
                        undone.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#8b7355]/10 to-[#6d5a43]/10 flex items-center justify-center">
                      <Bell size={20} className="text-[#8b7355]" />
                    </div>
                    <div>
                      <h2 className="text-2xl sm:text-3xl text-[#2a2420] font-light">
                        Notification Preferences
                      </h2>
                      <p className="text-sm text-[#5a5450] font-light">
                        Choose how you want to stay informed
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Email Notifications */}
                    <div className="bg-white/60 rounded-2xl p-5 border border-[#e8e6e3] hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-base text-[#2a2420] mb-1 font-light flex items-center gap-2">
                            <Mail size={16} className="text-[#8b7355]" />
                            Email Notifications
                          </h3>
                          <p className="text-sm text-[#5a5450] font-light">
                            Receive product recommendations, skincare tips, and
                            important updates via email
                          </p>
                        </div>
                        <ToggleSwitch
                          enabled={emailNotifications}
                          onChange={() =>
                            setEmailNotifications(!emailNotifications)
                          }
                        />
                      </div>
                    </div>

                    {/* SMS Reminders */}
                    <div className="bg-white/60 rounded-2xl p-5 border border-[#e8e6e3] hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-base text-[#2a2420] mb-1 font-light flex items-center gap-2">
                            <Phone size={16} className="text-[#8b7355]" />
                            SMS Reminders
                          </h3>
                          <p className="text-sm text-[#5a5450] font-light">
                            Get text message reminders for your morning and
                            evening skincare routines
                          </p>
                        </div>
                        <ToggleSwitch
                          enabled={smsReminders}
                          onChange={() => setSmsReminders(!smsReminders)}
                        />
                      </div>
                    </div>

                    {/* In-App Alerts */}
                    <div className="bg-white/60 rounded-2xl p-5 border border-[#e8e6e3] hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-base text-[#2a2420] mb-1 font-light flex items-center gap-2">
                            <Bell size={16} className="text-[#8b7355]" />
                            In-App Alerts
                          </h3>
                          <p className="text-sm text-[#5a5450] font-light">
                            Show notifications and alerts within the DermAI
                            application
                          </p>
                        </div>
                        <ToggleSwitch
                          enabled={inAppAlerts}
                          onChange={() => setInAppAlerts(!inAppAlerts)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notification Schedule */}
                  <div className="pt-8 border-t border-[#e8e6e3]">
                    <h3 className="text-xl text-[#2a2420] mb-4 font-light">
                      Routine Reminders
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white/60 rounded-xl p-4 border border-[#e8e6e3]">
                        <label className="block text-sm text-[#2a2420] mb-2 font-light flex items-center gap-2">
                          <Sparkles size={16} className="text-[#8b7355]" />
                          Morning Routine
                        </label>
                        <input
                          type="time"
                          defaultValue="08:00"
                          className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent font-light"
                        />
                      </div>
                      <div className="bg-white/60 rounded-xl p-4 border border-[#e8e6e3]">
                        <label className="block text-sm text-[#2a2420] mb-2 font-light flex items-center gap-2">
                          <Sparkles size={16} className="text-[#8b7355]" />
                          Evening Routine
                        </label>
                        <input
                          type="time"
                          defaultValue="21:00"
                          className="w-full px-3 py-2 bg-white rounded-lg border-2 border-[#e8e6e3] focus:outline-none focus:ring-2 focus:ring-[#8b7355] focus:border-transparent font-light"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
