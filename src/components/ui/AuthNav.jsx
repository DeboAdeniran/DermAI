/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import {
  Bell,
  Menu,
  X,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Check,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { notifications as notifApi, getUser } from "../../services/api";

const NAV_LINKS = [
  { label: "Dashboard", path: "/dashboard", key: "dashboard" },
  { label: "New Analysis", path: "/analysis", key: "analysis" },
  { label: "Products", path: "/products", key: "products" },
  { label: "My Routines", path: "/routine", key: "routine" },
  { label: "Learn", path: "/learn", key: "learn" },
];

function timeAgo(date) {
  const s = Math.floor((Date.now() - new Date(date)) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

function NotificationIcon({ type }) {
  const icons = {
    analysis: "🧬",
    routine: "✨",
    streak: "🔥",
    product: "🛍️",
    tip: "💡",
    system: "📢",
  };
  return <span className="text-base leading-none">{icons[type] || "📬"}</span>;
}

export function AuthNav({
  currentPage,
  userName: userNameProp,
  onUpdateProfile,
}) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifList, setNotifList] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifLoading, setNotifLoading] = useState(false);
  // FIX: read name from localStorage directly so it refreshes after ProfileUpdateModal saves
  const [liveUserName, setLiveUserName] = useState(
    () => getUser()?.name || userNameProp || "",
  );
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // FIX: listen for user:updated event dispatched by ProfileUpdateModal after save
  useEffect(() => {
    const handleUserUpdate = () => {
      const updated = getUser();
      if (updated?.name) setLiveUserName(updated.name);
    };
    window.addEventListener("user:updated", handleUserUpdate);
    return () => window.removeEventListener("user:updated", handleUserUpdate);
  }, []);

  // Sync if parent prop changes (e.g. after login)
  useEffect(() => {
    if (userNameProp) setLiveUserName(userNameProp);
  }, [userNameProp]);

  // Use liveUserName in place of userName everywhere below
  const userName = liveUserName;

  // ── Fetch notifications ────────────────────────────────────────────────────
  const fetchNotifications = async () => {
    setNotifLoading(true);
    try {
      const data = await notifApi.getAll(1, 15);
      setNotifList(data?.notifications || []);
      setUnreadCount(data?.unreadCount || 0);
    } catch (e) {
      // Silent fail — user may not be logged in yet
    } finally {
      setNotifLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  // ── Close dropdowns on outside click ──────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target))
        setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await notifApi.markRead(id);
      setNotifList((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (e) {}
  };

  const handleMarkAllRead = async () => {
    try {
      await notifApi.markAllRead();
      setNotifList((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (e) {}
  };

  const handleDelete = async (id) => {
    const wasUnread = notifList.find((n) => n._id === id)?.isRead === false;
    try {
      await notifApi.delete(id);
      setNotifList((prev) => prev.filter((n) => n._id !== id));
      if (wasUnread) setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (e) {}
  };

  // Safe first-letter avatar — handles null/undefined userName
  const avatarLetter = userName
    ? String(userName).charAt(0).toUpperCase()
    : "U";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-[#e8e6e3]/40">
          <div className="flex items-center justify-between h-14 px-4 sm:px-6">
            {/* Logo */}
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 group shrink-0"
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              </div>
              <span className="text-[#2a2420] font-light text-base hidden sm:block">
                derm<span className="text-[#8b7355]">AI</span>
              </span>
            </button>

            {/* Center Nav — Desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.key}
                  onClick={() => navigate(link.path)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-light transition-all ${
                    currentPage === link.key
                      ? "bg-[#2a2420] text-white shadow-sm"
                      : "text-[#5a5450] hover:text-[#2a2420] hover:bg-[#f8f6f3]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* ── Notification Bell ─────────────────────────────────────── */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => {
                    setNotifOpen((o) => !o);
                    setProfileOpen(false);
                  }}
                  className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                    notifOpen ? "bg-[#f8f6f3]" : "hover:bg-[#f8f6f3]"
                  }`}
                >
                  <Bell size={18} className="text-[#5a5450]" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium px-1 animate-pulse">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification dropdown */}
                {notifOpen && (
                  <div
                    className="fixed left-2 right-2 top-20 sm:absolute sm:left-auto sm:right-0 sm:top-11 sm:w-80 rounded-2xl shadow-2xl overflow-hidden z-60"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8e6e3]">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm text-[#2a2420] font-normal">
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <span className="text-xs bg-[#8b7355] text-white px-2 py-0.5 rounded-full font-light">
                            {unreadCount}
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-xs text-[#8b7355] hover:text-[#6d5a43] font-light flex items-center gap-1"
                        >
                          <Check size={12} /> Mark all read
                        </button>
                      )}
                    </div>

                    {/* List */}
                    <div className="max-h-80 overflow-y-auto">
                      {notifLoading && notifList.length === 0 ? (
                        <div className="py-8 text-center">
                          <div className="w-5 h-5 border-2 border-[#8b7355]/30 border-t-[#8b7355] rounded-full animate-spin mx-auto" />
                        </div>
                      ) : notifList.length === 0 ? (
                        <div className="py-10 text-center">
                          <Bell
                            size={28}
                            className="text-[#e8e6e3] mx-auto mb-2"
                          />
                          <p className="text-sm text-[#8b7355] font-light">
                            All caught up!
                          </p>
                          <p className="text-xs text-[#5a5450] font-light mt-1">
                            No notifications yet
                          </p>
                        </div>
                      ) : (
                        notifList.map((notif) => (
                          <div
                            key={notif._id}
                            className={`flex items-start gap-3 px-4 py-3 hover:bg-[#fafaf9] transition-all border-b border-[#f0ede9] last:border-0 ${!notif.isRead ? "bg-[#fdf9f5]" : ""}`}
                          >
                            <div className="w-8 h-8 rounded-full bg-[#f8f6f3] flex items-center justify-center shrink-0 mt-0.5">
                              <NotificationIcon type={notif.type} />
                            </div>
                            <div
                              className="flex-1 min-w-0"
                              onClick={() =>
                                !notif.isRead && handleMarkRead(notif._id)
                              }
                            >
                              <p
                                className={`text-xs leading-snug ${!notif.isRead ? "text-[#2a2420] font-normal" : "text-[#5a5450] font-light"}`}
                              >
                                {notif.message}
                              </p>
                              <p className="text-[10px] text-[#8b7355] font-light mt-0.5 opacity-70">
                                {timeAgo(notif.createdAt)}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              {!notif.isRead && (
                                <button
                                  onClick={() => handleMarkRead(notif._id)}
                                  className="w-5 h-5 rounded-full bg-[#8b7355]/10 hover:bg-[#8b7355] hover:text-white text-[#8b7355] flex items-center justify-center transition-all"
                                >
                                  <Check size={10} />
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(notif._id)}
                                className="w-5 h-5 rounded-full hover:bg-red-50 text-[#5a5450]/40 hover:text-red-400 flex items-center justify-center transition-all"
                              >
                                <Trash2 size={10} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-2.5 border-t border-[#e8e6e3] bg-[#fafaf9]">
                      <button
                        onClick={() => {
                          navigate("/notifications");
                          setNotifOpen(false);
                        }}
                        className="w-full text-xs text-[#8b7355] font-light text-center hover:underline"
                      >
                        View all notifications →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Profile ───────────────────────────────────────────────── */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => {
                    setProfileOpen((o) => !o);
                    setNotifOpen(false);
                  }}
                  className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-[#f8f6f3] transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-linear-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center text-white text-xs font-light">
                    {avatarLetter}
                  </div>
                  <span className="hidden sm:block text-sm text-[#2a2420] font-light max-w-25 truncate">
                    {userName || "Profile"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-[#8b7355] transition-transform hidden sm:block ${profileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {profileOpen && (
                  <div
                    className="fixed right-2 top-20 sm:absolute sm:right-0 sm:top-11 sm:w-48 w-56 rounded-2xl shadow-xl overflow-hidden z-60"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="px-4 py-3 border-b border-[#e8e6e3]">
                      <p className="text-sm text-[#2a2420] font-light truncate">
                        {userName || "User"}
                      </p>
                      <p className="text-xs text-[#8b7355] font-light">
                        DermAI member
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onUpdateProfile?.();
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#f8f6f3] text-left text-sm text-[#2a2420] font-light transition-all"
                    >
                      <User size={14} className="text-[#8b7355]" /> Edit Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/settings");
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#f8f6f3] text-left text-sm text-[#2a2420] font-light transition-all"
                    >
                      <Settings size={14} className="text-[#8b7355]" /> Settings
                    </button>
                    <div className="border-t border-[#e8e6e3]">
                      <button
                        onClick={() => navigate("/login")}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-left text-sm text-red-500 font-light transition-all"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f8f6f3] transition-all"
              >
                {mobileOpen ? (
                  <X size={18} className="text-[#2a2420]" />
                ) : (
                  <Menu size={18} className="text-[#2a2420]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-[#e8e6e3]/40 overflow-hidden">
            <div className="p-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.key}
                  onClick={() => {
                    navigate(link.path);
                    setMobileOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-light transition-all ${
                    currentPage === link.key
                      ? "bg-[#2a2420] text-white"
                      : "text-[#2a2420] hover:bg-[#f8f6f3]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
