import useSound from 'use-sound'
import mySound from './sounds/0133. Christmas Dreams - AShamaluevMusic.mp3' // Your sound file path here

export default function MyButton() {
   const [playSound] = useSound(mySound)
   return <button onClick={() => playSound()}>Play Sound</button>
}
