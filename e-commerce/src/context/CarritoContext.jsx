import React, {createContext,useState,useEffect} from 'react';

export const CarritoContext=createContext();

export function CarritoProvider({children}){
     const [carrito,setCarrito]= useState(()=>{
        const carritoGuardado = localStorage.getItem("carrito");
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
      });
    const [showCompraCard, setShowCompraCard] = useState(false);
useEffect(()=>{
            localStorage.setItem('carrito',JSON.stringify(carrito));
        },[carrito])
    
function addProduct (product){
        setCarrito((prevCarrito)=>{
            const exist=prevCarrito.find(item=>item.id===product.id);
            if(exist){
                //Si existe el producto sumamos 1
                return prevCarrito.map(item=>
                    item.id=== product.id ? {...item, quantity:item.quantity +1}:item
                );
            }else{
                //Si no existe lo agregamos
                return[...prevCarrito, {...product,quantity:1}];
            }
        });
    }

function addCant(id){
    setCarrito((prevCarrito) =>
      prevCarrito.map(item=>
      item.id=== id ? {...item, quantity:item.quantity +1}:item
      ));
}
function restarCant(id){
    setCarrito((prevCarrito) =>
      prevCarrito.map(item=>{
        //Si la cantidad es 1 lo elimino
        if (item.id=== id){
          if(item.quantity===1){
              return null
          }else{
            // Si hay 1 o mas le resto
            return { ...item, quantity: item.quantity - 1 };}
        
        } return item; 
        })
        .filter((item)=>item!==null)//Aca saco a los que no tienen stock  
)
}

function removeProduct(id) {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item.id !== id)
    );
  }
  function VaciarProduct() {
    setCarrito([]);
  }

  const Compra = () => {
    setCarrito([]);
    setShowCompraCard(true);
    setTimeout(() => setShowCompraCard(false), 3000);
  };
return (
    <CarritoContext.Provider value={{ carrito,Compra,VaciarProduct,restarCant, addProduct,addCant, removeProduct, showCompraCard  }}>
      {children}
    </CarritoContext.Provider>
  );
};