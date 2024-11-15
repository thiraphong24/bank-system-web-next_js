import { Card, PanelContent } from "@/components";
import axiosInstance from "@/libs/axiosInstance";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Transfer = () => {

  const [recieves, setRecieves] = useState<TransferReceiveModel[]>([]);

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
      const response = await axiosInstance.get(`/transfer/${accounId}/transfer`);
      console.log(response.data)
      if (response.status == 200) {
        setRecieves(response.data)
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
      title="Transfer"
      menu="My Account"
      submenu="Transfer History"
      headerContent
    >
      <Card title="Transfer Details">
        <table className="table">
          <thead>
            <tr>
              <th>Date time</th>
              <th>User</th>
              <th>Remain</th>
              <th>Action</th>
              <th>To</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {(recieves.length <= 0) ? <tr><td colSpan={6}>No Data</td></tr> : recieves?.map(item =>
              <>
                <tr>
                  <td>{new Date(item.transferDate).toLocaleString()}</td>
                  <td>{item.name}</td>
                  <td>{item.remain.toLocaleString()}</td>
                  <td>{item.action}</td>
                  <td>{item.fromOrTo}</td>
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

export default Transfer;
