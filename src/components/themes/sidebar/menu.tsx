interface Children {
  icon?: string;
  path?: string;
  title: string;
  type?: string;
  blank?: string;
  children?: Array<Children>;
}
export interface Menu {
  path: string;
  icon: string;
  title: string;
  type?: string;
  exact?: any;
  navheader?: boolean;
  children?: Array<Children>;
}
const menu: Array<Menu> = [
  {
    path: "/home",
    icon: "nav-icon fa fa-home",
    title: "Home"
  },
  {
    path: "/",
    icon: "nav-icon fa fa-exchange",
    title: "Deposit / Withdraw",
    children: [
      {
        path: "/deposit",        
        title: "Deposit"
      },
      {
        path: "/withdraw",
        title: "Withdraw"
      }
    ]
  },  
  {
    path: "/deposit-withdraw-history",
    icon: "nav-icon fa fa-history",
    title: "Deposit / Withdraw History"
  },
  {
    path: "/",
    icon: "nav-icon fa fa-exchange",
    title: "Transfer",
    children: [
      {
        path: "/transfer",        
        title: "Transfer"
      }
    ]
  },
  {
    path: "/transfer-history",
    icon: "nav-icon fa fa-history",
    title: "Transfer History"
  },
  {
    path: "/receive-history",
    icon: "nav-icon fa fa-history",
    title: "Receive History"
  }  
];

export default menu;
