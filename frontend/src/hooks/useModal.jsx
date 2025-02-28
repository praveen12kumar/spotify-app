import { useState } from "react"

function useModal(){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const open = () => setIsModalOpen(true);
    const close = () => setIsModalOpen(false);

    return({
        isModalOpen,
        open,
        close
    })
}

export default useModal;