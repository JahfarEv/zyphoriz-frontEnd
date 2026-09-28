import React from "react";

export const LoadingScreen = ({ message = "Getting things ready..." }) => (
  <main className="nexora-loading" role="status" aria-live="polite">
    <div className="nexora-loader__visual" aria-hidden="true">
      <div className="nexora-loader__orbit" />
      <div className="nexora-loader__orbit nexora-loader__orbit--inner" />
      <div className="nexora-loader__mark">Z</div>
      <span className="nexora-loader__spark" />
    </div>
    <p className="nexora-loader__brand">ZYPHORIZ</p>
    <p className="nexora-loader__message">{message}</p>
    <div className="nexora-loader__track" aria-hidden="true">
      <span />
    </div>
  </main>
);