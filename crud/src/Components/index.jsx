import * as yup from "yup";
import "./styles.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
const Form = () => {
  const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  const formSchema = yup.object().shape({
    nome: yup.string().required("Nome obrigatório"),

    cpf: yup
      .string()
      .required("CPF obrigatório")
      .matches(cpfRegex, "CPF invalido"),

    senha: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });
  //Função para enviar os dados do form para API e gerar o token de 16 digitos (A-Z, 0-9);
  const onSubmitFunction = (data) => {
    let token = "";
    let chars = "0123456789ABCDEFGHIJKLMNOPQRGSTUVWXYZ";
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0 && i > 0) {
        token += "-";
      }
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    data.token = token;
    //O return seria um api.post
    return console.log(data);
  };

  return (
    <div className="container">
      <h3>Formulário</h3>
      <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
        <input placeholder="Digite seu nome" {...register("nome")} />
        <label> {errors.nome?.message}</label>

        <InputMask
          mask="999.999.999-99"
          placeholder="Digite o seu CPF"
          {...register("cpf")}
        />
        <label>{errors.cpf?.message}</label>
        <input
          placeholder="Digite a senha"
          type={"password"}
          {...register("senha")}
        />
        <label>{errors.senha?.message}</label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Form;
