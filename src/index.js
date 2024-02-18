import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

// Inicializar o express
const app = express();
const port = 8888;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});

app.get("/", (req, res) => {
  return res.status(200).json({ success: true, msg: "Server is running ok" });
});

app.get("/usuarios", (req, res) => {
  return res.status(200).json({ success: true, usuarios: usuarios });
});

//Inicializar

let usuarios = [];
let recados = [];
let data = { usuarios, recados };

//Criar conta de Usuario
app.post("/criarConta", async (req, res) => {
  let { nome, email, senha } = req.body;
  let usuarioExistente = usuarios.find((usuario) => usuario.email === email);
  if (usuarioExistente) {
    return res
      .status(400)
      .json({ success: false, msg: "Já existe um usuário com este e-mail." });
  }
  let hash = await bcrypt.hash(senha, 10);
  let usuario = {
    id: usuarios.length + 1,
    nome: nome,
    email: email,
    senha: hash,
  };
  usuarios.push(usuario);
  return res
    .status(201)
    .json({ success: true, msg: "Conta criada com sucesso!" });
});

//Fazer Login
app.post("/login", async (req, res) => {
  let { email, senha } = req.body;
  let usuario = usuarios.find((usuario) => usuario.email === email);
  if (usuario && (await bcrypt.compare(senha, usuario.senha))) {
    return res.status(200).json({ success: true, msg: "Login bem-sucedido!" });
  } else {
    return res
      .status(400)
      .json({ success: false, msg: "E-mail ou senha incorretos." });
  }
});

//Criar Recado
app.post("/recados", (req, res) => {
  let { titulo, descricao, usuarioId } = req.body;
  let usuarioExistente = usuarios.find((usuario) => usuario.id === usuarioId);
  if (!usuarioExistente) {
    return res
      .status(400)
      .json({ success: false, msg: "Usuário não encontrado." });
  }
  let recado = {
    id: recados.length + 1,
    titulo: titulo,
    descricao: descricao,
    usuarioId: usuarioId,
  };
  recados.push(recado);
  return res
    .status(201)
    .json({ success: true, msg: "Recado criado com sucesso!" });
});

//Buscar Recados
app.get("/recados/:usuarioId", (req, res) => {
  let usuarioId = Number(req.params.usuarioId);
  let recadosDoUssuario = recados.filter(
    (recado) => recado.usuarioId === usuarioId
  );
  return res.status(200).json({ success: true, recados: recadosDoUssuario });
});

//Atualizar Recados
app.put("/recados/:id", (req, res) => {
  let id = Number(req.params.id);
  let { titulo, descricao, usuarioId } = req.body;
  let recado = recados.find(
    (recado) => recado.id === id && recado.usuarioId === usuarioId
  );
  if (recado) {
    recado.titulo = titulo;
    recado.descricao = descricao;
    return res
      .status(200)
      .json({ success: true, msg: "Recado atualizado com sucesso!" });
  }
  return res
    .status(400)
    .json({ success: false, msg: "Recado não encontrado." });
});

//Deletar Recados
app.delete("/recados/:id", (req, res) => {
  let id = Number(req.params.id); // Use Number em vez de number
  let { usuarioId } = req.body;
  let index = recados.findIndex(
    (recado) => recado.id === id && recado.usuarioId === usuarioId
  );
  if (index !== -1) {
    recados.splice(index, 1);
    return res
      .status(200)
      .json({ success: true, msg: "Recado deletado com sucesso!" });
  }
  return res
    .status(404)
    .json({ success: false, msg: "Recado não encontrado." });
});
