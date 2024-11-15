import { Card, PanelContent } from "@/components";
import axiosInstance from "@/libs/axiosInstance";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const DepositWithdrawHistory = () => {

  const [depositWithdraws, setDepositWithdraws] = useState<DepositWithdrawHistoryModel[]>([]);

  useEffect(() => {
    const json = localStorage.getItem('userData') || '';
    if (json) {
      const userData = JSON.parse(json);
      if (userData) {
        fetchData(userData.accountID);
      }
    }

  }, [])

  const fetchData = async (accounId: string) => {
    try {
      const response = await axiosInstance.get(`/transaction/${accounId}`);
      console.log(response.data)
      if (response.status == 200) {
        setDepositWithdraws(response.data)
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

  return (
    <PanelContent
      title="Deposit / Withdraw"
      menu="My Account"
      submenu="Deposit / Withdraw History"
      headerContent
    >
      <Card title="Deposit / Withdraw Details">
        <table className="table">
          <thead>
            <tr>
              <th>Date time</th>
              <th>User</th>
              <th>Remain</th>
              <th>Transaction</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {(depositWithdraws.length <= 0) ? <tr><td colSpan={6}>No Data</td></tr> : depositWithdraws?.map(item =>
              <>
                <tr>
                  <td>{new Date(item.transferDate).toLocaleString()}</td>
                  <td>{item.name}</td>
                  <td>{item.remain.toLocaleString()}</td>
                  <td>{item.transaction}</td>
                  <td>{item.amount.toLocaleString()}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </Card>
    </PanelContent>
  );
};

export default DepositWithdrawHistory;
