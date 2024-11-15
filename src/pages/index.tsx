import { Card, PanelContent } from "@/components";
import Link from "next/link";

export default function Home() {
  return (
    <PanelContent headerContent title="Home">
      <div className="row">
        <div className="col-lg-3 col-6">
          <div className="small-box bg-info">
            <div className="inner">
              <h3>100%</h3>
              <p>Deposit</p>
            </div>
            <div className="icon">
              <i className="ion ion-bag" />
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-success">
            <div className="inner">
              <h3>
              100%<sup style={{ fontSize: "20px" }}>%</sup>
              </h3>
              <p>Withdraw</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars" />
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-6">
          <div className="small-box bg-warning">
            <div className="inner">
              <h3>100%</h3>
              <p>Transfer</p>
            </div>
            <div className="icon">
              <i className="ion ion-person-add" />
            </div>            
          </div>
        </div>

        <div className="col-lg-3 col-6">
          <div className="small-box bg-danger">
            <div className="inner">
              <h3>100%</h3>
              <p>Receive</p>
            </div>
            <div className="icon">
              <i className="ion ion-pie-graph" />
            </div>
          </div>
        </div>        
      </div>
    </PanelContent>
  );
}
