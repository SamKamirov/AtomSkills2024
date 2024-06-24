import React from "react";
import { Link } from "react-router-dom";

export const Sertificates = () => {
  const handleClick = () => {
    print();
  };

  return (
    <section className="sertificate">
      <div className="link-to-dashboard">
        <Link to={'dashboard'}>
          <h2>На главную</h2>
        </Link>
      </div>
      <section className="template">
        <div class="container" onClick={handleClick}>
          <div class="logo">
            WeldingAndSons
          </div>

          <div class="marquee">
            Certificate of Completion
          </div>

          <div class="assignment">
            This certificate is presented to
          </div>

          <div class="person">
            Joe Nathan
          </div>

          <div class="reason">
            For deftly defying the laws of gravity<br />
            and flying high
          </div>
        </div>
      </section>
    </section>
  )
}
