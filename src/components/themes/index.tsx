import {
  RecoilEnv,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from "recoil";

const Footer = lazy(() => import("./footer"));
const Header = lazy(() => import("./header"));
const Sidebar = lazy(() => import("./sidebar"));

import { themesSetting } from "@/recoil";
import { screenSize, toggleSidebarMenu } from "../utils";
import {
  LoadingApp,
  addWindowClass,
  calculateWindowSize,
  getItem,
  removeWindowClass,
  useWindowSize
} from "../utils/function";
import { Suspense, lazy, useEffect, useState } from "react";
import { withRouter } from "next/router";
import useBalance from "@/hooks/useBalance";
import axiosInstance from "@/libs/axiosInstance";
import Swal from "sweetalert2";

const Layout = ({ children, router }: any) => {
  const { setBalance } = useBalance();
  const theme = useRecoilValue(themesSetting);
  const screen = useRecoilValue(screenSize);
  const sidebar = useRecoilValue(toggleSidebarMenu);
  const setSizeValue = useSetRecoilState(screenSize);
  const [valueHideSidebar, setHideSidebar] = useRecoilState(toggleSidebarMenu);

  const handleToggleMenuSidebar = () => {
    setHideSidebar({
      menuSidebarCollapsed: !valueHideSidebar.menuSidebarCollapsed
    });
  };

  const windowSize = useWindowSize();
  const setTheme = useSetRecoilState(themesSetting);
  const [loading, setloading] = useState(true);

  const fetchData = async (accounId: string) => {
    try {
      const response = await axiosInstance.get(`/account/${Number(accounId)}`);
      if (response.status == 200) {
        setBalance(parseFloat(response.data.tranferRemain))
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

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
       router.push('/login')
     }

    removeWindowClass("sidebar-closed");
    removeWindowClass("sidebar-collapse");
    removeWindowClass("sidebar-open");

    const size = calculateWindowSize(windowSize.width);
    if (screen.screenSize !== size) {
      setSizeValue({ screenSize: size });
    }

    if (sidebar.menuSidebarCollapsed && screen.screenSize === "lg") {
      addWindowClass("sidebar-collapse");
    } else if (sidebar.menuSidebarCollapsed && screen.screenSize === "xs") {
      addWindowClass("sidebar-open");
    } else if (!sidebar.menuSidebarCollapsed && screen.screenSize !== "lg") {
      addWindowClass("sidebar-closed");
      addWindowClass("sidebar-collapse");
    }

    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, [windowSize, sidebar, setTheme, screen.screenSize, setSizeValue, router]);

  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

  return (
    <Suspense fallback={<LoadingApp />}>
      <div className="wrapper">
        {theme.header && <Header />}
        {theme.sidebar && <Sidebar />}
        {theme.content && children}
        {theme.footer && <Footer />}

        <div
          id="sidebar-overlay"
          role="presentation"
          onClick={handleToggleMenuSidebar}
          onKeyDown={() => { }}
        />
      </div>
      {loading && <LoadingApp />}
    </Suspense>
  );
};

export default withRouter(Layout);
