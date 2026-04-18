import { useState, useEffect } from "react";

function Inventory({ role, onLogout }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(data);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.quantity || !form.price) {
      alert("Fill all fields");
      return;
    }

    let updated;

    if (editIndex !== null) {
      updated = products.map((item, i) =>
        i === editIndex ? form : item
      );
      setEditIndex(null);
    } else {
      updated = [...products, form];
    }

    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
    setForm({ name: "", quantity: "", price: "" });
  };

  const handleDelete = (index) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  const handleEdit = (index) => {
    setForm(products[index]);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <div className="header">
        <h2>📦 Inventory Dashboard</h2>
        <div>
          <span className="role">{role.toUpperCase()}</span>
          <button className="logout" onClick={onLogout}>Logout</button>
        </div>
      </div>

      {/* Admin Only Form */}
      {role === "admin" && (
        <div className="card">
          <h3>{editIndex !== null ? "Update Product" : "Add Product"}</h3>
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange}/>
          <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange}/>
          <input name="price" placeholder="Price" value={form.price} onChange={handleChange}/>
          <button onClick={handleSubmit}>
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>
      )}

      {/* Product List */}
      <div className="card">
        <h3>Product List</h3>

        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
                {role === "admin" && <th>Actions</th>}
              </tr>
            </thead>

            <tbody>
              {products.map((p, i) => (
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.quantity}</td>
                  <td>₹{p.price}</td>

                  {role === "admin" && (
                    <td>
                      <button onClick={() => handleEdit(i)}>Edit</button>
                      <button className="delete" onClick={() => handleDelete(i)}>Delete</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Inventory;
