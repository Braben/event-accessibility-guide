import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { SiYoutube } from "react-icons/si";
import { FaFacebookF } from "react-icons/fa6";
import { LiaSlackHash } from "react-icons/lia";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-horizontal footer-center bg-primary text-primary-content p-10">
        <aside>
          <LiaSlackHash className="size-16" />
          <p className="font-bold">
            EventsHub Ltd.
            <br />
            <a href="mailto:info@eventshub.com">Reach us: info@eventshub.com</a>
          </p>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaXTwitter className="size-6" />
            </a>
            <a>
              <SiYoutube className="size-6 " />
            </a>
            <a>
              <FaFacebookF className="size-6 " />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
