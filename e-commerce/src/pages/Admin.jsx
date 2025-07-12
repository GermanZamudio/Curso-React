import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Admin() {
  const fileInputRef = useRef(null);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState({});
  const [productosCreados, setProductosCreados] = useState([]);

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
      const response = await fetch("https://686fde294838f58d11233057.mockapi.io/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(productos)
      });

      if (!response.ok) throw new Error("Error al crear el producto");

      const nuevoProducto = await response.json();
      setMensaje("Producto creado correctamente");

      setProductosCreados(prev => [...prev, nuevoProducto]);
      setProductos({
        title: "",
        description: "",
        image: "",
        price: "",
        category: ""
      });

      if (fileInputRef.current) fileInputRef.current.value = "";

      // Cierra el modal manualmente
      const modal = bootstrap.Modal.getInstance(document.getElementById("modalProducto"));
      modal?.hide();
    } catch (err) {
      setError({ fetch: err.message });
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <h1 className="mb-4">Administrar Productos</h1>

        <button
          className="btn btn-success mb-4"
          data-bs-toggle="modal"
          data-bs-target="#modalProducto"
        >
          Agregar producto
        </button>

        {/* Modal con clase fullscreen en móvil */}
        <div
          className="modal fade"
          id="modalProducto"
          tabIndex="-1"
          aria-labelledby="modalProductoLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-fullscreen-sm-down">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title" id="modalProductoLabel">Nuevo Producto</h5>
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
                  <button type="submit" className="btn btn-primary">Guardar</button>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Tabla de productos con scroll horizontal en móvil */}
        <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table className="table table-bordered table-hover table-striped">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Imagen</th>
                <th>Precio</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {productosCreados.map(prod => (
                <tr key={prod.id}>
                  <td>{prod.title}</td>
                  <td>{prod.description}</td>
                  <td>
                    <img src={prod.image} alt={prod.title} style={{ width: "80px", height: "auto", objectFit: "contain" }} />
                  </td>
                  <td>${prod.price}</td>
                  <td>{prod.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Admin;
