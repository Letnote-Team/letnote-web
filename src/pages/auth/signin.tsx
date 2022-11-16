import Link from "next/link";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/commons/Button";
import { Input } from "../../components/forms/Input";
import { Layout } from "../../components/layouts/layout";
import { AuthContext } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";

type SignInParamType = {
  email: string;
  password: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInParamType>();
  const { signIn, loading } = useContext(AuthContext);
  const toast = useToast();

  const onSubmit: SubmitHandler<SignInParamType> = async ({
    email,
    password,
  }) => {
    await signIn(email, password);
  };

  return (
    <Layout onlyLogo={true}>
      <div className="h-full flex justify-center items-center">
        <section className="w-80 h-fit space-y-4">
          <div className="m-auto w-11/12 text-center space-y-2">
            <h1 className="font-semibold xl:text-2xl 2xl:text-4xl">
              Faça login
            </h1>
            <p className="text-gray-text">Insira seus dados para continuar</p>
          </div>
          <div className="flex-grow border-t border-gray-300"></div>
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <Input
              title="Email"
              type="email"
              {...register("email", {
                required: "Email é obrigatório",
              })}
              error={errors.email}
              placeholder="Insira seu email aqui"
            />
            <Input
              title="Senha"
              type="password"
              {...register("password", {
                required: "Senha é obrigatório",
              })}
              error={errors.password}
              placeholder="Insira uma senha segura"
            />
            <Button loading={loading} buttonType="primary" className="w-full">
              Entrar
            </Button>
          </form>
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">ou</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="text-center text-gray-text">
            <p>
              Ainda não possui conta? Crie uma{" "}
              <Link className="text-primary-700" href="/auth/signup">
                aqui.
              </Link>
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Signup;
