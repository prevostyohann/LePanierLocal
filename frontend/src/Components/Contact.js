import React from 'react';
import MyForm from './MyForm';

function Contact(){
    const fields = [ 
        { name: 'lastname', label: 'Nom : ', type: 'text', placeholder: 'Entrer votre nom', required: false  },
        { name: 'firstname', label: 'Prénom : ', type: 'text', placeholder: 'Entrer votre prénom', required: false  },
        { name: 'email', label: 'Email : ', type: 'email', placeholder: 'Entrer votre email', required: false  },
        { name: 'message', label: 'Message : ', type: 'textarea', placeholder: 'Ecrire votre message', required: false  }, ]; 
        
        const handleSubmit = (formData) => {
            }; 


            
        return ( 
            <div>
                 <MyForm fields={fields} onSubmit={handleSubmit} />
                 </div>
        );
}
export default Contact;