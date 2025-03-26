import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export default function MentoriaPreview() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [loginNome, setLoginNome] = useState("");
  const [loginSenha, setLoginSenha] = useState("");
  const [mentores, setMentores] = useState([]);
  const [nomeMentor, setNomeMentor] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");

  const cadastrarUsuario = () => {
    if (!loginNome || !loginSenha) return;
    setUsuarios([...usuarios, { nome: loginNome, senha: loginSenha }]);
    alert("Usuário cadastrado com sucesso!");
  };

  const fazerLogin = () => {
    const usuario = usuarios.find(
      (u) => u.nome === loginNome && u.senha === loginSenha
    );
    if (usuario) setUsuarioLogado(usuario);
    else alert("Usuário ou senha inválidos");
  };

  const cadastrarMentor = () => {
    if (!nomeMentor || !disponibilidade) return;
    setMentores([
      ...mentores,
      { nome: nomeMentor, disponibilidade, solicitacoes: [] },
    ]);
    setNomeMentor("");
    setDisponibilidade("");
  };

  const solicitarMentoria = (mentorIndex) => {
    if (!usuarioLogado) return;
    const novosMentores = [...mentores];
    novosMentores[mentorIndex].solicitacoes.push({ nome: usuarioLogado.nome, aprovado: false });
    setMentores(novosMentores);
  };

  const aprovarSolicitacao = (mentorIndex, solicitIndex) => {
    const novosMentores = [...mentores];
    novosMentores[mentorIndex].solicitacoes[solicitIndex].aprovado = true;
    setMentores(novosMentores);
  };

  const styles = {
    page: "p-6 space-y-6 min-h-screen bg-[#1f122f]",
    text: "text-white",
    loginBtn: "bg-[#5d4c6e] text-white hover:bg-[#4e3e5e]",
    cadastroBtn: "bg-[#3e2f4f] text-white hover:bg-[#4e3e5e]",
    secondaryBtn: "bg-[#4e3e5e] text-white hover:opacity-90",
    card: "bg-[#2f213f] shadow-md rounded-xl border border-[#4e3e5e]",
  };

  if (!usuarioLogado) {
    return (
      <div style={{ minHeight: '100vh', width: '100vw', backgroundColor: '#1f122f', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: 400, padding: 24, borderRadius: 12, backgroundColor: '#2f213f', border: '1px solid #4e3e5e', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
  src="/logo-mentor.png"
  alt="Logo MentorConnect"
  style={{
    width: 80,
    height: 80,
    objectFit: 'contain',
    marginBottom: 16,
    backgroundColor: 'red'
  }}
/>
          <h1 className={"text-2xl font-bold " + styles.text}>MentorConnect</h1>
          <p className={"text-sm " + styles.text} style={{ textAlign: 'center', marginBottom: 16 }}>
            Conectando mentores e mentorados para compartilhar conhecimento e experiências
          </p>
          <Input placeholder="Nome" value={loginNome} onChange={(e) => setLoginNome(e.target.value)} />
          <Input placeholder="Senha" type="password" value={loginSenha} onChange={(e) => setLoginSenha(e.target.value)} />
          <div style={{ display: 'flex', gap: 8, marginTop: 12, width: '100%' }}>
            <Button className={styles.loginBtn} onClick={fazerLogin} style={{ flex: 1 }}>Login</Button>
            <Button className={styles.cadastroBtn} onClick={cadastrarUsuario} style={{ flex: 1 }}>Cadastrar</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#1f122f',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          backgroundColor: '#2f213f',
          borderBottom: '1px solid #4e3e5e'
        }}>
        <img src="/logo-mentor.png" alt="Logo" style={{ height: 40 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: 'white', fontWeight: 'bold' }}>{usuarioLogado?.nome}</span>
          <Button className={styles.secondaryBtn} onClick={() => setUsuarioLogado(null)}>Logout</Button>
        </div>
      </div>
      <div
        style={{
          width: '100%',
          maxWidth: 800,
          paddingTop: 64,
          padding: 24,
          borderRadius: 12,
          backgroundColor: '#2f213f',
          border: '1px solid #4e3e5e',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1 className={"text-2xl font-bold " + styles.text}>Plataforma de Mentoria</h1>

        <Card className={styles.card}>
          <CardContent className="space-y-2 p-4">
            <h2 className={"text-xl font-semibold " + styles.text}>Cadastrar Mentor</h2>
            <Input placeholder="Nome do mentor" value={nomeMentor} onChange={(e) => setNomeMentor(e.target.value)} />
            <Textarea
              placeholder="Disponibilidade (ex: Seg a Sex, 18h-20h)"
              value={disponibilidade}
              onChange={(e) => setDisponibilidade(e.target.value)}
            />
            <Button className={styles.cadastroBtn} onClick={cadastrarMentor}>Cadastrar</Button>
          </CardContent>
        </Card>

        <div style={{ width: '100%' }}>
          <h2 className={"text-xl font-semibold " + styles.text}>Mentores Disponíveis</h2>
          {mentores.map((mentor, i) => (
            <Card key={i} className={styles.card}>
              <CardContent className="p-4 space-y-2">
                <p className={"font-bold " + styles.text}>{mentor.nome}</p>
                <p className={"text-sm " + styles.text}>Disponibilidade: {mentor.disponibilidade}</p>
                <Button className={styles.loginBtn} onClick={() => solicitarMentoria(i)}>Solicitar Mentoria</Button>
                <div className="mt-2">
                  <h3 className={"font-semibold " + styles.text}>Solicitações:</h3>
                  {mentor.solicitacoes.map((s, j) => (
                    <div key={j} className="flex items-center justify-between text-sm">
                      <span className={styles.text}>{s.nome} - {s.aprovado ? "Aprovado" : "Pendente"}</span>
                      {!s.aprovado && mentor.nome === usuarioLogado.nome && (
                        <Button size="sm" className={styles.secondaryBtn} onClick={() => aprovarSolicitacao(i, j)}>
                          Aprovar
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}