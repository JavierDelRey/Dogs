import { ChangeEvent,useState, useEffect } from 'react'
import './App.css'
import { getRandomDogImage, getBreeds } from "./services/dog-service";
import { Mierdon } from './Mierdon';
import React from 'react';


function App() {

  useEffect(()=>{
    const fetchAllBreeds = async () => { //Como los useEffect no pueden ejecutar comandos asíncronos pero si funciones, deberemos meter estas ordenes asíncronas dentro de funciones
      const breeds = await getBreeds();
      if (breeds){
      setAllBreeds(breeds);
    };
  };
  fetchAllBreeds(); //Llama a la función que muestra la lista de razas
  },[]);

  const [dogList, setDogList] = useState<Dog[]>([
    { //Aquí ponemos las variables que van a cambiar en las cards
      imgUrl: "./golden-retriever.webp",
      likes: 0,
      dislikes: 1
    },
  ]);
  /*const dog: Dog = { //Aquí ponemos las variables que van a cambiar entre cards
    imgUrl: "",
    likes: 0,
    dislikes: 0
  }*/

  interface Dog {
    imgUrl: string,
    likes: number,
    dislikes: number;
  }

  /* const handleClickAfter = () => { //Duplica el array que ya había y añade una card al final de dicho array
    setDogList([...dogList, {
      imgUrl: "./golden-retriever.webp",
      likes: 0,
      dislikes: 1
    }])
  }

    useEffect(() => {
        async function fetchDog() {
            const response = await getRandomDogImage("");
            if (response) {
                setDogImage(response.imgUrl);
            }
        }
        fetchDog();
    }, []);
    */

    const handleAddDogClickFinal = async () => { //Combinación del handleClickAfter y useEffect para que funcione la API
      const response = await getRandomDogImage(breed);

      if (response) {
        setDogList([
          ...dogList,
          { imgUrl: response.imgUrl,
            likes: 0,
            dislikes: 0 },
        ]);
      }
    };

    const handleAddDogClickFirst = async () => { //Combinación del handleClickAfter y useEffect para que funcione la API
      const response = await getRandomDogImage(breed);

      if (response) {
        setDogList([{ imgUrl: response.imgUrl,
            likes: 0,
            dislikes: 0 },...dogList
        ]);
      }
    };

    const [breed, setBreed] = useState(""); //Esto sirve para guardar la raza que se ha seleccionado (y posteriormente añadir más perros de esta raza)
    
    const [allBreeds, setAllBreeds] = useState<string[]>([]);

    const [showMierdon, setShowMierdon] = useState (false)
    
    const handleBreedChange = (event: ChangeEvent<HTMLSelectElement>) => { //Tipar elemento
      setBreed(event.target.value); //Sin esto, el selector no se actualizaría
      console.log(event.target.value);
    }

    const handleLikes = (index: number) => {
      const updatedDogs = [...dogList]; // copia del array
      updatedDogs[index] = {
        ...updatedDogs[index],
        likes: updatedDogs[index].likes + 1
      };
      setDogList(updatedDogs); // actualiza el estado
    };

    const handleDislikes = (index: number) => {
      const updatedDogs = [...dogList]; // copia del array
      updatedDogs[index] = { //Localiza la card que estamos clickando de todas las que hay
        ...updatedDogs[index], //duplica dicha card (y borra la que había)
        dislikes: updatedDogs[index].dislikes + 1 //le añade un dislike
      };
      setDogList(updatedDogs); // actualiza el estado
    };

    

  return (
    <>
      <h1>❤️ VOTALPERRICO ❤️</h1>
      <div className="breed-picker">
        Selecciona la raza del perro que quieras añadir
        <select value={breed} className="breed-selector" onChange={handleBreedChange}>
          {allBreeds.map((breed) =>{
            return <option value={breed}>{breed}</option>
          })}
        </select>
      
      
      </div>
      <button className="add-btn" onClick={handleAddDogClickFirst}>
        Añadir 1 perro al principio
      </button>
      <button className="add-btn" onClick={handleAddDogClickFinal}>
        Añadir 1 perro al final
      </button>

      <button className="add-btn" onClick={() => {
        setShowMierdon(!showMierdon); //Es como decir "toggle"
      }}>
        Que {!showMierdon ? "aparezca" : "desaparezca"} Mierdon
      </button>
      <div className="dog-list">
        {showMierdon && <Mierdon />}
        {dogList.map((dog, index) => (
          <div className="card" key={index}>
            <img src={dog.imgUrl} alt="Perro" />
            <div className="flex dog-count">
              <span>{dog.likes} ❤️</span>
              <span>{dog.dislikes} 🤢</span>
            </div>
            <div className="flex dog-actions">
            <button onClick={() => handleLikes(index)}>Like</button>
              <button onClick={() => handleDislikes(index)}>Dislike</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

}
export default App
