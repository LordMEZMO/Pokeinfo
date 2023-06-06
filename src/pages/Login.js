import "../App.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const values = {
    login: "",
    pass: "",
  };

  const validationSchema = Yup.object().shape({
    login: Yup.string()
      .min(5, "Enter at least 5 characters")
      .max(18, "Enter less than 18 characters")
      .required("Login is required"),
    pass: Yup.string()
      .min(8, "Enter at least 8 characters")
      .max(20, "Enter less than 20 characters")
      .required("Password is required"),
  });

  const LoginForm = () => {
    const handleSubmit = (values) => {
      alert("Hello " + values.login);
      console.log(values);
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
                  <div className="control has-icons-left">
                    {/* <span className="icon is-small">
                      <FontAwesomeIcon icon={faUser} />
                    </span> */}
                    <label className="label">Username</label>
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

                <div className="field" htmlFor="password">
                  <div className="control">
                    <label className="label">Password</label>
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
                      Log In
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
            <h1 className="title">Login</h1>
            <LoginForm />
          </div>
        </div>
      </section>
    </div>
  );
}
