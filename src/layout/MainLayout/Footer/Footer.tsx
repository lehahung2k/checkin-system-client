import React from "react";
import "./Footer.scss";
import {FaLocationArrow, FaMobileAlt, FaEnvelope} from "react-icons/fa";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
      <div className="footer">
        <div className="footer-content">
          <div className="col">
            <div className="title">Giới thiệu</div>
            <div className="text">
              Hệ thống check-in đa điểm dành cho các sự kiện, hội nghị, triển lãm
            </div>
          </div>
          <div className="col">
            <div className="title">Liên hệ</div>
            <div className="c-item">
              <FaLocationArrow/>
              <div className="text">
                Văn phòng Bộ môn Kỹ thuật máy tính 802, Tòa nhà B1, Đại học Bách khoa Hà Nội
              </div>
            </div>
            <div className="c-item">
              <FaMobileAlt/>
              <div className="text">Sđt: </div>
            </div>
            <div className="c-item">
              <FaEnvelope/>
              <div className="text">Email: ecm@gmail.com</div>
            </div>
          </div>
          <div className="col">
            <div className="title">Tính năng</div>
            <span className="text">Quản lý sự kiện</span>
            <span className="text">Check-in khách tham quan</span>
            <span className="text">Thống kê, báo cáo</span>
            <span className="text">Trích xuất dữ liệu</span>
          </div>
          <div className="col">
            <div className="title">Đội ngũ phát triển</div>
            <span className="text"><a href="https://www.facebook.com/vudinh.hieu.125" target='_blank'>Vũ Đình Hiếu</a></span>
            <span className="text"><a href="https://www.facebook.com/lehahung2000" target="_blank">Lê Hà Hưng</a></span>
            <span className="text"><a href="https://www.facebook.com/profile.php?id=100014412548766" target="_blank">Nguyễn Đình Dương</a></span>
          </div>
        </div>
        <div className="bottom-bar">
          <div className="bottom-bar-content">
                    <span className="text">
                        Copyright © {new Date().getFullYear()} references
                      <a href="https://www.facebook.com/nguyenductien000/" target='_blank' className="footer-text"> MSc. Nguyen Duc Tien</a>
                    </span>
          </div>
        </div>
      </div>
  );
}

export default Footer;
