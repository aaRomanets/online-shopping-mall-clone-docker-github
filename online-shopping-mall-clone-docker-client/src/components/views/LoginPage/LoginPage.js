import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Input, Button, Typography } from 'antd';
//Вытаскиваем хук useDispatch
import { useDispatch } from "react-redux";

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();

  //состояние сформированных ошибок в результате процесса авторизации
  const [formErrorMessage, setFormErrorMessage] = useState('')

  return (
    <Formik
      //начальное состояние данных по авторизации зарегистрированного пользователю
      initialValues={{
        email:  '',
        password: '',
      }}
      //схема проверки всех данных по авторизации зарегистрированного пользователю
      validationSchema={Yup.object().shape({
        //структура проверки электронной почты пользователя
        email: Yup.string().email('Email is invalid').required('Email is required'),
        //структура проверки пароля пользователя
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      })}

      //делаем запрос на авторизацию зарегистрированного пользователя
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          //сформированное состояние данных для авторизации зарегистрированного пользователя
          let dataToSubmit = {
            //сформированная почта
            email: values.email,
            //сфомированный пароль
            password: values.password
          };

          //осуществляем запрос на авторизацию зарегистрированного пользователя по соответствующим данным
          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                //успех авторизации зарегистрированного пользователя
                //в window.localStorage сохраняем идентификатор зарегистрированного пользователя response.payload.userId
                window.localStorage.setItem('token', response.payload.token);
                
                //переходим на центральную страницу проекта, когда процесс авторизации зарегистрированного пользователя прошел успешно
                props.history.push("/");
              } else {
                //Авторизация зарегистрированного пользователя не удалась
                setFormErrorMessage('Check out your Account or Password again')
              }
            })
            .catch(err => {
              //Авторизация зарегистрированного пользователя не удалась
              setFormErrorMessage('Check out your Account or Password again')
              //Через три секунды очищаем все ошибки, полученные в результате неудачного процесса авторизации зарегистрированного пользователя
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
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

            <Title level={2}>Log In</Title>
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>
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

              {/*Выводим сообщение об ошибке в случае неудачной авторизации зарегистрированного пользователя  */}
              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              <Form.Item>
                {/*Кнопка активации процесса авторизации зарегистрированного пользователя*/}
                <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    Log in
                </Button>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(LoginPage);