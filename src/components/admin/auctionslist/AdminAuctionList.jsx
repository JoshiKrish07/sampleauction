'use client'

import { useDispatch, useSelector } from "react-redux";
import AdminSideBar from "../admindashboard/AdminSideBar";
import { fetchAllAuctions } from "@/store/slices/allDataSlice";
import { useEffect } from "react";
import Loader from "@/components/loader/Loader";
import './AdminAuctionList.css';
import Link from "next/link";

const AdminAuctionList = () => {

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.tablesData.allauctions);

    useEffect(() => {
        //call if allAuctions is empty
        if (data.length === 0) {
            dispatch(fetchAllAuctions());
        }
    },[dispatch, data]);

  return (
    <>
      {loading && <Loader />}
      <div className="dashboard-section pt-110 mb-110">
        <div className="container">
          <div className="dashboard-wrapper">
            <AdminSideBar />
            <div className="dashboard-content-wrap">
              <div className="profile-info-wrap">
                {/* <div className="profile-img">
                  <img
                    src="/assets/img/inner-pages/dashboard-profile-img.png"
                    alt=""
                  />
                </div> */}
                <div className="profile-content">
                  <h4>Hi, Admin</h4>
                </div>
              </div>
              <div className="bidding-summary-wrap">
                <div className="auct-header">
                <h6>Auctions List</h6>
                <Link href='/admin/add_auction'>
                  <button>Add Auction</button>
                </Link>
                </div>
                <table className="bidding-summary-table">
                  <thead>
                    <tr>
                      <th>Auction ID</th>
                      <th>Name</th>
                      <th>Code</th>
                      <th>Location</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                        !loading && data?.data?.map((auction) => {
                            return (
                                <tr key={auction.auct_id}>
                                    <td data-label="Auction ID">{auction.auct_id}</td>
                                    <td data-label="Name">{auction.auct_name}</td>
                                    <td data-label="Code">{auction.auct_code}</td>
                                    {/* <td data-label="Status">
                                    <span>Winning</span>
                                    </td> */}
                                    <td data-label="Location">{auction.auct_location}</td>
                                    <td data-label="Status">{auction.auct_status}</td>
                              </tr>
                            )
                        })
                    }
                  </tbody>
                </table>
              </div>
              <div className="row pt-40">
                    <div className="col-lg-12">
                      <div className="custom-pagination-area">
                        <ul>
                          {/* Pagination buttons */}
                          <li>
                            <button
                              className="custom-page-item"
                            >
                              &lt;&lt;
                            </button>
                          </li>
                          <li>
                            <button
                              className="custom-page-item"
                            >
                              &lt; Previous
                            </button>
                          </li>
                          {[0].map((num) => (
                            <li key={num + 1}>
                              <button
                                className={`custom-page-item`}
                              >
                                {num + 1}
                              </button>
                            </li>
                          ))}
                          <li>
                            <button
                              className="custom-page-item"
                            >
                              Next &gt;
                            </button>
                          </li>
                          <li>
                            <button
                              className="custom-page-item"
                              disabled
                            >
                              &gt;&gt;
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAuctionList;
