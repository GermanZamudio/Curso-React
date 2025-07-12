import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Nosotros() {
  return (
    <div>
      <Navbar />
      <div className="container mt-5 mb-5">
        {/* SECCIÓN NOSOTROS */}
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <h1 className="mb-4">Quiénes Somos</h1>
            <p>
              En <strong>ModaTrend</strong> creemos que la ropa no solo viste, sino que expresa quién sos. Nos dedicamos
              a ofrecer prendas de calidad, con diseños únicos y en sintonía con las últimas tendencias.
            </p>
            <p>
              Desde nuestros inicios, buscamos que cada cliente encuentre su estilo, con atención personalizada,
              materiales premium y una experiencia de compra cómoda y segura.
            </p>
          </div>
        <div className="col-md-6">
        <img
            src="https://images.unsplash.com/photo-1556909190-447fc0f025a5?auto=format&fit=crop&w=800&q=80"
            alt="Moda y ropa"
            className="img-fluid rounded shadow"
        />
        </div>
        </div>

        {/* SECCIÓN CONTACTO */}
        <div className="row">
          <div className="col-md-12">
            <h2 className="mb-4">Contacto</h2>
            <p>
              ¿Tenés dudas sobre nuestros productos o querés hacernos una consulta? Completá el formulario y te
              responderemos a la brevedad.
            </p>
            <form>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" placeholder="Tu nombre" />
              </div>

              <div className="mb-3">
                <label className="form-label">Correo electrónico</label>
                <input type="email" className="form-control" placeholder="tu@email.com" />
              </div>

              <div className="mb-3">
                <label className="form-label">Mensaje</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Contanos en qué podemos ayudarte..."
                />
              </div>

              <button type="submit" className="btn btn-dark">Enviar</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Nosotros;
