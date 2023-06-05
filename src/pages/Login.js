import '../App.css';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup"

export default function Login() {
  const values = {
    login: "",
    pass: ""
  }

  const validationSchema = Yup.object().shape({
    login: Yup.string()
    .min(5, "Enter at least 5 characters")
    .max(18, "Enter less than 18 characters")
    .required("Login is required"),
    pass: Yup.string()
    .min(8, "Enter at least 8 characters")
    .max(20, "Enter less than 20 characters")
    .required("Password is required"),
  })

  const LoginForm = () => {
    const handleSubmit = (values) => console.log(values)

    return (
      <Formik 
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          const {errors, touched, isValid, dirty} = formik;
          return (
            <Form>
              <div className='form-row'>
                <label htmlFor="login">Login</label>
                <Field 
                  type="text" 
                  name="login"
                  className={errors.login && touched.login ? "bad-input" : ""}
                />
                <ErrorMessage component="span" className="error-message" name="login"/>
              </div>
              <div className='form-row'>
                <label htmlFor="password">Password</label>
                <Field 
                  type="password" 
                  name="pass"
                  className={errors.pass && touched.pass ? "bad-input" : ""}
                />
                <ErrorMessage component="span" className="error-message" name="pass"/>
              </div>
              <button 
                type="submit"
                className={!(dirty && isValid) ? "disabled-btn" : ""}
                disabled={!(dirty && isValid)}
              >
                Log In</button>
            </Form>
          )
        }}
      </Formik>
    )
  }


  return (
    <div className="App">
      <section>
        <article>
            <h1 className="label">Login</h1>
            <LoginForm/>
        </article>
      </section>
    </div>
  );
}