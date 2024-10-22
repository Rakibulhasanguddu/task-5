import { useEffect } from "react";
import { useState } from "react";
import Swal from 'sweetalert2'

const Home = () => {
    const [peoples, setpeople] = useState([]);
  const [loader, setloader] = useState(true);
  const [error, seterror] = useState();

  useEffect(() => {
    
    const fetchs = async () => {
      try {
        const res = await fetch('https://reqres.in/api/users?page=2');
        if (!res.ok) {
        Swal.fire({
            title: 'Error!',
            text: 'Data Fetching Error',
            icon: 'error',
            confirmButtonText: 'Close'
          })
        }
        const data = await res.json();
        setpeople(data.data); 
        setloader(false); 
      } catch (error) {
        seterror(error.message); 
        setloader(false);
      }
    };

    fetchs();
  }, []);

  
  if (loader) {
    return   <div
    className='w-[15px] h-[100px] lg:ml-[950px] lg:mt-[200px] flex justify-center items-center'
    style={{
    '--c': 'radial-gradient(farthest-side, #3B9DF8 92%, transparent)',
    background: `
        var(--c) 50% 0,
        var(--c) 50% 100%,
        var(--c) 100% 50%,
        var(--c) 0 50%
    `,
    backgroundSize: '13.4px 13.4px',
    backgroundRepeat: 'no-repeat',
    animation: 'spinner-kh173p 1s infinite'
  }}
    >
    <style>
  {`
@keyframes spinner-kh173p {
  to {
    transform: rotate(0.5turn);
    }
  }
  `}
    </style>
    </div>;
  }


  if (error) {
   
    return   Swal.fire({
        title: 'Error!',
        text: 'Data Fetching Error',
        icon: 'error',
        confirmButtonText: 'Close'
      })
  }
    return (
        <div className="">
            <h1 className="text-center text-3xl font-bold mt-5">Task-5</h1>
 <div className=" flex justify-center mt-8">
            
            <table border="1">
     <thead>
       <tr className="border border-black ">
         
         <th>Name</th>
         <th>Email</th>
         <th>Avatar</th>
       </tr>
     </thead>
     <tbody className="border border-black" >
       {peoples.map(people => (
         <tr key={people.id}>
           
           <td className="border border-black font-bold p-2">{`${people.first_name} ${people.last_name}`}</td>
           <td className="border border-black font-bold  p-2">{people.email}</td>
           <td className="border border-black  p-2">
           <div className="avatar">
 <div className="w-24 rounded-xl">
   <img src={people.avatar} />
 </div>
</div>
            
           </td>
         </tr>
       ))}
     </tbody>
   </table>
       </div>
        </div>
       
    );
};

export default Home;