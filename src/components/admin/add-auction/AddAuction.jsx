"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "@/components/loader/Loader";
import "./AddAuction.css";
import AdminSideBar from "../admindashboard/AdminSideBar";

const AddAuction = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    auction_name: "",
    auct_code: "",
    auct_location: "",
    auct_detail: "",
    auct_image: null,
    auct_start_date: '',
    auct_end_date: '',
    auct_status: 'LIVE'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loader state
  const validate = () => {
    let formErrors = {};

    // Auction Name validation
    if (!formData.auction_name.trim()) {
      formErrors.auction_name = "*Auction Name is required";
    }

    // Auction Code validation
    if (!formData.auct_code.trim()) {
      formErrors.auct_code = "*Auction Code is required";
    }

    // Auction Location validation
    if (!formData.auct_location.trim()) {
      formErrors.auct_location = "*Auction Location is required";
    }

    // Auction pic validation
    let imageReg = /(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i;
    if (!formData.auct_image) {
      formErrors.auct_image = "*Image is required";
    } else if (!imageReg.exec(formData.auct_image.name)) {
      formErrors.auct_image = "*Only Images allowed";
    }

    // Auction detail validation
    if (!formData.auct_detail.trim()) {
      formErrors.auct_detail = "*Auction Detail is required";
    }

    // Auction start date validation
    if (!formData.auct_start_date) {
        formErrors.auct_start_date = "*Start date is required.";
      }
    
    // Auction end date validation
    if (!formData.auct_end_date) {
    formErrors.auct_end_date = "*End date is required.";
    } else if (formData.auct_start_date && new Date(formData.auct_end_date) < new Date(formData.auct_start_date)) {
    formErrors.auct_end_date = "*End date must be after the start date.";
    }

    console.log("=====formErrors====>", formErrors);
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  // running on onchange of input fields
  const handleChange = (e) => {
    let { name, value, files } = e.target;
    if(name === 'auct_code') {
      value = value.toUpperCase();
      console.log("value", value);
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
    Object.keys(errors).forEach((inputName) => {
      if (inputName === name && value !== "") {
        delete errors[inputName];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);

      const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Session Expired, Please Login", { position: "top-right" });
            setLoading(false);
            return router.push("/admin");
        }

      try {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          formDataToSend.append(key, formData[key]);
        });

        const response = await fetch("/api/admin/add-auction", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        });

        if (response.status === 401) {
            // Token is expired or invalid
            console.log("Token expired");
            localStorage.removeItem("token"); // Remove the expired token
            return router.push("/admin"); 
        }

        const data = await response.json();
        console.log("======data==add-auction====>", data);
        if (response.ok) {
          setFormData({
            auction_name: "",
            auct_code: "",
            auct_location: "",
            auct_detail: "",
            auct_image: null,
            auct_start_date: '',
            auct_end_date: '',
            auct_status: 'LIVE'
          });
          setErrors({});
          toast.success("Auction added Successsfully", {
            position: "top-right",
          });
          router.push('/admin/dashboard');
        } else {
          toast.error(data.error, { position: "top-right" });
        }
      } catch (error) {
        console.error("Error during Auction add:", error);
        toast.error("Auction Add failed", { position: "top-right" });
      } finally {
        setLoading(false); // stop loader
      }
    } else {
      console.log("Form validation failed");
    }
  };

  const handleSelect = (e) => {
    console.log("=====e=====val==>", e.target.value)
  }

  return (
    <>
      <div className="dashboard-section pt-110 mb-110">
        <div className="container">
          <div className="dashboard-wrapper">
            <AdminSideBar />
            <div className="dashboard-content-wrap">
              <div className="bidding-summary-wrap auct_form_wrap">
                <div className="form-container">
                  <h2>Auction Form</h2>
                  <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                      <label htmlFor="auction_name">Auction Name:</label>
                      <input
                        type="text"
                        id="auction_name"
                        name="auction_name"
                        value={formData.auction_name}
                        onChange={handleChange}
                      />
                      {errors.auction_name && (
                        <p className="error">{errors.auction_name}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="auct_code">Auction Code:</label>
                      <input
                        type="text"
                        id="auct_code"
                        name="auct_code"
                        value={formData.auct_code}
                        onChange={handleChange}
                        style={{textTransform:'uppercase'}}
                      />
                      {errors.auct_code && (
                        <p className="error">{errors.auct_code}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="auct_location">Location</label>
                      <input
                        type="text"
                        id="auct_location"
                        name="auct_location"
                        value={formData.auct_location}
                        onChange={handleChange}
                      />
                      {errors.auct_location && (
                        <p className="error">{errors.auct_location}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="auct_detail">Auction Detail</label>
                      <input
                        type="text"
                        id="auct_detail"
                        name="auct_detail"
                        value={formData.auct_detail}
                        onChange={handleChange}
                      />
                      {errors.auct_detail && (
                        <p className="error">{errors.auct_detail}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="auct_image">Auction Image:</label>
                      <input
                        type="file"
                        id="auct_image"
                        name="auct_image"
                        onChange={handleChange}
                      />
                      {errors.auct_image && (
                        <p className="error">{errors.auct_image}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="auct_start_date">Auction Start Date:</label>
                      <input
                        type="date"
                        id="auct_start_date"
                        name="auct_start_date"
                        onChange={handleChange}
                      />
                      {errors.auct_start_date && (
                        <p className="error">{errors.auct_start_date}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="auct_end_date">Auction End Date:</label>
                      <input
                        type="date"
                        id="auct_end_date"
                        name="auct_end_date"
                        onChange={handleChange}
                      />
                      {errors.auct_end_date && (
                        <p className="error">{errors.auct_end_date}</p>
                      )}
                    </div>

                    <div className="form-group">
                      <label htmlFor="auct_status">Auction Status</label>
                      <input
                        type="text"
                        id="auct_status"
                        name="auct_status"
                        value='LIVE'
                        onChange={handleChange}
                        readOnly
                      />
                      {/* <select onClick={handleSelect}>
                        <option value='LIVE'>LIVE</option>
                      </select> */}
                      {/* {errors.auct_status && (
                        <p className="error">{errors.auct_status}</p>
                      )} */}
                    </div>

                    <button type="submit" className="submit-btn">
                      Add Auction
                    </button>
                    <Loader isLoading={loading} />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAuction;
