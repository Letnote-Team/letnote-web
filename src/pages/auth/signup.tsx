import Link from "next/link";
import { useContext, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/commons/Button";
import { Input } from "../../components/forms/Input";
import { Layout } from "../../components/layouts/layout";
import { AuthContext } from "../../contexts/AuthContext";

type SignUpParamType = {
  name: string;
  email: string;
  password: string;
};

type HiddenSignUpParamType = {
  confirmPassword: string;
};

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SignUpParamType & HiddenSignUpParamType>();
  const { signUp, loading } = useContext(AuthContext);
  const password = useRef({});

  password.current = watch("password", "");

  const onSubmit: SubmitHandler<SignUpParamType> = async ({
    name,
    email,
    password,
  }) => {
    await signUp(name, email, password);
  };

  return (
    <Layout onlyLogo={true}>
      <div className="h-full flex justify-center items-center">
        <section className="w-80 h-fit space-y-2">
          <div className="m-auto w-11/12 text-center space-y-1">
            <h1 className="font-semibold xl:text-2xl 2xl:text-4xl">
              Se cadastre
            </h1>
            <p className="text-gray-text">
              Insira seus dados para realizar um novo cadastro
            </p>
          </div>
          <div className="flex-grow border-t border-gray-300"></div>
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <Input
              title="Nome"
              type="text"
              autoComplete="username"
              error={errors.name}
              {...register("name", {
                required: "Nome é um campo obrigatório",
              })}
              placeholder="Insira o nome aqui"
            />
            <Input
              title="Email"
              type="email"
              autoComplete="email"
              error={errors.email}
              {...register("email", {
                required: "Email é um campo obrigatório",
              })}
              placeholder="Insira seu email aqui"
            />
            <Input
              title="Senha"
              autoComplete="new-password"
              type="password"
              error={errors.password}
              {...register("password", {
                required: "Senha é um campo obrigatório",
              })}
              placeholder="Insira uma senha segura"
            />
            <Input
              title="Confirme a senha"
              type="password"
              autoComplete="new-password"
              error={errors.confirmPassword}
              {...register("confirmPassword", {
                validate: (value) =>
                  value === password.current || "As senhas devem ser iguais",
              })}
              placeholder="Confirme sua senha"
            />
            <Button loading={loading} buttonType="primary" className="w-full">
              Cadastrar
            </Button>
          </form>
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">ou</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="text-center text-gray-text">
            <p>
              Já possui uma conta? Entre com ela{" "}
              <Link className="text-primary-700" href="/auth/signin">
                aqui
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SignUp;
