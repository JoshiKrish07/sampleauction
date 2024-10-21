'use client'

import AdminSideBar from "../admindashboard/AdminSideBar";
import { useEffect } from "react";
import Loader from "@/components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLots } from "@/store/slices/allDataSlice";
import Link from "next/link";
import './AdminLotsList.css';

const AdminLotsList = () => {

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.tablesData.alllots);

    useEffect(() => {
        //call if allLots is empty
        if (data.length === 0) {
            dispatch(fetchAllLots());
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
              <div className="bidding-summary-wrap">
              <div className="auct-header">
                <h6>Lots List</h6>
                <Link href='/admin/add_lots'>
                  <button>Add Lot</button>
                </Link>
                </div>
                <table className="bidding-summary-table">
                  <thead>
                    <tr>
                      <th>Lot ID</th>
                      <th>Lot Code</th>
                      <th>Lot Type</th>
                      <th>Open Bid</th>
                      <th>Auction ID</th>
                    </tr>
                  </thead>
                  <tbody>

                        {
                                !loading && data?.data?.map((lot) => {
                                    return (
                                        <tr key={lot.lot_id}>
                                            <td data-label="Lot ID">{lot.lot_id}</td>
                                            <td data-label="Lot Code">{lot.lot_code}</td>
                                            <td data-label="Lot Type">{lot.lot_type}</td>
                                            <td data-label="Open Bid">{lot.lot_open_bid}</td>
                                            <td data-label="Auction ID">{lot.lot_auct_id}</td>
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

export default AdminLotsList;
