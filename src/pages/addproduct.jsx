import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const AddProductPage = () => {
    const [form, setForm] = useState({name: "", price: "", category: "Accessory", description: "", images: ""});
    const inputChange = (e) => {
      setForm({...form, [e.target.name]: e.target.value});
    }
    const fileChange = e => {
        setForm({...form, images: e.target.files[0]});
    }

    const adminToken = window.sessionStorage.getItem("admintk");
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminToken) {
            Toast.fire({icon: "error", title: "You need to be logged in!"})
            .then(() => navigate("/admin/login"))
        }
    })

    const submitHandler = (e) => {
      e.preventDefault();
      const formObj = {...form, price: parseFloat(form.price)};
      const formData = new FormData();
      for (const prop in formObj) {
        formData.append(prop, formObj[prop]);
      }
      
      fetch("https://geegstack.onrender.com/products", {
        method: "POST", 
        headers: { token: "Bearer " + adminToken },
        body: formData
      })
      .then(res => res.json())
      .then(response => {
        if (response.type === "error") {
          return Toast.fire({icon: "error", title: response.message});
        }
        Toast.fire({icon: "success", title: response.message});
        navigate("/products/" + response.productId )
      })
      .catch(() => {
        return Toast.fire({icon: "error", title: "Network error"})
      })

    }

  return (
      <>
      <Header/>
      <main className="product-details">
          <h2>Add Product</h2>
          <p className="error"></p>
          <div className="form-container">
              <form  method="post" onSubmit={submitHandler}>
                  <div>
                      <label for="name">
                          <p>Product Name</p>
                      </label>
                      <input type="text" onChange={inputChange} name="name" id="" />
                  </div>
                  <div>
                      <label for="price">
                          <p>Product Price</p>
                      </label>
                      <input type="number"  onChange={inputChange} name="price" />
                  </div>
                  <div>
                      <label for="description">
                          <p>Product Description</p>
                      </label>
                      <textarea name="description"  onChange={inputChange} id="" cols="30" rows="10"></textarea>
                  </div>
                  <div>
                      <label for="image">
                          <p>Product Image URL</p>
                      </label>
                      <input type="file" accept="image/*" name="images"  onChange={inputChange} id="" />
                  </div>
                  <div>
                      <label for="category">
                          <p>Product category</p>
                      </label>
                      <select name="category"  onChange={inputChange} id="">
                          <option value="Accessory">Accessory</option>

                          <option value="Gadget">Gadget</option>

                          <option value="Grocery">Grocery</option>
                      </select>
                  </div>
                  <input type="submit" value="Create Product" />
              </form>
          </div>
      </main>    
      <Footer/>
      </>
  )
}

export default AddProductPage;