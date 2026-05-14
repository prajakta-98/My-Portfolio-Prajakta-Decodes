const iconPaths = {
  camera: (
    <>
      <path d="M4 8.5h3l1.4-2h7.2l1.4 2h3v9.5H4z" />
      <circle cx="12" cy="13" r="3.2" />
      <path d="M17.5 10.2h.1" />
    </>
  ),
  music: (
    <>
      <path d="M10 17.5a2.4 2.4 0 1 1-1.2-2.1V6.5l9-2v9" />
      <path d="M18 15.5a2.4 2.4 0 1 1-1.2-2.1" />
      <path d="M8.8 9.3l9-2" />
    </>
  ),
  chef: (
    <>
      <path d="M8 10.2A3 3 0 1 1 11.2 6a3.4 3.4 0 0 1 6.2 1.9A3 3 0 1 1 18 13H6a3 3 0 0 1 2-5.3" />
      <path d="M7 13v5.5h10V13" />
      <path d="M9.5 16h5" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3l1.8 5.1L19 10l-5.2 1.9L12 17l-1.8-5.1L5 10l5.2-1.9z" />
      <path d="M5 16l.8 2.2L8 19l-2.2.8L5 22l-.8-2.2L2 19l2.2-.8z" />
    </>
  ),
  cursor: (
    <>
      <path d="M6 4l12 8-5.5 1.1L10 19z" />
      <path d="M12.5 13.1l3.4 5.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  mail: (
    <>
      <path d="M4 6h16v12H4z" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  send: (
    <>
      <path d="M4 12L20 4l-5 16-3-7z" />
      <path d="M12 13l8-9" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16" />
      <path d="M12 4a12 12 0 0 1 0 16" />
      <path d="M12 4a12 12 0 0 0 0 16" />
    </>
  ),
  design: (
    <>
      <path d="M4 7h16" />
      <path d="M7 4v16" />
      <path d="M4 17h16" />
      <path d="M17 4v16" />
    </>
  ),
  code: (
    <>
      <path d="M9 7l-4 5 4 5" />
      <path d="M15 7l4 5-4 5" />
      <path d="M13 5l-2 14" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  layout: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M4 10h16" />
      <path d="M10 10v9" />
    </>
  ),
  monitor: (
    <>
      <rect x="4" y="5" width="16" height="12" rx="2" />
      <path d="M9 21h6" />
      <path d="M12 17v4" />
    </>
  ),
  launch: (
    <>
      <path d="M12 3c3.2 1.4 5.6 4.1 6.5 7.5L14 15l-5-5z" />
      <path d="M9 10l-4 1 3 3" />
      <path d="M14 15l-1 4-3-3" />
      <path d="M7 17l-3 3" />
    </>
  ),
};

export default function SiteIcon({ name, className = "", size = 20 }) {
  return (
    <svg
      className={`site-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {iconPaths[name]}
    </svg>
  );
}
