export default function Loader() {
  return (
    <>
      <div id="site-loader" aria-hidden="true">
            <div className="loader-inner">
              <div className="loader-stage">
                <div className="loader-ring outer"></div>
                <div className="loader-ring middle"></div>
                <div className="loader-ring inner"></div>
                <div className="loader-ring pulse"></div>
                <div className="loader-crosshair"></div>
                <div className="loader-orbit">
                  <span className="loader-node"></span>
                  <span className="loader-node"></span>
                </div>
                <div className="loader-orbit reverse">
                  <span className="loader-node"></span>
                  <span className="loader-node"></span>
                </div>
                <div className="loader-core"></div>
                <div className="loader-grid">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="loader-readout" aria-hidden="true">
                  <div><strong>Mode</strong><span>UI.SYSTEM</span></div>
                  <div><strong>Status</strong><span>Booting</span></div>
                  <div><strong>Signal</strong><span>Stable</span></div>
                </div>
              </div>
              <div className="loader-copy">
                <div className="loader-kicker">Prajakta Bansod</div>
                <div className="loader-title">BEYOND <span className="accent">THE</span> CODE</div>
                <div className="loader-sub">initiating interface layer</div>
              </div>
              <div className="loader-progress" aria-hidden="true"><span></span></div>
            </div>
          </div>
    </>
  );
}
