import { DogResponse } from "./model/Dogs";


export async function getRandomDogImage(breed: string): Promise<DogResponse | undefined> { //SIEMPRE SE DEBEN TIPAR TODOS LOS EXPORTS
    const url = breed === ''
        ? 'https://dog.ceo/api/breeds/image/random'
        : `https://dog.ceo/api/breed/${breed}/images/random`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();

        return {
            id: Date.now() + Math.random(),
            breed,
            imgUrl: json.message,
            dislikeCount: 0,
            likeCount: 0
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("No se ha podido cargar la imagen");
        }
    }
    return undefined;
}

export async function getBreeds(): Promise<string[] | undefined> { //Hay que pasarlo a Typescript. Una función Asíncrona siempre devolverá una Promesa
    const url = 'https://dog.ceo/api/breeds/list/all';
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json() as { message: string; status: string }; //Como no podemos tiparlo como "const json = await response.json<{ message: string; status: string }>();" debemos usar esta estructura usando as
  
      return Object.keys(json.message); //Devuelve un array de strings
    } catch (error: any) {
      console.error(error.message);
    }
  }