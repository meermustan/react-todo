import './App.css';
import Footer from './Footer';
import Navbar from './Navbar';
import Todo from './Todo'

function App() {
  return (
    <>
      <Navbar />
      {/* <MainLanding />
      <hr style={{width:'40%',margin:'4px auto'}} />
      <Articles title="Earning Articles"/>
      <Articles title="Gaming Articles" />
      <hr style={{width:'40%'}} /> */}
      <Todo />

      <Footer/>
      
    </>
  );
}

export default App;
