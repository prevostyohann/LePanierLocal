import React from 'react';
import { Link } from 'react-router-dom';
import MyImage from '../image/logoLPL.png';
//import Contact from './Contact';
import CGV from './CGV';
import CGU from './CGU';
import MentionsLegales from './MentionsLegales'


function MyFooter() {

    return (
      <nav>
          <ul>
            <li>
            <img src={MyImage} alt="Logo le panier local dans le footer" height={75} width={100} />
            </li>
            <li>
                <Link to='/MentionsLegales'>Mentions Légales</Link>
            </li>
              {/* <li>
                  <Link to='/Contact'>Contact</Link>
              </li> */}
              <li>
                <Link to='/CGV'></Link>
              </li>
              <li>
                <Link to='/CGU'></Link>
              </li>
          </ul>
      </nav>
    )
}
export default MyFooter

// const MyFooter = ({ navItems }) => {
//   return (
//     <footer>
//         <h2> My Footer </h2>
//       <nav>
  
//         <ul>
//         <img src={MyImage} alt="Logo le panier local dans le footer" height={75} width={100} />
//           {navItems.map((item, index) => (
//             <li key={index}>
//               <NavLink to={item.path}>{item.label}</NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </footer>
//   );
// };

// export default MyFooter;