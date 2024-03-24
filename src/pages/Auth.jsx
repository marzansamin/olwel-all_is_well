import '../App.css'
import docBackImage from '../assets/images/doc-back.png';

const Auth = () => {
  return (
    <div className='bg-gradient-to-tl from-purple-900 to-green-700 w-full h-screen relative'>
      <img src="https://www.kansashealthsystem.com/-/media/Project/Website/Hero/Care_DoctorPatient_AS230454605_hero.jpg?h=586&w=1440&la=en&hash=0C6ABBA9D22560651D926011D18EEE46F7FD25C5" className="w-full h-full absolute object-cover" />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60" />
    </div>
  )
}

export default Auth