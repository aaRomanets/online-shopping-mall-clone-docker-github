import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
//вытаскиваем функцию запроса на регистрацию нового пользователя
import { registerUser } from "../../../_actions/user_actions";
//вытаскиваем хук useDispatch
import { useDispatch } from "react-redux";

import { Form, Input, Button} from 'antd';

//шаблон верстки всей страницы регистрации пользователя
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

//шаблон верстки места помещения кнопки запроса на регистрацию пользователя
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      //начальное состояние данных по регистрируемому пользователю
      initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      //схема проверки всех данных по регистрируемому пользователю
      validationSchema={Yup.object().shape({
        //структура проверки имени пользователя
        name: Yup.string().required('Name is required'),
        //структура проверки фамилии пользователя
        lastName: Yup.string().required('Last Name is required'),
        //структура проверки электронной почты пользователя
        email: Yup.string().email('Email is invalid').required('Email is required'),
        //структура проверки пароля пользователя
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        //структура проверки подтверждения пароля пользователя
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
      })}

      //делаем запрос на регистрацию пользователя
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          //сформированные данные регистрируемого пользователя
          let dataToSubmit = {
            //сформированная электронная почта
            email: values.email,
            //сформированный пароль
            password: values.password,
            //сформированное имя
            name: values.name,
            //сформированная фамилия
            lastname: values.lastname,
            //сформированное изображение по регистрируемому пользователю
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          //осуществляем запрос на регистрацию пользователя по его сформированным данным
          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              //регистрация пользователя прошла успешно
              props.history.push("/login");
            } else {
              //регистрация пользователя не получилась
              alert(response.payload.err.errmsg)
            }
          })

          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        } = props;
        return (
          <div className="app">
            <h2>Sign up</h2>
            <Form style={{ minWidth: '375px' }} {...formItemLayout} onSubmit={handleSubmit} >

              {/*Участок ввода имени пользователя*/}
              <Form.Item required label="Name">
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {/*Фиксируем неправильное задание имени пользователя */}
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>

              {/*Участок ввода фамилии пользователя*/}
              <Form.Item required label="Last Name">
                <Input
                  id="lastName"
                  placeholder="Enter your Last Name"
                  type="text"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                  }
                />
                {/*Фиксируем неправильное задание фамилии пользователя */}
                {errors.lastName && touched.lastName && (
                  <div className="input-feedback">{errors.lastName}</div>
                )}
              </Form.Item>

              {/*Участок ввода электронной пользователя*/}
              <Form.Item required label="Email">
                <Input
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {/*Фиксируем неправильное задание электронной почты пользователя */}
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              {/*Участок ввода пароля пользователя*/}
              <Form.Item required label="Password">
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {/*Фиксируем неправильное задание пароля пользователя */}
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {/*Участок ввода подтверждения пароля пользователя*/}
              <Form.Item required label="Confirm">
                <Input
                  id="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {/*Фиксируем неправильное задание повторения пароля пользователя */}
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              {/*Участок нахождения кнопки осуществления запроса на регистрацию*/}
              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};

export default RegisterPage;