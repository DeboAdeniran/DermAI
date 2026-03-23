/* eslint-disable no-empty */
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
  Sun,
  Moon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { notifications as notifApi, getUser } from "../../services/api";
import { useTheme } from "../../context/ThemeContext";

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
  const { isDark, toggle: toggleTheme } = useTheme();

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
    } catch {
    } finally {
      setNotifLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

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
    } catch {}
  };

  const handleMarkAllRead = async () => {
    try {
      await notifApi.markAllRead();
      setNotifList((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch {}
  };

  const handleDelete = async (id) => {
    const wasUnread = notifList.find((n) => n._id === id)?.isRead === false;
    try {
      await notifApi.delete(id);
      setNotifList((prev) => prev.filter((n) => n._id !== id));
      if (wasUnread) setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {}
  };

  const avatarLetter = userName
    ? String(userName).charAt(0).toUpperCase()
    : "U";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div
          className="backdrop-blur-md rounded-full shadow-lg border transition-colors"
          style={{
            background: isDark
              ? "rgba(30,27,24,0.92)"
              : "rgba(255,255,255,0.92)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between h-14 px-4 sm:px-6">
            {/* Logo */}
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 group shrink-0"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-all"
                style={{
                  background: "linear-gradient(135deg, #8b7355, #6d5a43)",
                }}
              >
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
              <span
                className="font-light text-base hidden sm:block"
                style={{ color: "var(--text-primary)" }}
              >
                derm<span style={{ color: "var(--brand)" }}>AI</span>
              </span>
            </button>

            {/* Center nav — desktop */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.key}
                  onClick={() => navigate(link.path)}
                  className="px-3.5 py-1.5 rounded-full text-sm font-light transition-all"
                  style={
                    currentPage === link.key
                      ? {
                          background: "var(--text-primary)",
                          color: "var(--bg-base)",
                        }
                      : { color: "var(--text-secondary)" }
                  }
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-1.5">
              {/* ── Theme toggle (desktop) ─────────────────────────────── */}
              <button
                onClick={toggleTheme}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="hidden sm:flex w-9 h-9 rounded-full items-center justify-center transition-all hover:scale-110"
                style={{ background: "var(--bg-muted)" }}
              >
                {isDark ? (
                  <Sun size={15} className="text-amber-400" />
                ) : (
                  <Moon size={15} className="text-indigo-400" />
                )}
              </button>

              {/* ── Notifications ─────────────────────────────────────── */}
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => {
                    setNotifOpen((o) => !o);
                    setProfileOpen(false);
                  }}
                  className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: notifOpen ? "var(--bg-muted)" : "transparent",
                  }}
                >
                  <Bell size={18} style={{ color: "var(--text-secondary)" }} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-medium px-1 animate-pulse">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification dropdown */}
                {notifOpen && (
                  <div
                    className="absolute right-0 top-11 w-80 rounded-2xl shadow-2xl border overflow-hidden z-50"
                    style={{
                      background: "var(--bg-surface)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div
                      className="flex items-center justify-between px-4 py-3 border-b"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <div className="flex items-center gap-2">
                        <h3
                          className="text-sm font-normal"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <span
                            className="text-xs text-white px-2 py-0.5 rounded-full font-light"
                            style={{ background: "var(--brand)" }}
                          >
                            {unreadCount}
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={handleMarkAllRead}
                          className="text-xs font-light flex items-center gap-1"
                          style={{ color: "var(--brand)" }}
                        >
                          <Check size={12} /> Mark all read
                        </button>
                      )}
                    </div>

                    {/* List */}
                    <div className="max-h-80 overflow-y-auto">
                      {notifLoading && notifList.length === 0 ? (
                        <div className="py-8 text-center">
                          <div
                            className="w-5 h-5 border-2 rounded-full animate-spin mx-auto"
                            style={{
                              borderColor: "var(--bg-muted)",
                              borderTopColor: "var(--brand)",
                            }}
                          />
                        </div>
                      ) : notifList.length === 0 ? (
                        <div className="py-10 text-center">
                          <Bell
                            size={28}
                            className="mx-auto mb-2"
                            style={{ color: "var(--border)" }}
                          />
                          <p
                            className="text-sm font-light"
                            style={{ color: "var(--brand)" }}
                          >
                            All caught up!
                          </p>
                          <p
                            className="text-xs font-light mt-1"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            No notifications yet
                          </p>
                        </div>
                      ) : (
                        notifList.map((notif) => (
                          <div
                            key={notif._id}
                            className="flex items-start gap-3 px-4 py-3 transition-all border-b last:border-0"
                            style={{
                              background: !notif.isRead
                                ? "var(--bg-subtle)"
                                : "transparent",
                              borderColor: "var(--border)",
                            }}
                          >
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: "var(--bg-muted)" }}
                            >
                              <NotificationIcon type={notif.type} />
                            </div>
                            <div
                              className="flex-1 min-w-0 cursor-pointer"
                              onClick={() =>
                                !notif.isRead && handleMarkRead(notif._id)
                              }
                            >
                              <p
                                className="text-xs leading-snug font-light"
                                style={{ color: "var(--text-primary)" }}
                              >
                                {notif.message}
                              </p>
                              <p
                                className="text-[10px] font-light mt-0.5 opacity-70"
                                style={{ color: "var(--brand)" }}
                              >
                                {timeAgo(notif.createdAt)}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              {!notif.isRead && (
                                <button
                                  onClick={() => handleMarkRead(notif._id)}
                                  className="w-5 h-5 rounded-full flex items-center justify-center transition-all"
                                  style={{
                                    background: "var(--bg-muted)",
                                    color: "var(--brand)",
                                  }}
                                >
                                  <Check size={10} />
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(notif._id)}
                                className="w-5 h-5 rounded-full flex items-center justify-center transition-all hover:bg-red-50 hover:text-red-400"
                                style={{ color: "var(--text-faint)" }}
                              >
                                <Trash2 size={10} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div
                      className="px-4 py-2.5 border-t"
                      style={{
                        background: "var(--bg-subtle)",
                        borderColor: "var(--border)",
                      }}
                    >
                      <button
                        onClick={() => {
                          navigate("/notifications");
                          setNotifOpen(false);
                        }}
                        className="w-full text-xs font-light text-center hover:underline"
                        style={{ color: "var(--brand)" }}
                      >
                        View all notifications →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Profile dropdown ──────────────────────────────────── */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => {
                    setProfileOpen((o) => !o);
                    setNotifOpen(false);
                  }}
                  className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full transition-all hover:scale-105"
                  style={{
                    background: profileOpen ? "var(--bg-muted)" : "transparent",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-light"
                    style={{
                      background: "linear-gradient(135deg, #8b7355, #6d5a43)",
                    }}
                  >
                    {avatarLetter}
                  </div>
                  <span
                    className="hidden sm:block text-sm font-light max-w-25 truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {userName || "Profile"}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`hidden sm:block transition-transform ${profileOpen ? "rotate-180" : ""}`}
                    style={{ color: "var(--brand)" }}
                  />
                </button>

                {profileOpen && (
                  <div
                    className="absolute right-0 top-11 w-52 rounded-2xl shadow-xl border overflow-hidden z-50"
                    style={{
                      background: "var(--bg-surface)",
                      borderColor: "var(--border)",
                    }}
                  >
                    <div
                      className="px-4 py-3 border-b"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <p
                        className="text-sm font-light truncate"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {userName || "User"}
                      </p>
                      <p
                        className="text-xs font-light"
                        style={{ color: "var(--brand)" }}
                      >
                        DermAI member
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onUpdateProfile?.();
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-light transition-all hover:bg-(--bg-subtle)"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <User size={14} style={{ color: "var(--brand)" }} /> Edit
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        navigate("/settings");
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-light transition-all hover:bg-(--bg-subtle)"
                      style={{ color: "var(--text-primary)" }}
                    >
                      <Settings size={14} style={{ color: "var(--brand)" }} />{" "}
                      Settings
                    </button>
                    {/* Theme toggle inside dropdown */}
                    <button
                      onClick={() => {
                        toggleTheme();
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm font-light transition-all hover:bg-(--bg-subtle)"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {isDark ? (
                        <Sun size={14} className="text-amber-400" />
                      ) : (
                        <Moon size={14} className="text-indigo-400" />
                      )}
                      {isDark ? "Light mode" : "Dark mode"}
                    </button>
                    <div
                      className="border-t"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <button
                        onClick={() => navigate("/login")}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-red-500 font-light transition-all hover:bg-red-50"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: "var(--bg-muted)",
                  color: "var(--text-primary)",
                }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="lg:hidden mt-2 rounded-2xl shadow-xl border overflow-hidden"
            style={{
              background: "var(--bg-surface)",
              borderColor: "var(--border)",
            }}
          >
            <div className="p-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.key}
                  onClick={() => {
                    navigate(link.path);
                    setMobileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-light transition-all"
                  style={
                    currentPage === link.key
                      ? {
                          background: "var(--text-primary)",
                          color: "var(--bg-base)",
                        }
                      : { color: "var(--text-primary)" }
                  }
                >
                  {link.label}
                </button>
              ))}
              {/* Theme toggle in mobile menu */}
              <button
                onClick={() => {
                  toggleTheme();
                  setMobileOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-light transition-all flex items-center gap-3"
                style={{ color: "var(--text-primary)" }}
              >
                {isDark ? (
                  <Sun size={15} className="text-amber-400" />
                ) : (
                  <Moon size={15} className="text-indigo-400" />
                )}
                {isDark ? "Switch to light mode" : "Switch to dark mode"}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
