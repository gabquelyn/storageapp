"use client";
import React, { useState, useEffect } from "react";
import Input from "../atoms/Input";
import { BsPerson, BsTelephone } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { FaRegFlag } from "react-icons/fa";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../api/features/profileApislice";
import CenterLoading from "./CenterLoading";
export default function Personal() {
  const { data, isLoading, isSuccess } = useGetProfileQuery(null);
  const [updateProfile, { isLoading: updataing }] = useUpdateProfileMutation();
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    phone: "",
    address: "",
    country: "",
  });

  const inputChangeHandler: InputHandler = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    if (isSuccess) {
      setProfileDetails({ ...data });
    }
  }, [isSuccess, data]);

  const updateProfileHandler = async () => {
    try {
      await updateProfile({ ...profileDetails }).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <CenterLoading />;
  if (isSuccess) {
    return (
      <div className="bg-slate-100 w-full zoom marker:rounded-md p-7">
        <div className="flex flex-col gap-3">
          <Input
            icon={<BsPerson />}
            name="name"
            placeholder=""
            type="text"
            value={profileDetails.name}
            label="Name"
            onChange={inputChangeHandler}
            disableError
          />
          <Input
            icon={<BsTelephone />}
            name="phone"
            placeholder=""
            type="tel"
            value={profileDetails.phone}
            label="Phone"
            onChange={inputChangeHandler}
            disableError
          />
          <Input
            icon={<GrLocation />}
            name="address"
            placeholder=""
            type="tel"
            value={profileDetails.address}
            label="Address"
            onChange={inputChangeHandler}
            disableError
          />
          <Input
            icon={<FaRegFlag />}
            name="country"
            placeholder=""
            type="tel"
            value={profileDetails.country}
            label="Country"
            onChange={inputChangeHandler}
            disableError
          />
        </div>
        <div className="flex justify-end my-4">
          <button
            className="bg-blue text-white p-3 px-8 rounded-md disabled:cursor-not-allowed"
            onClick={updateProfileHandler}
            disabled={updataing}
          >
            {updataing ? "Updating profile ..." : "Update profile"}
          </button>
        </div>
      </div>
    );
  }
}
