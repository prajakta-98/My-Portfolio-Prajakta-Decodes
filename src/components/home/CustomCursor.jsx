export default function CustomCursor() {
  return (
    <>
      <div id="cur" aria-hidden="true">
        <svg
          className="cursor-arrow"
          viewBox="0 0 44 52"
          focusable="false"
        >
          <path
            className="cursor-arrow-shadow"
            d="M7 4v34l9-7 6 15 8-3-6-15h12L7 4Z"
          />
          <path
            className="cursor-arrow-fill"
            d="M5 2v34l9-7 6 15 8-3-6-15h12L5 2Z"
          />
          <path
            className="cursor-arrow-shine"
            d="M10 10v19l4-3 4 9 3-1-5-12h7L10 10Z"
          />
        </svg>
        <span className="cursor-spark cursor-spark-one"></span>
        <span className="cursor-spark cursor-spark-two"></span>
        <span className="cursor-spark cursor-spark-three"></span>
      </div>
      <div id="cur-ring" aria-hidden="true"></div>
    </>
  );
}
