import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { removeItem, toggleSidebarMenu } from "../utils";
import { withRouter } from "next/router";
import useBalance from "@/hooks/useBalance";
import axiosInstance from "@/libs/axiosInstance";
import Swal from "sweetalert2";

const Header = (props: any) => {
  const { balance, setBalance } = useBalance();
  const [fname, setFName] = useState('');
  const [valueHideSidebar, setHideSidebar] = useRecoilState(toggleSidebarMenu);

  const handleToggleMenuSidebar = () => {
    setHideSidebar({
      menuSidebarCollapsed: !valueHideSidebar.menuSidebarCollapsed
    });
  };
  const [menu, setMenu] = useState(false);

  const fetchData = async (accounId: string) => {
    try {
      const response = await axiosInstance.get(`/account/${Number(accounId)}`);
      if (response.status == 200) {
        console.log(response);        
        setBalance(parseFloat(response.data.balance))
      }
    } catch (err) {
      const errData = (err as any)?.response?.data;

      Swal.fire({
        text: `${errData?.errCode} : ${errData?.errMsg}`,
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
    }
  }

  const toggleMenu = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    const json = localStorage.getItem('userData') || '';
    if (json) {
      const userData = JSON.parse(json);
      if (userData) {
        setFName(userData.name);
        fetchData(userData.accountID);
      }
    }
  }, [])

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <span
            className="nav-link"
            onClick={handleToggleMenuSidebar}
            data-widget="pushmenu"
            aria-label="Menu Hide Bar"
            role="button"
          >
            <i className="fas fa-bars" />
          </span>
        </li>
      </ul>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <div className="nav-item d-flex flex align-items-center" onMouseEnter={toggleMenu}>
            <div className="nav-link user-action">
              <img
                src="https://www.tutorialrepublic.com/examples/images/avatar/2.jpg"
                className="avatarProfile"
                alt="Avatar"
              />{" "}
              {fname} <b className="caret">Balance : {balance.toLocaleString()}</b>
            </div>
            <div className="nav-item">
              <button
                type="button"
                className="dropdown-item"
                onClick={() => {
                  props.router.push("/login");
                  localStorage.clear();
                }}
              >
                <i className="nav-icon fas fa-arrow-right-from-bracket"></i>{" "}
                Logout
              </button>
            </div>            
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default withRouter(Header);
