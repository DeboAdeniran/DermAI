/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { AuthNav } from "../ui/AuthNav";
import { ProfileUpdateModal } from "../dashboard/ProfileUpdateModal";
import {
  User,
  Lock,
  Bell,
  Shield,
  Download,
  Mail,
  Phone,
  Heart,
  AlertCircle,
  CheckCircle2,
  Settings as SettingsIcon,
  UserCircle,
  History,
  Calendar,
  Loader,
  Save,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { users, getUser, saveUser } from "../../services/api";
import { useTheme } from "../../context/ThemeContext";

const ToggleSwitch = ({ enabled, onChange }) => (
  <button
    onClick={onChange}
    type="button"
    role="switch"
    aria-checked={enabled}
    className={`relative w-14 h-7 rounded-full transition-all shrink-0 shadow-inner ${enabled ? "bg-linear-to-r from-[#8b7355] to-[#6d5a43]" : "bg-(--bg-muted)"}`}
  >
    <div
      className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${enabled ? "translate-x-7" : "translate-x-1"}`}
    />
  </button>
);

const SKIN_TYPES = ["Normal", "Dry", "Oily", "Combination", "Sensitive"];
const SKIN_CONCERNS = [
  "Acne",
  "Dark Spots",
  "Hyperpigmentation",
  "Dryness",
  "Oiliness",
  "Wrinkles",
  "Sensitivity",
  "Dullness",
  "Large Pores",
  "Dehydration",
  "Uneven Texture",
];

export function SettingsPage() {
  const { theme, toggle: toggleTheme, isDark } = useTheme();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  // Profile
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [skinType, setSkinType] = useState("Normal");
  const [concerns, setConcerns] = useState([]);
  const [memberSince, setMemberSince] = useState("");
  const [totalAnalyses, setTotalAnalyses] = useState(0);

  // Notifications
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [routineReminders, setRoutineReminders] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [productUpdates, setProductUpdates] = useState(false);

  // Privacy
  const [dataSharing, setDataSharing] = useState(false);
  const [imageStorage, setImageStorage] = useState(true);
  const [analyticsOptIn, setAnalyticsOptIn] = useState(true);

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState(null);

  useEffect(() => {
    const u = getUser();
    if (u) {
      setName(u.name || "");
      setEmail(u.email || "");
      setPhone(u.phone || "");
      setSkinType(u.skinProfile?.skinType || "Normal");
      setConcerns(u.skinProfile?.concerns || []);
      setMemberSince(u.createdAt || "");
      setEmailNotifs(u.notificationSettings?.emailNotifications ?? true);
      setPushNotifs(u.notificationSettings?.pushNotifications ?? true);
      setRoutineReminders(u.notificationSettings?.routineReminders ?? true);
      setWeeklyReport(u.notificationSettings?.weeklyReport ?? true);
      setProductUpdates(u.notificationSettings?.productUpdates ?? false);
      setDataSharing(u.privacySettings?.dataSharing ?? false);
      setImageStorage(u.privacySettings?.imageStorage ?? true);
      setAnalyticsOptIn(u.privacySettings?.analyticsOptIn ?? true);
    }
    users
      .getStats()
      .then((d) => {
        setTotalAnalyses(d.stats?.totalAnalyses || 0);
        setMemberSince(d.stats?.memberSince || "");
      })
      .catch(() => {});
    setLoading(false);
  }, []);

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await users.updateProfile({ name, phone });
      await users.updateSkinProfile({ skinType, concerns });
      saveUser(res.user);
      showSaved();
    } catch (e) {
      setError(e?.message || "Failed to save profile.");
    }
    setSaving(false);
  };

  const handleSaveNotifications = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await users.updateNotificationSettings({
        emailNotifications: emailNotifs,
        pushNotifications: pushNotifs,
        routineReminders,
        weeklyReport,
        productUpdates,
      });
      saveUser(res.user);
      showSaved();
    } catch {
      setError("Failed to save notification settings.");
    }
    setSaving(false);
  };

  const handleSavePrivacy = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await users.updatePrivacySettings({
        dataSharing,
        imageStorage,
        analyticsOptIn,
      });
      saveUser(res.user);
      showSaved();
    } catch {
      setError("Failed to save privacy settings.");
    }
    setSaving(false);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "Passwords do not match." });
      return;
    }
    if (newPassword.length < 8) {
      setPasswordMsg({
        type: "error",
        text: "Password must be at least 8 characters.",
      });
      return;
    }
    setSaving(true);
    setPasswordMsg(null);
    try {
      await users.changePassword(currentPassword, newPassword);
      setPasswordMsg({
        type: "success",
        text: "Password changed successfully!",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (e) {
      setPasswordMsg({
        type: "error",
        text: e?.message || "Failed to change password.",
      });
    }
    setSaving(false);
  };

  const handleExport = async () => {
    try {
      const data = await users.exportData();
      const blob = new Blob([JSON.stringify(data.data, null, 2)], {
        type: "application/json",
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `dermai-data-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
    } catch {
      setError("Failed to export data.");
    }
  };

  const toggleConcern = (c) =>
    setConcerns((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );

  const TABS = [
    { key: "profile", icon: User, label: "Profile" },
    { key: "appearance", icon: Sun, label: "Appearance" },
    { key: "notifications", icon: Bell, label: "Notifications" },
    { key: "privacy", icon: Shield, label: "Privacy & Security" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <ProfileUpdateModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
      <AuthNav
        currentPage="settings"
        userName={name.split(" ")[0] || "User"}
        onUpdateProfile={() => setIsProfileModalOpen(true)}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-24 sm:pt-28">
        {/* Profile header card */}
        <div
          className="rounded-3xl shadow-xl p-6 sm:p-8 mb-6 border"
          style={{
            background: "var(--bg-surface)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
              style={{
                background: "linear-linear(135deg, #8b7355, #6d5a43)",
                color: "var(--text-primary)",
              }}
            >
              <UserCircle
                style={{ color: "var(--text-primary)" }}
                className="text-white"
                size={36}
              />
            </div>
            <div className="flex-1">
              <h1
                className="text-2xl font-light"
                style={{ color: "var(--text-primary)" }}
              >
                {name || "Your Account"}
              </h1>
              <p
                className="text-sm font-light flex items-center gap-1.5 mt-0.5"
                style={{ color: "var(--text-secondary)" }}
              >
                <Mail size={13} />
                {email}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {memberSince && (
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-light flex items-center gap-1 border"
                    style={{
                      background: "var(--bg-subtle)",
                      borderColor: "var(--border)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <Calendar size={11} /> Member since{" "}
                    {new Date(memberSince).toLocaleDateString("en-NG", {
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-light flex items-center gap-1 border"
                  style={{
                    background: "var(--bg-subtle)",
                    borderColor: "var(--border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <History size={11} />
                  {totalAnalyses} analyses
                </span>
                {skinType && (
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-light flex items-center gap-1 border"
                    style={{
                      background: "var(--bg-subtle)",
                      borderColor: "var(--border)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    <Heart size={11} />
                    {skinType} skin
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="px-5 py-2.5 text-white rounded-full text-sm font-light flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              style={{
                background: "linear-linear(135deg, #8b7355, #6d5a43)",
                color: "var(--text-primary)",
              }}
            >
              <SettingsIcon size={16} /> Edit Profile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tab sidebar */}
          <div className="lg:col-span-1">
            <div
              className="rounded-3xl shadow-xl p-3 sticky top-24 border"
              style={{
                background: "var(--bg-surface)",
                borderColor: "var(--border)",
              }}
            >
              {TABS.map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className="w-full px-4 py-3.5 rounded-xl transition-all flex items-center gap-3 text-left font-light mb-1 text-sm"
                  style={
                    activeTab === key
                      ? {
                          background: "linear-linear(135deg, #8b7355, #6d5a43)",
                          color: "#fff",
                        }
                      : { color: "var(--text-secondary)" }
                  }
                >
                  <Icon size={17} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div
              className="rounded-3xl shadow-xl p-6 sm:p-8 border"
              style={{
                background: "var(--bg-surface)",
                borderColor: "var(--border)",
              }}
            >
              {error && (
                <div className="mb-5 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 font-light">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}
              {saved && (
                <div className="mb-5 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-sm text-emerald-700 font-light">
                  <CheckCircle2 size={16} />
                  Changes saved!
                </div>
              )}

              {/* ── PROFILE TAB ─────────────────────────────────────────── */}
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <h2
                    className="text-2xl font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      {
                        label: "Full Name",
                        icon: User,
                        value: name,
                        onChange: setName,
                        type: "text",
                      },
                      {
                        label: "Email Address",
                        icon: Mail,
                        value: email,
                        onChange: () => {},
                        type: "email",
                        disabled: true,
                      },
                      {
                        label: "Phone Number",
                        icon: Phone,
                        value: phone,
                        onChange: setPhone,
                        type: "tel",
                      },
                    ].map(
                      ({
                        label,
                        icon: Icon,
                        value,
                        onChange,
                        type,
                        disabled,
                      }) => (
                        <div key={label}>
                          <label
                            className="block text-sm font-light mb-2 flex items-center gap-1.5"
                            style={{ color: "var(--text-primary)" }}
                          >
                            <Icon size={14} style={{ color: "var(--brand)" }} />
                            {label}
                            {disabled && (
                              <span className="text-xs opacity-50">
                                (cannot change)
                              </span>
                            )}
                          </label>
                          <input
                            type={type}
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            disabled={disabled}
                            className="w-full px-4 py-3 rounded-xl border text-sm font-light focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            style={{
                              background: "var(--bg-subtle)",
                              borderColor: "var(--border)",
                              color: "var(--text-primary)",
                            }}
                          />
                        </div>
                      ),
                    )}
                    <div>
                      <label
                        className="block text-sm font-light mb-2 flex items-center gap-1.5"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <Heart size={14} style={{ color: "var(--brand)" }} />
                        Skin Type
                      </label>
                      <select
                        value={skinType}
                        onChange={(e) => setSkinType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border text-sm font-light focus:outline-none transition-colors"
                        style={{
                          background: "var(--bg-subtle)",
                          borderColor: "var(--border)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {SKIN_TYPES.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-light mb-3"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Skin Concerns
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SKIN_CONCERNS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => toggleConcern(c)}
                          className="px-3 py-1.5 rounded-full text-xs font-light border transition-all"
                          style={
                            concerns.includes(c)
                              ? {
                                  background: "var(--brand)",
                                  color: "#fff",
                                  borderColor: "var(--brand)",
                                }
                              : {
                                  background: "var(--bg-subtle)",
                                  color: "var(--text-secondary)",
                                  borderColor: "var(--border)",
                                }
                          }
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 text-white rounded-xl text-sm font-light hover:shadow-lg transition-all disabled:opacity-60"
                    style={{
                      background: "linear-linear(135deg, #8b7355, #6d5a43)",
                    }}
                  >
                    {saving ? (
                      <Loader size={14} className="animate-spin" />
                    ) : (
                      <Save size={14} />
                    )}{" "}
                    Save Changes
                  </button>

                  {/* Change Password */}
                  <div
                    className="pt-6 border-t"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <h3
                      className="text-lg font-light mb-4 flex items-center gap-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <Lock size={18} style={{ color: "var(--brand)" }} />
                      Change Password
                    </h3>
                    {passwordMsg && (
                      <div
                        className={`mb-4 flex items-center gap-2 p-3 rounded-xl text-sm font-light ${passwordMsg.type === "success" ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "bg-red-50 border border-red-200 text-red-600"}`}
                      >
                        {passwordMsg.type === "success" ? (
                          <CheckCircle2 size={15} />
                        ) : (
                          <AlertCircle size={15} />
                        )}
                        {passwordMsg.text}
                      </div>
                    )}
                    <div className="space-y-3">
                      {[
                        {
                          label: "Current Password",
                          value: currentPassword,
                          onChange: setCurrentPassword,
                        },
                        {
                          label: "New Password",
                          value: newPassword,
                          onChange: setNewPassword,
                        },
                        {
                          label: "Confirm Password",
                          value: confirmPassword,
                          onChange: setConfirmPassword,
                        },
                      ].map(({ label, value, onChange }) => (
                        <div key={label}>
                          <label
                            className="block text-sm font-light mb-1.5"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {label}
                          </label>
                          <input
                            type="password"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border text-sm font-light focus:outline-none transition-colors"
                            style={{
                              background: "var(--bg-subtle)",
                              borderColor: "var(--border)",
                              color: "var(--text-primary)",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={handleChangePassword}
                      disabled={saving || !currentPassword || !newPassword}
                      className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-light transition-all disabled:opacity-40 border"
                      style={{
                        borderColor: "var(--brand)",
                        color: "var(--brand)",
                      }}
                    >
                      <Lock size={14} /> Update Password
                    </button>
                  </div>
                </div>
              )}

              {/* ── APPEARANCE TAB ──────────────────────────────────────── */}
              {activeTab === "appearance" && (
                <div className="space-y-6">
                  <h2
                    className="text-2xl font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Appearance
                  </h2>
                  <p
                    className="text-sm font-light"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Customise how DermAI looks on your device.
                  </p>

                  {/* Theme selector cards */}
                  <div>
                    <label
                      className="block text-sm font-light mb-3"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Colour theme
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          id: "light",
                          icon: Sun,
                          label: "Light",
                          desc: "Clean and bright",
                          preview: {
                            bg: "#faf9f7",
                            card: "#ffffff",
                            text: "#2a2420",
                            accent: "#8b7355",
                          },
                        },
                        {
                          id: "dark",
                          icon: Moon,
                          label: "Dark",
                          desc: "Easy on the eyes",
                          preview: {
                            bg: "#1a1714",
                            card: "#231f1b",
                            text: "#f0ede8",
                            accent: "#c4a882",
                          },
                        },
                        {
                          id: "system",
                          icon: Monitor,
                          label: "System",
                          desc: "Matches your device",
                          preview: {
                            bg: "linear-linear(135deg, #faf9f7 50%, #1a1714 50%)",
                            card: "#8b7355",
                            text: "#fff",
                            accent: "#fff",
                          },
                        },
                      ].map(({ id, icon: Icon, label, desc, preview }) => {
                        const isActive =
                          id === "system"
                            ? false // we don't track "system" separately, just show it
                            : theme === id;
                        return (
                          <button
                            key={id}
                            onClick={() => {
                              if (id === "system") {
                                const sysDark = window.matchMedia(
                                  "(prefers-color-scheme: dark)",
                                ).matches;
                                if (sysDark && !isDark) toggleTheme();
                                if (!sysDark && isDark) toggleTheme();
                              } else if (id !== theme) {
                                toggleTheme();
                              }
                            }}
                            className="relative rounded-2xl p-4 border-2 text-left transition-all hover:scale-[1.02]"
                            style={{
                              borderColor: isActive
                                ? "var(--brand)"
                                : "var(--border)",
                              background: "var(--bg-subtle)",
                            }}
                          >
                            {isActive && (
                              <span
                                className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                                style={{ background: "var(--brand)" }}
                              >
                                <CheckCircle2
                                  size={12}
                                  className="text-white"
                                />
                              </span>
                            )}
                            {/* Mini preview */}
                            <div
                              className="w-full h-12 rounded-xl mb-3 overflow-hidden flex gap-1 p-1.5"
                              style={{
                                background:
                                  id === "system" ? undefined : preview.bg,
                                backgroundImage:
                                  id === "system" ? preview.bg : undefined,
                              }}
                            >
                              <div
                                className="flex-1 rounded-lg"
                                style={{
                                  background:
                                    id === "system"
                                      ? "rgba(255,255,255,0.3)"
                                      : preview.card,
                                }}
                              />
                              <div
                                className="w-1/3 rounded-lg"
                                style={{
                                  background:
                                    id === "system"
                                      ? "rgba(0,0,0,0.3)"
                                      : preview.accent,
                                  opacity: 0.7,
                                }}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Icon
                                size={15}
                                style={{ color: "var(--brand)" }}
                              />
                              <div>
                                <p
                                  className="text-sm font-light"
                                  style={{ color: "var(--text-primary)" }}
                                >
                                  {label}
                                </p>
                                <p
                                  className="text-xs font-light"
                                  style={{ color: "var(--text-muted)" }}
                                >
                                  {desc}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick toggle */}
                  <div
                    className="flex items-center justify-between p-4 rounded-2xl border"
                    style={{
                      background: "var(--bg-subtle)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {isDark ? (
                        <Moon size={18} className="text-indigo-400" />
                      ) : (
                        <Sun size={18} className="text-amber-400" />
                      )}
                      <div>
                        <p
                          className="text-sm font-light"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {isDark ? "Dark mode is on" : "Light mode is on"}
                        </p>
                        <p
                          className="text-xs font-light"
                          style={{ color: "var(--text-muted)" }}
                        >
                          Tap to switch to {isDark ? "light" : "dark"} mode
                        </p>
                      </div>
                    </div>
                    <ToggleSwitch enabled={isDark} onChange={toggleTheme} />
                  </div>

                  <p
                    className="text-xs font-light"
                    style={{ color: "var(--text-faint)" }}
                  >
                    Your preference is saved locally on this device.
                  </p>
                </div>
              )}

              {/* ── NOTIFICATIONS TAB ───────────────────────────────────── */}
              {activeTab === "notifications" && (
                <div className="space-y-6">
                  <h2
                    className="text-2xl font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Notification Preferences
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        label: "Email Notifications",
                        sub: "Analysis results and weekly reports",
                        value: emailNotifs,
                        onChange: () => setEmailNotifs(!emailNotifs),
                      },
                      {
                        label: "Push Notifications",
                        sub: "In-app alerts and reminders",
                        value: pushNotifs,
                        onChange: () => setPushNotifs(!pushNotifs),
                      },
                      {
                        label: "Routine Reminders",
                        sub: "Daily AM/PM routine reminders",
                        value: routineReminders,
                        onChange: () => setRoutineReminders(!routineReminders),
                      },
                      {
                        label: "Weekly Report",
                        sub: "Weekly skin score and progress summary",
                        value: weeklyReport,
                        onChange: () => setWeeklyReport(!weeklyReport),
                      },
                      {
                        label: "Product Updates",
                        sub: "New products matching your skin profile",
                        value: productUpdates,
                        onChange: () => setProductUpdates(!productUpdates),
                      },
                    ].map(({ label, sub, value, onChange }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between p-4 rounded-2xl"
                        style={{ background: "var(--bg-subtle)" }}
                      >
                        <div>
                          <p
                            className="text-sm font-light"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {label}
                          </p>
                          <p
                            className="text-xs font-light mt-0.5"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {sub}
                          </p>
                        </div>
                        <ToggleSwitch enabled={value} onChange={onChange} />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleSaveNotifications}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 text-white rounded-xl text-sm font-light hover:shadow-lg transition-all disabled:opacity-60"
                    style={{
                      background: "linear-linear(135deg, #8b7355, #6d5a43)",
                    }}
                  >
                    {saving ? (
                      <Loader size={14} className="animate-spin" />
                    ) : (
                      <Save size={14} />
                    )}{" "}
                    Save Preferences
                  </button>
                </div>
              )}

              {/* ── PRIVACY TAB ─────────────────────────────────────────── */}
              {activeTab === "privacy" && (
                <div className="space-y-6">
                  <h2
                    className="text-2xl font-light"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Privacy & Security
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        label: "Data Sharing",
                        sub: "Share anonymised skin data to improve AI",
                        value: dataSharing,
                        onChange: () => setDataSharing(!dataSharing),
                      },
                      {
                        label: "Image Storage",
                        sub: "Store uploaded skin photos on secure servers",
                        value: imageStorage,
                        onChange: () => setImageStorage(!imageStorage),
                      },
                      {
                        label: "Analytics",
                        sub: "Help us improve the app with usage analytics",
                        value: analyticsOptIn,
                        onChange: () => setAnalyticsOptIn(!analyticsOptIn),
                      },
                    ].map(({ label, sub, value, onChange }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between p-4 rounded-2xl"
                        style={{ background: "var(--bg-subtle)" }}
                      >
                        <div>
                          <p
                            className="text-sm font-light"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {label}
                          </p>
                          <p
                            className="text-xs font-light mt-0.5"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {sub}
                          </p>
                        </div>
                        <ToggleSwitch enabled={value} onChange={onChange} />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleSavePrivacy}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 text-white rounded-xl text-sm font-light hover:shadow-lg transition-all disabled:opacity-60"
                    style={{
                      background: "linear-linear(135deg, #8b7355, #6d5a43)",
                    }}
                  >
                    {saving ? (
                      <Loader size={14} className="animate-spin" />
                    ) : (
                      <Save size={14} />
                    )}{" "}
                    Save Privacy Settings
                  </button>

                  <div
                    className="pt-6 border-t space-y-3"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <h3
                      className="text-base font-light"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Data Management
                    </h3>
                    <button
                      onClick={handleExport}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-light transition-all border"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <Download size={15} /> Export My Data
                    </button>
                    <p
                      className="text-xs font-light"
                      style={{ color: "var(--text-faint)" }}
                    >
                      Downloads all your profile, analyses and routine history
                      as JSON.
                    </p>
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
