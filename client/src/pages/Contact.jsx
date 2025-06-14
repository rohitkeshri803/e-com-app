import React from 'react'
import { Layout } from '../components/Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import contact from "../images/contact.jpg"
export const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src={contact}
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            For any query and info about product feel free to contact anytime we 24X7
            available
          </p>
          <p className="mt-3">
            <BiMailSend /> : rakeshchauhandpr@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> :345678967
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  )
}
