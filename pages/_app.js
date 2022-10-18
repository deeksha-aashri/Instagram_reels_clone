import '../styles/globals.css'
import './signup/signup.css'
import './login/login.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../components/Feed.css'
import '../components/Profile.css'
import '../components/Post.css'
import '../components/Comment.css'
import Authwrapper from '../context/auth';
function MyApp({ Component, pageProps }) {
  return(
    < Authwrapper>
    <Component {...pageProps} />
    </Authwrapper>
  )
  
  
}

export default MyApp
