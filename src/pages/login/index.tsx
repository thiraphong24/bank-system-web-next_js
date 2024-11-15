import { Button, Col, InputField, Row } from "@/components";
import { themesSetting } from "@/recoil";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { useRouter, withRouter } from "next/router";
import axios from "axios";
import useBalance from "@/hooks/useBalance";
import Swal from "sweetalert2";

const defaultValue: LoginFormModel = {
  username: "",
  password: ""
};

const Login = (props: any) => {
  const { setBalance } = useBalance();
  const router = useRouter();
  const setTheme = useSetRecoilState(themesSetting);
  useEffect(() => {
    setTheme({
      header: false,
      sidebar: false,
      footer: false,
      content: true
    });
    return () => {
      setTheme({
        header: true,
        sidebar: true,
        footer: true,
        content: true
      });
    };
  }, [props.router, setTheme]);
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty, isValid }
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValue
  });
  const [password, setPassword] = useState(true);

  const onSubmit = async (data: LoginFormModel) => {
    console.log('data', data);

    try {
      const response = await axios.post('http://localhost:5268/api/auth/login', {
        "username": data.username,
        "password": data.password
      });

      console.log(response.data)
      localStorage.setItem('accessToken', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data));
      if (response.status == 200) {
        setBalance(parseFloat(response.data.balance))
        router.push('/home');
      }
    } catch (err) {
      const errData = (err as any)?.response?.data;

      Swal.fire({
        text: `${errData?.errCode} : ${errData?.errMsg}`,
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return (
    <div className="login-box container" style={{ marginTop: "10%" }}>
      <div className="card card-outline card-primary">
        <div className="card-header text-center">
          <div className="h1">
            <b>BANK SYSTEM</b>
          </div>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="login-box-msg">Sign-in to start Bank System</p>
            <InputField
              label="Username"
              name="username"
              type="text"
              register={register("username")}
              iconFormGroup="fa-solid fa-user"
              formGroup
              errors={errors?.username}
              placeholder="Fill Username"
            />
            <InputField
              label="Password"
              name="password"
              type="text"
              register={register("password")}
              placeholder="Fill Password"
              iconFormGroup={password ? "fas fa-eye-slash" : "fas fa-eye"}
              customeCss={password ? "password-hide-css" : ""}
              btnAction={() => setPassword(!password)}
              formGroup
              errors={errors?.password}
            />
            <Row>
              <Col size="12">
                <Button
                  loading
                  disabled={!isDirty || !isValid}
                  textLoading="Waiting"
                  type="submit"
                  color="primary"
                  block
                  title="Sign In"
                />
              </Col>
            </Row>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);

