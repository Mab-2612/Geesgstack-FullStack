import { useState, useEffect } from 'react';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Toast from '../components/Toast';
import Swal from 'sweetalert2';

const ProductDetailsPage = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  const adminToken = window.sessionStorage.getItem("admintk");
  
    useEffect(() => {
      fetch("http://localhost:8080/products/" + params.id)
      .then(res => res.json())
      .then(response => {
        console.log(response)
        if (response.type === "error") {
          return Toast.fire({icon: "error", title: response.message})
          .then(() => navigate("/"))
        }
        setProduct(response.product);
      })
      .catch(err => {
        Toast.fire({icon: "error", title: "Network error"})
        .then(() => navigate("/"))
      })
    }, [navigate, params.id])

    const deleteProduct = () => {
      Swal.fire({
         icon: "warning",
         title: "Delete product",
          text: "Are you sure you want to delete this product? This cannot be reversed",
          showCancelButton: true,
          confirmButtonText: "Yes, delete",
      })
      .then(res => {
        if(res.isConfirmed) {
          fetch("http://localhost:8080/products/" + params.id, {
            method: "DELETE",
            headers: {token: "Bearer " + adminToken}
          })
          .then(res => res.json())
          .then(response => {
            if (response.type === "error") {
              Toast.fire({icon: "error", title: response.message})
              return navigate("/")
            }
            Toast.fire({icon: "success", title: response.message})
          })
          .catch(err => {
            Toast.fire({icon: "error", title: "Network error"})
            .then(() => navigate("/"))
          })
        }
      })
    }

  return (
    <>
    <Header/>
    <main class="product-details">
        <img src={product?.imageurl && product.imageurl[0]} alt="Product" />
        <h2>{product?.name}</h2>
        <p class="price">NGN{product?.price?.toLocaleString()}</p>
        <p class="desc">{product?.description}</p>
        <p class="category">{product?.category}</p>
        {
          adminToken &&
          <>
            <Link to={"/products/" + product?._id + "/edit"}>Edit product</Link>
            <button onClick={deleteProduct}>Delete Product</button>
          </>
        }
            
    </main>
    <Footer/>
    </>
  )
}

export default ProductDetailsPage;