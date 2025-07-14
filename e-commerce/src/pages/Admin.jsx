import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 400;
  color: #1a1a1a;
  text-align: center;
  margin: 2rem 0;
  letter-spacing: 0.05em;
  position: relative;
  padding-bottom: 0.3rem;

  &::after {
    content: '';
    display: block;
    width: 60%;
    height: 3px;
    background: linear-gradient(90deg, #1979d8, #56ccf2);
    border-radius: 2px;
    margin: 0.3rem auto 0;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ButtonStyled = styled.button`
  background: linear-gradient(90deg, #1979d8, #56ccf2);
  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 0.5rem 1.3rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: linear-gradient(90deg, #145a9c, #3a9bdc);
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 6px #1979d8;
  }
`;

function Admin() {
  const fileInputRef = useRef(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState({});
  const [productosCreados, setProductosCreados] = useState([]);
  const [editando, setEditando] = useState(null);

  const [productos, setProductos] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: ""
  });

  useEffect(() => {
    fetch("https://686fde294838f58d11233057.mockapi.io/api/products")
      .then(res => res.json())
      .then(data => setProductosCreados(data))
      .catch(() => setError({ fetch: "Error al cargar los productos" }));
  }, []);

  const validarFormulario = () => {
    const errores = {};
    if (!productos.title?.trim()) errores.title = "El nombre es obligatorio";
    if (!productos.image?.trim()) errores.image = "La imagen es obligatoria";
    if (!productos.price?.toString().trim()) errores.price = "El precio es obligatorio";
    if (!productos.category?.trim()) errores.category = "La categoría es obligatoria";
    setError(errores);
    return Object.keys(errores).length === 0;
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "curso_react");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dpbr8akwk/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setProductos({ ...productos, image: data.secure_url });
    } catch (err) {
      setError({ fetch: "Error al subir la imagen" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductos({ ...productos, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError({});

    if (!validarFormulario()) return;

    try {
      const url = editando
        ? `https://686fde294838f58d11233057.mockapi.io/api/products/${editando}`
        : "https://686fde294838f58d11233057.mockapi.io/api/products";

      const method = editando ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productos)
      });

      if (!response.ok) throw new Error("Error al guardar el producto");

      const result = await response.json();

      if (editando) {
        setProductosCreados(prev => prev.map(p => p.id === editando ? result : p));
        setMensaje("Producto actualizado correctamente");
      } else {
        setProductosCreados(prev => [...prev, result]);
        setMensaje("Producto creado correctamente");
      }

      setProductos({ title: "", description: "", image: "", price: "", category: "" });
      setEditando(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      const modal = bootstrap.Modal.getInstance(document.getElementById("modalProducto"));
      modal?.hide();
    } catch (err) {
      setError({ fetch: err.message });
    }
  };

  const handleEditar = (prod) => {
    setProductos(prod);
    setEditando(prod.id);
    const modal = new bootstrap.Modal(document.getElementById("modalProducto"));
    modal.show();
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      await fetch(`https://686fde294838f58d11233057.mockapi.io/api/products/${id}`, {
        method: "DELETE"
      });
      setProductosCreados(prev => prev.filter(p => p.id !== id));
    } catch {
      alert("Error al eliminar el producto");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4" style={{ minHeight: "calc(100vh - 100px)" }}>
        <Title>Productos</Title>

        <ButtonStyled
          className="mb-4"
          data-bs-toggle="modal"
          data-bs-target="#modalProducto"
          onClick={() => {
            setEditando(null);
            setProductos({ title: "", description: "", image: "", price: "", category: "" });
            if (fileInputRef.current) fileInputRef.current.value = "";
          }}
        >
          Agregar producto
        </ButtonStyled>

        {/* Modal */}
        <div className="modal fade" id="modalProducto" tabIndex="-1" aria-labelledby="modalProductoLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title" id="modalProductoLabel">
                    {editando ? "Editar Producto" : "Nuevo Producto"}
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" />
                </div>
                <div className="modal-body">
                  {mensaje && <p className="text-success fw-bold">{mensaje}</p>}
                  {Object.values(error).map((msg, i) => (
                    <p key={i} className="text-danger">{msg}</p>
                  ))}

                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" name="title" className="form-control" value={productos.title} onChange={handleChange} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Descripción</label>
                    <input type="text" name="description" className="form-control" value={productos.description} onChange={handleChange} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Imagen</label>
                    <input type="file" className="form-control" ref={fileInputRef} onChange={handleUpload} />
                    {productos.image && (
                      <img src={productos.image} alt="preview" className="mt-2 img-fluid" style={{ maxWidth: "100px" }} />
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Precio</label>
                    <input type="number" name="price" className="form-control" value={productos.price} onChange={handleChange} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Categoría</label>
                    <input type="text" name="category" className="form-control" value={productos.category} onChange={handleChange} />
                  </div>
                </div>

                <div className="modal-footer">
                  <ButtonStyled type="submit">Guardar</ButtonStyled>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table className="table table-bordered table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosCreados.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-muted">No existen productos</td>
                </tr>
              ) : (
                productosCreados.map(prod => (
                  <tr key={prod.id}>
                    <td>{prod.title}</td>
                    <td>{prod.description}</td>
                    <td>
                      <img src={prod.image} alt={prod.title} style={{ width: "80px", height: "auto", objectFit: "contain" }} />
                    </td>
                    <td>${prod.price}</td>
                    <td>{prod.category}</td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditar(prod)}>Editar</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(prod.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Admin;
