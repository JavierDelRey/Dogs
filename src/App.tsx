import { useState } from 'react'
import './App.css'
import { getRandomDogImage } from "./services/add-perrico.service";

function App() {
  const [dogList, setDogList] = useState<Dog[]>([
    { //Aquí ponemos las variables que van a cambiar en las cards
      imgUrl: "./golden-retriever.webp",
      likes: 0,
      dislikes: 1
    },
    { //Aquí ponemos las variables que van a cambiar en las cards
      imgUrl: "/golden-retriever.webp",
      likes: 2,
      dislikes: 2
    },
    { //Aquí ponemos las variables que van a cambiar en las cards
      imgUrl: "/golden-retriever.webp",
      likes: 1,
      dislikes: 1
    }
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

    const handleClickAfter = async () => { //Combinación del handleClickAfter y useEffect para que funcione la API
      const response = await getRandomDogImage("");
      if (response) {
        setDogList([
          ...dogList,
          { imgUrl: response.imgUrl,
            likes: 0,
            dislikes: 0 },
        ]);
      }
    };

  return (
    <>
      <h1>❤️ VOTALPERRICO ❤️</h1>
      <button className="add-btn" onClick={handleClickAfter}>
        Añadir 1 perro al final
      </button>
      <div className="dog-list">
        {dogList.map((dog, index) => (
          <div className="card" key={index}>
            <img src={dog.imgUrl} alt="Perro" />
            <div className="flex dog-count">
              <span>{dog.likes} ❤️</span>
              <span>{dog.dislikes} 🤢</span>
            </div>
            <div className="flex dog-actions">
              <button>Like</button>
              <button>Dislike</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

}
export default App
