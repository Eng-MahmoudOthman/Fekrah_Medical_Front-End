import { Link } from "react-router-dom";


export default function FooterOnline(){


   return (
      <>
         <footer className="footer mt-5 p-2 text-white text-center">
            <div className="container-fluid p-4 ">
               <h2 className=" h1 text-center mb-4">Fekra Company Medical Advertising</h2>
               <div className="row">

                  <div className="col-md-12">
                     <p className="footer-info">
                        Fekra is a leading medical advertising company that specializes in providing innovative and effective marketing solutions for healthcare companies and institutions. With a firm belief in the power of advertising and marketing in the success of medical businesses, Fekra was founded to help these organizations effectively communicate with their target audience and strengthen their position in the market.
                        At Fekra, we offer our services in both English and Arabic, recognizing the importance of catering to a diverse clientele. By leveraging these two languages, we ensure seamless communication with clients across different regions in the Arab world as well as the Western market, delivering exceptional services in the language that our clients feel comfortable and confident in.
                     </p>
                  </div>

               </div>
            </div>
            <p className="m-0 bg-black developer">CopyRight &copy; Developed By : <Link className="main-color" to={"#"}>Mahmoud Othman</Link>   &   UI/UX Design By : <Link className="main-color" to={"#"}>Eman Magdy</Link> </p>
         </footer>
      </>
   )
}