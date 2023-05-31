import "../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Register() {
  const values = {
    login: "",
    email: "",
    pass: "",
  };

  const validationSchema = Yup.object().shape({
    login: Yup.string()
      .min(5, "Enter at least 5 characters")
      .max(18, "Enter less than 18 characters")
      .required("Login is required"),
    email: Yup.string()
      .min(5, "Enter an valid email")
      .max(50, "Enter an valid email")
      .email("Enter an valid email")
      .required("Login is required"),
    pass: Yup.string()
      .min(8, "Enter at least 8 characters")
      .max(20, "Enter less than 20 characters")
      .required("Password is required"),
  });

  const RegisterForm = () => {
    const handleSubmit = (values) => {
      alert("Hello " + values.login)
      console.log(values)
    };

    return (
      <Formik
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          const { errors, touched, isValid, dirty } = formik;
          return (
            <Form>
              <div className="box">
                <div className="field" htmlFor="login">
                  <label className="label">Username</label>
                  <div className="control">
                    <Field
                      type="text"
                      name="login"
                      className={
                        errors.login && touched.login ? "bad-input" : ""
                      }
                    />
                    <ErrorMessage
                      component="span"
                      className="error-message"
                      name="login"
                    />
                  </div>
                </div>
                <div className="field" htmlFor="email">
                  <label className="label">Email</label>
                  <div className="control">
                    <Field
                      type="text"
                      name="email"
                      className={
                        errors.email && touched.email ? "bad-input" : ""
                      }
                    />
                    <ErrorMessage
                      component="span"
                      className="error-message"
                      name="email"
                    />
                  </div>
                </div>
                <div className="field" htmlFor="password">
                  <label className="label">Password</label>
                  <div className="control">
                    <Field
                      type="password"
                      name="pass"
                      className={errors.pass && touched.pass ? "bad-input" : ""}
                    />
                    <ErrorMessage
                      component="span"
                      className="error-message"
                      name="pass"
                    />
                  </div>
                </div>
                <div className="field">
                  <p className="control">
                    <button
                      type="submit"
                      className={!(dirty && isValid) ? "disabled-btn" : ""}
                      disabled={!(dirty && isValid)}
                    >
                      Create an account
                    </button>
                  </p>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    );
  };

  return (
    <div className="App">
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Register</h1>
            <RegisterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
