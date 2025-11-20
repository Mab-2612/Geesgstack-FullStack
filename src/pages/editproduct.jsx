import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../components/Toast";

const EditProductPage = () => {
    const [form, setForm] = useState({name: "", price: 0, category: "", description: "", imageurl: ""});
    const params = useParams();

    const inputChange = (e) => {
      setForm({...form, [e.target.name]: e.target.value});
    }

    const adminToken = window.sessionStorage.getItem("admintk");
    const navigate = useNavigate();

    useEffect(() => {
      if (!adminToken) {
        Toast.fire({icon: "error", title: "You need to be logged in..."})
        .then(() => navigate("/admin_login"));
      }
      fetch("https://geegstack.onrender.com/products/" + params.id)
      .then(res => res.json())
      .then(response => {
        if (response.type === "error") {
          Toast.fire({icon: "error", title: response.message});
          return navigate("/")
        }
        console.log(response.product)
        setForm({...response.product, imageurl: response.product.imageurl[0]})
      })
      .catch(err => {
        Toast.fire({icon: "error", title: "Network error"});
        navigate("/");
      })
    }, [navigate, params.id])

    const submitHandler = (e) => {
      e.preventDefault();
      let formData = {...form, images: [form.imageurl], price: parseFloat(form.price)};
      formData = JSON.stringify(formData);

      fetch("https://geegstack.onrender.com/products/" + params.id, {
        method: "PUT", 
        headers: {"Content-Type": "application/json", token: "Bearer " + adminToken},
        body: formData
      })
      .then(res => res.json())
      .then(response => {
        if (response.type === "error") {
          return Toast.fire({icon: "error", title: response.message});
        }
        Toast.fire({icon: "success", title: response.message})
        .then(() => navigate("/products/" + params.id));
      })
      .catch(err => {
        console.log(err);
        Toast.fire({icon: "error", title: "Network error"});
      })
  }

  return (
      <>
      <Header/>

      <main className="product-details">
          <h2>Edit Product</h2>
          <p className="error"></p>
          <div className="form-container">
              <form  method="post" onSubmit={submitHandler}>
                  <div>
                      <label for="name">
                          <p>Product Name</p>
                      </label>
                      <input type="text" onChange={inputChange} value={form.name} name="name" id="" />
                  </div>
                  <div>
                      <label for="price">
                          <p>Product Price</p>
                      </label>
                      <input type="number"  onChange={inputChange} value={form.price} name="price" />
                  </div>
                  <div>
                      <label for="description">
                          <p>Product Description</p>
                      </label>
                      <textarea name="description"  onChange={inputChange} id="" cols="30" rows="10" value={form.description}></textarea>
                  </div>
                  <div>
                      <label for="image">
                          <p>Product Image URL</p>
                      </label>
                      <input type="string" name="images"  onChange={inputChange} value={form.imageurl && form.imageurl} id="" />
                  </div>
                  <div>
                      <label for="category">
                          <p>Product category</p>
                      </label>
                      <select name="category"  onChange={inputChange} value={form.category} id="">
                          <option value="Accessory">Accessory</option>

                          <option value="Gadget">Gadget</option>

                          <option value="Grocery">Grocery</option>
                      </select>
                  </div>
                  <input type="submit" value="Edit Product" />
              </form>
          </div>
      </main>    
      <Footer/>
      </>
  )
}

export default EditProductPage;