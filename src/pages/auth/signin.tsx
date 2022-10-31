import Link from "next/link";
import React from "react";
import { Button } from "../../components/commons/Button";
import { Input } from "../../components/forms/Input";
import { Layout } from "../../components/layouts/layout";

const Signup = () => {
  return (
    <Layout onlyLogo={true}>
      <div className="h-full flex justify-center items-center">
        <section className="w-80 h-fit space-y-4">
          <div className="m-auto w-11/12 text-center space-y-2">
            <h1 className="font-semibold xl:text-2xl 2xl:text-4xl">Faça login</h1>
            <p className="text-gray-text">Insira seus dados para continuar</p>
          </div>
          <div className="flex-grow border-t border-gray-300"></div>
          <form className="space-y-2">
            <Input title="Email" name="email" type="email" placeholder="Insira seu email aqui" />
            <Input title="Senha" name="password" type="password" placeholder="Insira uma senha segura" />
            <Button buttonType="primary" className="w-full">
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
              Ainda não possui conta? Crie uma {" "}
              <Link href="/auth/signup">
                <a className="text-primary-700">aqui</a>
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Signup;