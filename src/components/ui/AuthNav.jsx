/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import {
  LayoutGrid,
  Camera,
  ShoppingCart,
  Layers,
  Bell,
  User,
  Clock,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AuthNav({ currentPage, userName, onUpdateProfile }) {
  const navigate = useNavigate();
  const [isNotificationsDropdownOpen, setIsNotificationsDropdownOpen] =
    useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const notificationsRef = useRef(null);
  const userMenuRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setIsNotificationsDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    {
      label: "Dashboard",
      page: "dashboard",
      icon: <LayoutGrid size={18} />,
    },
    {
      label: "New Analysis",
      page: "analysis",
      icon: <Camera size={18} />,
    },
    {
      label: "Products",
      page: "products",
      icon: <ShoppingCart size={18} />,
    },
    {
      label: "My Routines",
      page: "routine",
      icon: <Layers size={18} />,
    },
  ];

  const handleNavigation = (page) => {
    navigate(page);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div
          className={`flex justify-around rounded-full transition-all ${
            isScrolled
              ? "bg-white/90 backdrop-blur-md shadow-xl"
              : "bg-white/60 backdrop-blur-sm shadow-lg"
          }`}
        >
          <div className="flex justify-between w-full items-center h-14 px-4 sm:px-6">
            {/* Logo */}
            <button
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("navigate", { detail: "home" }),
                )
              }
              className="flex items-center gap-2 group"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-linear-to-br from-[#8b7355] to-[#6d5a43] flex items-center justify-center group-hover:shadow-lg transition-all">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
              <span className="text-[#2a2420] font-light tracking-tight text-sm sm:text-base">
                <span className="text-[#2a2420]">derm</span>
                <span className="text-[#8b7355]">AI</span>
              </span>
            </button>

            {/* Center Navigation - Hidden on Mobile */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => handleNavigation("/" + item.page)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all font-light ${
                    currentPage === item.page
                      ? "bg-[#8b7355] text-white"
                      : "text-[#5a5450] hover:text-[#2a2420] hover:bg-[#f8f6f3]"
                  }`}
                >
                  <span
                    className={
                      currentPage === item.page
                        ? "text-white"
                        : "text-[#8b7355]"
                    }
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center justify-around">
              <div className="flex items-center gap-2">
                {/* Notifications */}
                <div className="relative" ref={notificationsRef}>
                  <button
                    onClick={() => {
                      setIsNotificationsDropdownOpen(
                        !isNotificationsDropdownOpen,
                      );
                      setIsUserMenuOpen(false);
                    }}
                    className="p-2 rounded-full hover:bg-[#f8f6f3] transition-all relative"
                  >
                    <Bell size={18} className="text-[#5a5450]" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  {/* Notifications Dropdown */}
                  {isNotificationsDropdownOpen && (
                    <NotificationsDropdownInline
                      onClose={() => setIsNotificationsDropdownOpen(false)}
                    />
                  )}
                </div>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(!isUserMenuOpen);
                      setIsNotificationsDropdownOpen(false);
                    }}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-[#8b7355] to-[#6d5a43] text-white flex items-center justify-center hover:shadow-lg transition-all text-sm font-light"
                  >
                    {userName[0]}
                  </button>

                  {/* User Menu Dropdown */}
                  {isUserMenuOpen && (
                    <UserMenuInline
                      userName={userName}
                      onUpdateProfile={() => {
                        onUpdateProfile();
                        setIsUserMenuOpen(false);
                      }}
                      onClose={() => setIsUserMenuOpen(false)}
                    />
                  )}
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden flex items-center gap-2 overflow-x-auto py-3 px-4 scrollbar-hide border-t border-[#e8e6e3]/50">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 rounded-full hover:bg-[#f8f6f3] transition-all"
                >
                  <Menu size={18} className="text-[#5a5450]" />
                </button>

                {isMobileMenuOpen && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#e8e6e3]/50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#e8e6e3]/50">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base sm:text-lg text-[#2a2420] font-light">
                          Menu
                        </h3>
                        <button
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="p-2 rounded-full hover:bg-[#f8f6f3] transition-all"
                        >
                          <X size={18} className="text-[#5a5450]" />
                        </button>
                      </div>
                    </div>

                    <div className="py-2">
                      {navItems.map((item) => (
                        <button
                          key={item.page}
                          onClick={() => handleNavigation("/" + item.page)}
                          className={`w-full px-4 py-2.5 flex items-center gap-3 text-[#2a2420] hover:bg-[#f8f6f3]/50 transition-colors text-left ${
                            currentPage === item.page
                              ? "bg-[#8b7355] text-white"
                              : "text-[#5a5450] hover:text-[#2a2420] hover:bg-[#f8f6f3]"
                          }`}
                        >
                          <span
                            className={
                              currentPage === item.page
                                ? "text-white"
                                : "text-[#8b7355]"
                            }
                          >
                            {item.icon}
                          </span>
                          <span className="text-sm font-light">
                            {item.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </nav>
  );
}

// Inline Notifications Dropdown Component
function NotificationsDropdownInline({ onClose }) {
  const notifications = [
    {
      id: 1,
      type: "routine",
      title: "Time for your PM routine!",
      message: "Don't forget your evening skincare steps",
      time: "30 minutes ago",
      unread: true,
      icon: "🌙",
    },
    {
      id: 2,
      type: "recommendation",
      title: "New products matched for you",
      message: "3 new recommendations based on your skin profile",
      time: "2 hours ago",
      unread: true,
      icon: "✨",
    },
    {
      id: 3,
      type: "achievement",
      title: "7-day streak! 🎉",
      message: "You've completed your routine for 7 days straight",
      time: "1 day ago",
      unread: false,
      icon: "🏆",
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#e8e6e3]/50 overflow-hidden">
      {/* Header */}
      <div className="px-3 sm:px-4 py-3 border-b border-[#e8e6e3]/50">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg text-[#2a2420] font-light">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 bg-[#8b7355] text-white text-xs rounded-full font-light">
              {unreadCount} new
            </span>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-[60vh] sm:max-h-80 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-3 sm:px-4 py-3 border-b border-[#e8e6e3]/50 hover:bg-[#f8f6f3]/50 transition-colors cursor-pointer ${
              notification.unread ? "bg-[#8b7355]/5" : ""
            }`}
          >
            <div className="flex gap-2 sm:gap-3">
              <div className="text-xl sm:text-2xl shrink-0">
                {notification.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 className="text-xs sm:text-sm text-[#2a2420] line-clamp-1 font-light">
                    {notification.title}
                  </h4>
                  {notification.unread && (
                    <div className="w-2 h-2 rounded-full bg-[#8b7355] shrink-0 mt-1"></div>
                  )}
                </div>
                <p className="text-xs text-[#5a5450] mb-1 line-clamp-2 font-light">
                  {notification.message}
                </p>
                <p className="text-xs text-[#8b7355] font-light">
                  {notification.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-3 sm:px-4 py-3 border-t border-[#e8e6e3]/50">
        <button
          onClick={() => {
            alert("Viewing all notifications...");
            onClose();
          }}
          className="w-full text-xs sm:text-sm text-[#8b7355] hover:text-[#2a2420] transition-colors text-center font-light"
        >
          View All Notifications →
        </button>
      </div>
    </div>
  );
}

// Inline User Menu Component
function UserMenuInline({ userName, onUpdateProfile, onClose }) {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <User size={18} />,
      label: "My Profile",
      onClick: () => {
        navigate("/settings");
        onClose();
      },
    },
    {
      icon: <Clock size={18} />,
      label: "Routine History",
      onClick: () => {
        navigate("/routine-history");
        onClose();
      },
    },
  ];

  return (
    <div className="absolute right-0 top-full mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[#e8e6e3]/50 overflow-hidden">
      {/* User Info */}
      <div className="px-4 py-3 border-b border-[#e8e6e3]/50">
        <p className="text-sm text-[#5a5450] mb-0.5 font-light">Signed in as</p>
        <p className="text-[#2a2420] font-light">{userName}</p>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="w-full px-4 py-2.5 flex items-center gap-3 text-[#2a2420] hover:bg-[#f8f6f3]/50 transition-colors text-left"
          >
            <span className="text-[#8b7355]">{item.icon}</span>
            <span className="text-sm font-light">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Logout */}
      <div className="border-t border-[#e8e6e3]/50 py-2">
        <button
          onClick={() => {
            if (confirm("Are you sure you want to log out?")) {
              navigate("/login");
            }
            onClose();
          }}
          className="w-full px-4 py-2.5 flex items-center gap-3 text-red-600 hover:bg-red-50/50 transition-colors text-left"
        >
          <LogOut size={18} />
          <span className="text-sm font-light">Log Out</span>
        </button>
      </div>
    </div>
  );
}
