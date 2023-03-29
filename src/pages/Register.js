import '../App.css';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup"

export default function Register() {
  const values = {
    login: "",
    pass: ""
  }

  const validationSchema = Yup.object().shape({
    login: Yup.string().required("Login is required"),
    pass: Yup.string()
    .min(8, "Enter at least 8 characters")
    .max(20, "Enter less than 20 characters")
  })

  const RegisterForm = () => {
    const handleSubmit = (values) => console.log(values)

    return (
      <Formik 
        initialValues={values}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div>
            <label htmlFor="login">Login</label>
            <Field type="text" name="login"/>
            <ErrorMessage name="login"/><br/>
            <label htmlFor="password">Password</label>
            <Field type="password" name="pass"/>
            <ErrorMessage name="pass"/>
          </div>
          <button type="submit">Create an account</button>
        </Form>
      </Formik>
    )
  }


  return (
    <div className="App">
      <section>
        <article>
            <h1>Register</h1>
            <RegisterForm/>
        </article>
      </section>
    </div>
  );
}