import manImg from '../assets/images/man.png';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const homepage = () => {
  return (
      <>
      <Header/>
        <main class="home">
            <section class="flex">
                <div>
                    <p>SHOP ALL YOUR PRODUCTS</p>
                    <p class="big">At the Best Prices</p>
                    <p>Enjoy up to 30% discount when you buy up to <u>5 products</u> as a Geegstacker!</p>

                    <Link to="/products" className="explore-btn">Explore &gt; &gt;</Link>
                </div>
                <img src={manImg} alt="" />
            </section>
        </main>
        <Footer/>
      </>
  )
}

export default homepage;