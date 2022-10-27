import React from "react";
import { Button } from "../../components/commons/Button";
import { Input } from "../../components/forms/Input";
import { Layout } from "../../components/layouts/layout";

const Signup = () => {
  return (
    <Layout onlyLogo={true}>
      <div className="h-full flex justify-center items-center">
        <section className="w-90 h-fit space-y-4">
          <div className="m-auto w-9/12 text-center space-y-2">
            <h1 className="text-4xl">Se cadastre</h1>
            <p>Insira seus dados para realizar um novo cadastro</p>
          </div>
          <div className="flex-grow border-t border-gray-300"></div>
          <form className="space-y-2">
            <Input title="Nome" name="name" type="text" placeholder="Insira o nome aqui" />
            <Input title="Email" name="email" type="email" placeholder="Insira seu email aqui" />
            <Input title="Senha" name="password" type="password" placeholder="Insira uma senha segura" />
            <Input title="Confirme a senha" name="confirmPassword" type="password" placeholder="Confirme sua senha" />
            <Button buttonType="primary" className="w-full">
              Cadastrar
            </Button>
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default Signup;