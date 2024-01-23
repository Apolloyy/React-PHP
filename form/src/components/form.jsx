import { ClipboardCheck, Eye, Mail, User } from "lucide-react";
import { useState } from "react";
import "./css/form.css";

function FormData() {
  const [login, setLogin] = useState("");
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");

  const API_Insert = async (event) => {
    event.preventDefault();
    if (!login || !password || !email) {
      console.error("Todos os campos são obrigatórios");
      return;
    }
    try {
      const url = await fetch("http://localhost/api.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password, email }),
      });
      console.log("Dados enviados:", { login, password, email });

      if (!url.ok) {
        console.log(`Erro na requisição ${url.statusText}`);
      }

      const data = await url.json();
      console.log("Resposta da API:", data);
    } catch (err) {
      console.error("Erro ao consumir a API:", err.message);
    }
  };

  return (
    <>
      <div className="container">
        <form method="POST" onSubmit={API_Insert}>
          <ClipboardCheck color="#506ff8" size={24} />
          <h1 id="title">Faça seu Cadastro</h1>
          <div className="inputs">
            <label htmlFor="login">Login</label>
            <div className="input-back">
              <User color="#506ff8" size={24} />
              <input
                name="login"
                id="login"
                type="text"
                maxLength="12"
                placeholder="Crie um login"
                className="input-text"
                required
                value={login}
                onChange={(event) => setLogin(event.target.value)}
              />
            </div>
          </div>
          <div className="inputs">
            <label htmlFor="senha">Senha</label>
            <div className="input-back">
              <Eye color="#506ff8" size={24} />
              <input
                name="password"
                id="senha"
                type="password"
                maxLength="12"
                placeholder="Crie uma senha"
                className="input-text"
                required
                value={password}
                onChange={(event) => setPass(event.target.value)}
              />
            </div>
          </div>
          <div className="inputs">
            <label htmlFor="email">Email</label>
            <div className="input-back">
              <Mail color="#506ff8" size={24} />
              <input
                name="email"
                id="email"
                type="email"
                maxLength={50}
                placeholder="Digite seu email"
                className="input-text"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <div className="footer-form">
            <button className="submit">Criar Conta</button>
            <span className="line"></span>
            <span>
              By clicking "Create Account" you agree to our{" "}
              <strong>terms</strong> and <strong>privacy policy</strong>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormData;
