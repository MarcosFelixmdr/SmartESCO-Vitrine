export default function Contact() {
  return (
    <section>
      <div className="container">
        <h2>Contato</h2>

        <form style={{marginTop: "20px"}}>
          <input placeholder="Seu nome" /><br /><br />
          <input placeholder="Email" /><br /><br />
          <button className="btn">Enviar</button>
        </form>
      </div>
    </section>
  );
}
