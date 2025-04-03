import { DogResponse } from "./model/Dogs";


export async function getRandomDogImage(breed: string): Promise<DogResponse | undefined> {
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