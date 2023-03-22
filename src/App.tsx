import React, { useState } from "react";
import "./App.css";
import rgt_logo from "./assets/images/rgt-logo.png";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import axios from 'axios'

interface FormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  major: string;
}

const formValidationSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(
      /^[0-9]{10}$/,
      "Phone number should consists of ten digits in the format 054XXXXXXX"
    )
    .required("Phone number is required"),
  major: yup.string().required("Major is required"),
});

const initialValues: FormValues = {
  fullName: "",
  email: "",
  phoneNumber: "",
  major: "",
};

function App() {
  const [error, setError] = useState<string|null>(null);
  const [success, setSuccess] = useState<string|null>(null);
  const handleSubmit = async (values: any, setSubmitting: (val: boolean) => void, resetForm: any) => {
    try {
      setError(null);
      const { data: { message } } = await axios.post<{ message: string }>('https://rgt-attendance-backend.onrender.com/attendance', values);
      console.log({ message })
    } catch (err: any) {
      const e = err.response.data.message ?? 'An error occured while submitting this form'
      setError(e)
      console.log(e)
    } finally {
      setSubmitting(false);
      resetForm();
    }
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src={rgt_logo} alt="IMG" />
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={formValidationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              handleSubmit(values, setSubmitting, resetForm);
            }}
            >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <span className="login100-form-title">Attendance</span>

                <div style={{ padding: error != null ? '1rem': '0', color: '#fff', fontWeight: 'bold', background: '#ec4a4a', borderRadius: '0.5rem', marginBottom: '1rem'}}>{error != null ? error: null}</div>
                <div style={{ padding: success != null ? '1rem': '0', color: '#fff', fontWeight: 'bold', background: '#29e935', borderRadius: '0.5rem', marginBottom: '1rem'}}>{success != null ? success: null}</div>
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Enter your full name"
                >
                  <Field
                    className="input100"
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Full name"
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </span>
                  {
                    touched.fullName && errors.fullName && <p className="error-msg">{errors.fullName}</p>
                  }
                </div>
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Valid email is required: ex@abc.xyz"
                >
                  <Field
                    className="input100"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </span>
                  {
                    touched.email && errors.email && <p className="error-msg">{errors.email}</p>
                  }
                </div>

                <div
                  className="wrap-input100 validate-input"
                  data-validate="Valid phone number is required: 0555555555"
                >
                  <Field
                    className="input100"
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    placeholder="Phone"
                  />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                  </span>
                  {
                    touched.phoneNumber && errors.phoneNumber && <span className="error-msg">{errors.phoneNumber}</span>
                  }
                </div>
                <div
                  className="wrap-input100 validate-input"
                  data-validate="Password is required"
                >
                  <Field
                    as="select"
                    className="input100"
                    name="major"
                    id="major"
                    placeholder="major"
                  >
                    <option value="">Select a major</option>
                    <option value="Computer science">Computer Science</option>
                    <option value="Business administration">Business Administration</option>
                    <option value="MIS">MIS</option>
                    <option value="Computer engineering">Computer Engineering</option>
                    <option value="Mechanical engineering">Mechanical Engineering</option>
                    <option value="Electrical engineering">Electrical Engineering</option>
                    <option value="Other">Other</option>
                  </Field>
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
                  {
                    touched.major && errors.major && <p className="error-msg">{errors.major}</p>
                  }
                </div>

                <div className="container-login100-form-btn">
                  <button className="login100-form-btn" type="submit" disabled={isSubmitting}>{isSubmitting ? <>Submitting</> : <>Submit</>}</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default App;
