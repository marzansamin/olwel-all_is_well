/* eslint-disable react/prop-types */

const ModalBox = ({isVisible, onClose, children}) => {
  if(!isVisible) return;

  const handleClose = (e) => {
    if(e.target.id === 'wrapper') onClose()
  }

  return (
    <div onClick={handleClose} className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" id="wrapper">
      <div className="w-[500px] flex flex-col">
        <button onClick={onClose} className="text-white text-2xl font-bold place-self-end">X</button>
        <div className="bg-white p-2 rounded">
          {/* <form> */}
            {children}
          {/* </form> */}
        </div>
      </div>
    </div>
  )
}

export default ModalBox